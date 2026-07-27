export const MARKER_COLOR_VISITED = '#16a34a'
export const MARKER_COLOR_DEFAULT = '#2563eb'

function pinSvg(color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40"><path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24C32 7.163 24.837 0 16 0z" fill="${color}"/><circle cx="16" cy="16" r="6" fill="white"/></svg>`
}

// 색상별 핀 마커 이미지를 만든다. 같은 색은 캐시해서 매 렌더마다 새로 만들지 않는다.
const cache = new Map()

export function createPinMarkerImage(kakao, color) {
  if (cache.has(color)) return cache.get(color)

  const url = `data:image/svg+xml;base64,${btoa(pinSvg(color))}`
  const image = new kakao.maps.MarkerImage(url, new kakao.maps.Size(32, 40), {
    offset: new kakao.maps.Point(16, 40),
  })

  cache.set(color, image)
  return image
}
