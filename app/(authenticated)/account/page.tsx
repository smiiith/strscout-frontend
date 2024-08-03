import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()
  const { data, error } = await supabase.auth.getUser()

  return <div> this is the ACCOUNT page {data?.user?.email}</div>
  // return <AccountForm user={user} />
}