import { useEffect, useRef, useState } from 'react'
import { loadKakaoMapSdk } from '../lib/loadKakaoMapSdk'
import { geocodeAddress } from '../lib/geocodeAddress'
import { renderCafeMarkers } from '../lib/kakaoMarkers'

const SEOUL_CITY_HALL = { lat: 37.5665, lng: 126.978 }

export default function MapView({ cafes, onMarkerClick }) {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const infoWindowRef = useRef(null)
  const geocodeCacheRef = useRef(new Map())
  const [failedCafes, setFailedCafes] = useState([])

  useEffect(() => {
    let cancelled = false

    async function syncMarkers() {
      const kakao = await loadKakaoMapSdk()
      if (cancelled) return

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new kakao.maps.Map(mapContainerRef.current, {
          center: new kakao.maps.LatLng(SEOUL_CITY_HALL.lat, SEOUL_CITY_HALL.lng),
          level: 4,
        })
        infoWindowRef.current = new kakao.maps.InfoWindow({ removable: true })
      }

      const geocoded = []
      const failed = []

      // 주소→좌표 변환은 하나씩 순서대로 처리한다 (CLAUDE.md 규칙).
      // 이미 좌표를 알아낸 주소는 캐시에서 재사용해, 방문 체크 등으로 목록만
      // 바뀌었을 때 불필요하게 다시 지오코딩하지 않는다.
      for (const cafe of cafes) {
        const cached = geocodeCacheRef.current.get(cafe.id)
        const coords = cached ?? (await geocodeAddress(kakao, cafe.address))
        if (cancelled) return

        if (coords) {
          geocodeCacheRef.current.set(cafe.id, coords)
          geocoded.push({ ...cafe, ...coords })
        } else {
          failed.push(cafe)
        }
      }

      if (cancelled) return

      markersRef.current = renderCafeMarkers({
        kakao,
        map: mapInstanceRef.current,
        cafes: geocoded,
        previousMarkers: markersRef.current,
        onMarkerClick: (cafe, marker) => {
          const content = document.createElement('div')
          content.style.cssText = 'padding:6px 10px;font-size:13px;white-space:nowrap;'
          content.textContent = cafe.name
          infoWindowRef.current.setContent(content)
          infoWindowRef.current.open(mapInstanceRef.current, marker)

          onMarkerClick?.(cafe)
        },
      })

      setFailedCafes(failed)
    }

    syncMarkers()

    return () => {
      cancelled = true
    }
  }, [cafes, onMarkerClick])

  const visitedCount = cafes.filter((cafe) => cafe.visited).length

  return (
    <div>
      <div className="relative">
        <div ref={mapContainerRef} className="h-[420px] w-full" />
        <div className="absolute left-3 top-3 z-10 rounded-md bg-white/95 px-3 py-1.5 text-sm font-medium text-slate-700 shadow">
          총 {cafes.length}곳 중 {visitedCount}곳 방문 완료
        </div>
      </div>

      {failedCafes.length > 0 && (
        <div className="mx-auto max-w-5xl px-6 py-3 text-sm text-red-600">
          <p className="font-medium">주소를 찾지 못한 카페</p>
          <ul className="mt-1 list-disc pl-5">
            {failedCafes.map((cafe) => (
              <li key={`${cafe.name}::${cafe.address}`}>
                {cafe.name} ({cafe.address})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
