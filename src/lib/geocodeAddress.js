// 카카오맵 Geocoder로 주소 1건을 좌표로 변환한다. 실패 시 null을 반환한다.
export function geocodeAddress(kakao, address) {
  return new Promise((resolve) => {
    const geocoder = new kakao.maps.services.Geocoder()
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK && result[0]) {
        resolve({ lat: Number(result[0].y), lng: Number(result[0].x) })
      } else {
        resolve(null)
      }
    })
  })
}
