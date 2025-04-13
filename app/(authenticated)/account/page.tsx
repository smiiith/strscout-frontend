import AccountForm from "@/app/(authenticated)/account/update/page";
import { MyAccountIcon } from "@/components/Icons";
import { createClient } from '@/utils/supabase/server'

const Account = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <div className="min-h-[700px] pt-6">

        <h1 className="text-3xl font-bold">My Account</h1>

        <div className="md:w-[500px]">
          <AccountForm user={user} />

        </div>
      </div>
    </>
  )
}

export default Account