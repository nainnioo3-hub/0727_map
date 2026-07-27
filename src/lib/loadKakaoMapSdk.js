const KAKAO_MAP_SDK_URL = 'https://dapi.kakao.com/v2/maps/sdk.js'

let kakaoMapSdkPromise = null

// 카카오맵 JS SDK를 1회만 로드한다. libraries=services는 주소→좌표 변환(Geocoder)에 필요.
export function loadKakaoMapSdk() {
  if (window.kakao?.maps) {
    return Promise.resolve(window.kakao)
  }

  if (!kakaoMapSdkPromise) {
    kakaoMapSdkPromise = new Promise((resolve, reject) => {
      const appKey = import.meta.env.VITE_KAKAO_MAP_KEY
      const script = document.createElement('script')
      script.src = `${KAKAO_MAP_SDK_URL}?appkey=${appKey}&libraries=services&autoload=false`
      script.onload = () => {
        window.kakao.maps.load(() => resolve(window.kakao))
      }
      script.onerror = reject
      document.head.appendChild(script)
    })
  }

  return kakaoMapSdkPromise
}
