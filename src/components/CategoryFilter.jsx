function filterButtonClass(active) {
  return `rounded-full border px-3 py-1 text-sm font-medium ${
    active
      ? 'border-slate-900 bg-slate-900 text-white'
      : 'border-slate-300 text-slate-600 hover:bg-slate-50'
  }`
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  if (categories.length === 0) return null

  return (
    <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-6 pt-4">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={filterButtonClass(selectedCategory === 'all')}
      >
        전체
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelectCategory(category)}
          className={filterButtonClass(selectedCategory === category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
