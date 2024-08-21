import AccountForm from "@/app/(authenticated)/account/update/page";
import { MyAccountIcon } from "@/components/Icons";
import { createClient } from '@/utils/supabase/server'

const Account = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log("data user", user);

  return (
    <>
      <h1 className="text-3xl mb-6"><MyAccountIcon className="h-8 w-8 inline-block mb-2 mr-2 text-secondary-foreground" /> My Account</h1>

      <div className="w-[500px]">
        <AccountForm user={user} />

      </div>
    </>
  )
}

export default Account