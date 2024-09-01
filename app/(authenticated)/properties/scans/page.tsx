// import AccountForm from "@/app/(authenticated)/account/update/page";
import { City01Icon, MyAccountIcon } from "@/components/Icons";
// import { createClient } from '@/utils/supabase/server'

const MyScans = async () => {
  // const supabase = createClient()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()


  return (
    <>
      <h1 className="text-3xl mb-6"><City01Icon className="h-8 w-8 inline-block mb-2 mr-2 text-secondary-foreground" />My Property Scans</h1>

      <div className="md:w-[500px]">
        scans page
      </div>
    </>
  )
}

export default MyScans