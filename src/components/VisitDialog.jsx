import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

export default function VisitDialog({ cafe, user, open, onOpenChange, onSave, onRequestLogin }) {
  const [visited, setVisited] = useState(false)
  const [reviewText, setReviewText] = useState('')
  const [saving, setSaving] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (cafe) {
      setVisited(cafe.visited ?? false)
      setReviewText(cafe.review ?? '')
      setErrorMessage('')
    }
  }, [cafe])

  if (!cafe) return null

  async function handleSave() {
    setSaving(true)
    setErrorMessage('')

    try {
      await onSave(cafe.id, { visited, review: reviewText })
    } catch (error) {
      setErrorMessage('로그인이 풀렸어요. 다시 로그인한 뒤 저장해주세요.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cafe.name}</DialogTitle>
          <DialogDescription>{cafe.address}</DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Checkbox id="visit-checked" checked={visited} onCheckedChange={setVisited} />
          <Label htmlFor="visit-checked">방문했어요</Label>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="visit-review">한줄 소감</Label>
          <Textarea
            id="visit-review"
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            placeholder="이 카페는 어땠나요?"
          />
        </div>

        {user ? (
          <DialogFooter className="items-center sm:justify-between">
            {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
            <Button className="ml-auto" onClick={handleSave} disabled={saving}>
              {saving ? '저장 중…' : '저장'}
            </Button>
          </DialogFooter>
        ) : (
          <div className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-600">
            로그인하면 방문 체크와 소감을 저장할 수 있어요.{' '}
            <button
              type="button"
              className="font-medium text-slate-900 underline"
              onClick={onRequestLogin}
            >
              로그인
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
