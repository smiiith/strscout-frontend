import AccountForm from "@/app/(authenticated)/account/update/page";
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("data user", user);

  return <AccountForm user={user} />
}