import "../globals.css";
import { ThemeProvider } from "../providers";
// import UserContext from "@/app/UserContext";
import { createClient } from "@/utils/supabase/server";
import HeaderNav from "@/components/header";

export const metadata = {
  title: "Login | STR Sage",
  description:
    "Sign in to STR Sage to access your property analysis, market research, and listing optimization tools.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://www.strsage.com/login",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  // if (error) {
  //   console.log("error", error);
  // }

  // Create initial session if user exists
  let initialSession = null;
  if (data?.user) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*, plan:plans(id, name, description, active, key)")
      .eq("id", data.user.id)
      .single();

    if (profileData) {
      initialSession = {
        id: data.user.id,
        email: data.user.email || "",
        plan: profileData.plan,
      };
    } else {
      initialSession = {
        id: data.user.id,
        email: data.user.email || "",
        plan: {
          id: "",
          name: "",
          description: "",
          active: true,
          key: "freemium",
        },
      };
    }
  }

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
                <HeaderNav user={initialSession} />

                <div className="px-6">
                  {children}
                  {/* <Footer /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}
