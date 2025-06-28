import AccountForm from "@/app/(authenticated)/account/update/page";
import { MyAccountIcon } from "@/components/Icons";
import { createClient } from '@/utils/supabase/server';
import ManageSubscriptionButton from "@/components/ManageSubscriptionButton";

const Account = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user profile with subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user?.id)
    .single()

  const hasActiveSubscription = profile?.subscription_status === 'active'

  return (
    <>
      <div className="min-h-[700px] pt-6">

        <h1 className="text-3xl font-bold">My Account</h1>

        <div className="md:w-[500px]">
          <AccountForm user={user} />
          
          {hasActiveSubscription && (
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-semibold mb-4">Subscription</h2>
              <ManageSubscriptionButton />
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default Account