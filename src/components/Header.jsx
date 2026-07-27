export default function Header({ user, onExcelUpload, onLoginClick, onLogoutClick }) {
  function handleExcelInputChange(event) {
    const file = event.target.files?.[0]
    if (file) {
      onExcelUpload(file)
    }
    event.target.value = ''
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <h1 className="text-lg font-semibold text-slate-900">우리 동네 카페 지도</h1>

      <div className="flex items-center gap-2">
        <label className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          엑셀 업로드
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleExcelInputChange}
          />
        </label>

        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">{user.email}</span>
            <button
              type="button"
              onClick={onLogoutClick}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  )
}
