import HeaderNav from '@/components/header'
import './globals.css'
import { ThemeProvider } from './providers'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Sidebar } from '@/components/sidebar'
import { createClient } from '@/utils/supabase/server'

export const metadata = {
  title: 'User Management',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser()

  // if (error) {
  //   console.log("error", error);
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="px-5">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {/* @ts-ignore */}
          <HeaderNav user={data.user} />

          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
