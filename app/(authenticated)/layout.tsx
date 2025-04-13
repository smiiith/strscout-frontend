import HeaderNav from '@/components/header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

// Make this a client component if you need state
export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    // Redirect to login if not authenticated
    redirect("/login");
  }

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