import { supabase } from './supabaseClient'

// 로그인한 사용자가 이 카페(이름+주소)에 남긴 소감을 조회한다. 없으면 null.
export async function fetchVisitNote(userId, cafeName, cafeAddress) {
  const { data, error } = await supabase
    .from('visit_notes')
    .select('visited, review')
    .eq('user_id', userId)
    .eq('cafe_name', cafeName)
    .eq('cafe_address', cafeAddress)
    .maybeSingle()

  if (error) throw error
  return data
}

// 같은 사용자·같은 카페(이름+주소) 기록은 1개만 유지되도록 upsert한다.
export async function saveVisitNote(userId, cafeName, cafeAddress, { visited, review }) {
  const { error } = await supabase.from('visit_notes').upsert(
    { user_id: userId, cafe_name: cafeName, cafe_address: cafeAddress, visited, review },
    { onConflict: 'user_id,cafe_name,cafe_address' },
  )

  if (error) throw error
}
