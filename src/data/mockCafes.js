// 엑셀 업로드 전, 화면 구성 확인용 가짜 카페 데이터.
// 실제 연동 시 parseCafeExcelFile()이 이 배열과 같은 모양({ name, address, category })을 반환하고,
// MapView가 각 address를 geocodeAddress()로 좌표 변환해 마커를 그린다.
export const mockCafes = [
  {
    id: '시청 스퀘어 커피::서울 중구 세종대로 110',
    name: '시청 스퀘어 커피',
    address: '서울 중구 세종대로 110',
    category: '카페',
    visited: true,
    review: '넓고 조용해서 작업하기 좋았어요.',
  },
  {
    id: '정동길 로스터리::서울 중구 정동길 33',
    name: '정동길 로스터리',
    address: '서울 중구 정동길 33',
    category: '로스터리',
    visited: false,
    review: null,
  },
  {
    id: '을지로 브루잉::서울 중구 을지로 12',
    name: '을지로 브루잉',
    address: '서울 중구 을지로 12',
    category: '카페',
    visited: true,
    review: '드립커피가 맛있어요.',
  },
  {
    id: '덕수궁 티하우스::서울 중구 세종대로 99',
    name: '덕수궁 티하우스',
    address: '서울 중구 세종대로 99',
    category: '티하우스',
    visited: false,
    review: null,
  },
]
