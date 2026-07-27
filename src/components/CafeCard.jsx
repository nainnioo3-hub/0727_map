import { getCategoryColorClass } from '../lib/categoryColor'

export default function CafeCard({ cafe, onWriteReview }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-medium text-slate-900">{cafe.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{cafe.address}</p>
          <span
            className={`mt-2 inline-block rounded px-2 py-0.5 text-xs ${getCategoryColorClass(cafe.category)}`}
          >
            {cafe.category}
          </span>
        </div>

        {cafe.visited && (
          <span className="shrink-0 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
            방문 완료
          </span>
        )}
      </div>

      {cafe.visited && (
        <p className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-700">
          {cafe.review ?? '아직 소감이 없어요.'}
        </p>
      )}

      <button
        type="button"
        onClick={() => onWriteReview(cafe)}
        className="mt-3 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        {cafe.visited ? '후기 수정' : '후기 쓰기'}
      </button>
    </div>
  )
}
