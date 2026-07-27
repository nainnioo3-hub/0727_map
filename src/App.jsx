import { useEffect, useState } from 'react'
import Header from './components/Header'
import MapView from './components/MapView'
import CategoryFilter from './components/CategoryFilter'
import CafeListSection from './components/CafeListSection'
import VisitDialog from './components/VisitDialog'
import AuthForm from './components/AuthForm'
import { mockCafes } from './data/mockCafes'
import { parseCafeExcelFile } from './lib/parseCafeExcelFile'
import { supabase } from './lib/supabaseClient'
import { fetchVisitNote, saveVisitNote } from './lib/visitNotes'

export default function App() {
  const [cafes, setCafes] = useState(mockCafes)
  const [visitDialogCafe, setVisitDialogCafe] = useState(null)
  const [user, setUser] = useState(null)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [...new Set(cafes.map((cafe) => cafe.category).filter(Boolean))]
  const filteredCafes =
    selectedCategory === 'all' ? cafes : cafes.filter((cafe) => cafe.category === selectedCategory)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.subscription.unsubscribe()
  }, [])

  async function handleExcelUpload(file) {
    const rows = await parseCafeExcelFile(file)
    setCafes(
      rows.map((row) => ({
        id: `${row.name}::${row.address}`,
        ...row,
        visited: false,
        review: null,
        visitedAt: null,
      })),
    )
    setSelectedCategory('all')
  }

  function handleLoginClick() {
    setAuthDialogOpen(true)
  }

  function handleLogoutClick() {
    supabase.auth.signOut()
  }

  async function handleMarkerClick(cafe) {
    if (!user) {
      setVisitDialogCafe(cafe)
      return
    }

    try {
      const note = await fetchVisitNote(user.id, cafe.name, cafe.address)
      setVisitDialogCafe({ ...cafe, visited: note?.visited ?? false, review: note?.review ?? null })
    } catch (error) {
      setVisitDialogCafe(cafe)
    }
  }

  function handleRequestLoginFromVisitDialog() {
    setVisitDialogCafe(null)
    setAuthDialogOpen(true)
  }

  async function handleSaveVisit(cafeId, { visited, review }) {
    if (!user) {
      throw new Error('로그인이 필요합니다.')
    }

    const cafe = cafes.find((c) => c.id === cafeId) ?? visitDialogCafe
    await saveVisitNote(user.id, cafe.name, cafe.address, { visited, review })

    setCafes((prev) =>
      prev.map((c) =>
        c.id === cafeId
          ? { ...c, visited, review, visitedAt: visited ? new Date().toISOString() : c.visitedAt }
          : c,
      ),
    )
    setVisitDialogCafe(null)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        user={user}
        onExcelUpload={handleExcelUpload}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogoutClick}
      />
      <MapView cafes={filteredCafes} onMarkerClick={handleMarkerClick} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <CafeListSection cafes={filteredCafes} onWriteReview={handleMarkerClick} />

      <VisitDialog
        cafe={visitDialogCafe}
        user={user}
        open={visitDialogCafe != null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setVisitDialogCafe(null)
        }}
        onSave={handleSaveVisit}
        onRequestLogin={handleRequestLoginFromVisitDialog}
      />

      <AuthForm open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  )
}
