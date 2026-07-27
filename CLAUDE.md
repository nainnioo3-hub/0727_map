## 프로젝트 개요
엑셀로 정리한 카페 목록을 카카오맵에 마커로 표시하고, 로그인한
사용자의 방문 소감을 Supabase Database에 저장하는 지도 서비스.
(PRD.md 참고)

## 반드시 지킬 규칙
- 카카오맵 키는 `.env`의 `VITE_KAKAO_MAP_KEY`로 관리한다.
- 카카오맵 SDK는 `libraries=services`를 포함해서 불러온다
  (주소→좌표 변환에 필요).
- Supabase URL과 anon key는 `.env`의 `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`로 관리한다.
- 소감 테이블은 RLS를 켜고 "본인 데이터만" 정책을 적용한다.
- `.env`는 `.gitignore`에 포함한다.
- 화면은 가짜 데이터로 먼저 만들고, 마지막에 실제 연동으로 교체한다.
- 마커를 다시 그릴 때는 이전 마커를 모두 지운 뒤 새로 그린다.
- 주소→좌표 변환은 하나씩 순서대로, 실패는 화면에 안내한다.
- 소감 저장은 upsert로, 같은 장소(이름+주소) 기록은 1개만 유지한다.
- Supabase 관련 작업(테이블, RLS)은 Supabase MCP 도구로 수행한다.
- 로컬 개발 서버 포트는 `5173`, `npm run preview` 포트는 `4173`으로
  고정한다 (`vite.config`에 `server.port`/`server.strictPort`,
  `preview.port`/`preview.strictPort` 설정). 포트가 매번 바뀌면
  카카오 개발자센터에 등록해야 할 도메인도 계속 바뀌므로 고정한다.
- 카카오맵 JS 키의 "Web 플랫폼" 도메인 등록은 등록된 도메인이
  하나도 없으면 검사 자체를 하지 않는다(=사실상 전체 허용). 그래도
  키 남용을 막기 위해 실제 쓰는 도메인은 등록해두는 걸 권장한다:
  `http://localhost:5173`(dev), `http://localhost:4173`(preview),
  배포 도메인(예: Vercel 주소).

## 기술 스택
React + Vite, Tailwind + shadcn/ui, xlsx, 카카오맵 JS SDK,
Supabase(Auth/Database, MCP로 관리)