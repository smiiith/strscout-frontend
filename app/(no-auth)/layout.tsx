import "../globals.css";
import { ThemeProvider } from "../providers";
import { createClient } from "@/utils/supabase/server";
import HeaderNav from "@/components/header";
import { UserSessionProvider } from "@/lib/context/UserSessionProvider";

export const metadata = {
  title: "STR Sage",
  description:
    "We dive deep into your listing to provide analysis and actionable insights, ensuring you have the clarity you need to attract more guests and maximize your success.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

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
        <UserSessionProvider initialSession={initialSession}>
          <div className="">
            <div className="flex flex-col">
              <div className="flex-grow">
                <div className="container mx-auto p-0 max-w-7xl bg-background">
                  <HeaderNav user={initialSession} />
                  <div className="px-0">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </UserSessionProvider>
      </ThemeProvider>
    </>
  );
}
