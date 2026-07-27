import { useState } from 'react'
import CafeCard from './CafeCard'

function sortButtonClass(active) {
  return `rounded-full border px-3 py-1 text-sm font-medium ${
    active
      ? 'border-slate-900 bg-slate-900 text-white'
      : 'border-slate-300 text-slate-600 hover:bg-slate-50'
  }`
}

function sortCafes(cafes, sortOrder) {
  const sorted = [...cafes]

  if (sortOrder === 'latest') {
    sorted.sort((a, b) => {
      const aTime = a.visitedAt ? new Date(a.visitedAt).getTime() : 0
      const bTime = b.visitedAt ? new Date(b.visitedAt).getTime() : 0
      return bTime - aTime
    })
  } else {
    sorted.sort((a, b) => a.name.localeCompare(b.name, 'ko'))
  }

  return sorted
}

export default function CafeListSection({ cafes, onWriteReview }) {
  const [sortOrder, setSortOrder] = useState('name')
  const sortedCafes = sortCafes(cafes, sortOrder)

  return (
    <section className="mx-auto max-w-5xl px-6 py-6">
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setSortOrder('latest')}
          className={sortButtonClass(sortOrder === 'latest')}
        >
          최신순
        </button>
        <button
          type="button"
          onClick={() => setSortOrder('name')}
          className={sortButtonClass(sortOrder === 'name')}
        >
          이름순
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedCafes.map((cafe) => (
          <CafeCard key={cafe.id} cafe={cafe} onWriteReview={onWriteReview} />
        ))}
      </div>
    </section>
  )
}
