import HeaderNav from '@/components/header'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import { getUserWithPlan } from './utils';
import { UserSessionProvider } from '../../lib/context/UserSessionProvider';

// Make this a client component if you need state
export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const userProfile = await getUserWithPlan(user.id);

  // Get the access token from the server-side session
  const { data: { session } } = await supabase.auth.getSession();
  const accessToken = session?.access_token || null;

  const initialUserSession = user && userProfile ? {
    id: user.id,
    email: user.email || '',
    profile: userProfile,
    accessToken: accessToken || undefined,
  } : null;

  // Debug logging
  console.log('Layout - User:', user?.id);
  console.log('Layout - User Profile:', userProfile);
  console.log('Layout - Access Token:', accessToken ? 'present' : 'missing');
  console.log('Layout - Initial Session:', initialUserSession);

  return (
    <>
      <UserSessionProvider initialSession={initialUserSession}>
        <div className="">
          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="container mx-auto p-0 max-w-7xl bg-background">
                <HeaderNav user={userProfile} />
                <div className="px-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserSessionProvider>
    </>)
}