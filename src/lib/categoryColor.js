const PALETTE = [
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-rose-100 text-rose-700',
  'bg-slate-100 text-slate-600',
]

// 카테고리 문자열마다 항상 같은 색이 나오도록 해시로 팔레트에서 고른다.
export function getCategoryColorClass(category) {
  if (!category) return PALETTE[PALETTE.length - 1]

  let hash = 0
  for (let i = 0; i < category.length; i += 1) {
    hash = (hash * 31 + category.charCodeAt(i)) % PALETTE.length
  }

  return PALETTE[hash]
}
