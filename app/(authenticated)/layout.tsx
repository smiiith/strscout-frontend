import HeaderNav from '@/components/header'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Sidebar } from '@/components/sidebar'
import { createClient } from '@/utils/supabase/server'
import Footer from '@/components/footer';

// Make this a client component if you need state
export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser()

  return (
    <>
      <div className="">
        <div className="flex flex-col">
          <div className="flex-grow">
            <div className="container mx-auto p-0 max-w-7xl bg-background">
              <HeaderNav user={data.user} />
              <div className="px-6">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>)
}