import '../globals.css'
import { ThemeProvider } from '../providers'
import { createClient } from '@/utils/supabase/server'
import HeaderNav from '@/components/header'


export const metadata = {
  title: "STR Feeeback Genius",
  description: "We dive deep into your listing to provide analysis and actionable insights, ensuring you have the clarity you need to attract more guests and maximize your success.",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()

  // if (error) {
  //   console.log("error", error);
  // }

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >

        <div className="">
          <div className="flex flex-col">
            <div className="flex-grow">
              <div className="container mx-auto p-0 max-w-7xl bg-background">

                <HeaderNav />

                <div className="px-6">
                  {children}
                  {/* <Footer /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider >
    </>
  )
}
