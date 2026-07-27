import { precacheAndRoute } from 'workbox-precaching'
import { offlineFallback } from 'workbox-recipes'

// 빌드된 정적 자산만 프리캐시한다. 카카오맵/Supabase 요청은 네트워크가
// 필요하므로 여기서 캐싱하지 않는다 (CLAUDE.md: 지도/로그인/저장은 온라인 전제).
precacheAndRoute(self.__WB_MANIFEST)

// 오프라인일 때 캐시된 화면 대신 "인터넷 연결이 필요합니다" 안내만 보여준다.
offlineFallback({
  pageFallback: 'offline.html',
})
