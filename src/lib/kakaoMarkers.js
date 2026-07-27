import { createPinMarkerImage, MARKER_COLOR_VISITED, MARKER_COLOR_DEFAULT } from './kakaoMarkerImages'

// 카페 배열로 지도 마커를 (다시) 그린다.
// 이전 마커를 모두 지운 뒤 새로 그리는 규칙(CLAUDE.md)을 따른다.
export function renderCafeMarkers({ kakao, map, cafes, previousMarkers = [], onMarkerClick }) {
  previousMarkers.forEach((marker) => marker.setMap(null))

  return cafes
    .filter((cafe) => cafe.lat != null && cafe.lng != null)
    .map((cafe) => {
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(cafe.lat, cafe.lng),
        title: cafe.name,
        image: createPinMarkerImage(kakao, cafe.visited ? MARKER_COLOR_VISITED : MARKER_COLOR_DEFAULT),
      })

      if (onMarkerClick) {
        kakao.maps.event.addListener(marker, 'click', () => onMarkerClick(cafe, marker))
      }

      return marker
    })
}
