import HeaderNav from '@/components/header'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Sidebar } from '@/components/sidebar'
import { createClient } from '@/utils/supabase/server'

// Make this a client component if you need state
export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser()

  return (
    <>
      <HeaderNav user={data.user} />
      <div className="h-full justify-center md:p-6 px-5 md:hidden block">
        <div className="">
          {children}
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] w-full md:block hidden md:visible invisible"
      >
        <ResizablePanel defaultSize={20} className="min-w-[150px]">
          <div className="flex h-full justify-center p-6 pt-[100px]">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80}>
          <div className="flex h-full justify-center p-6">
            <div className="container">
              {children}
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  )
}