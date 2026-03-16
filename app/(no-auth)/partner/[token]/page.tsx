import { createAdminClient, createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PartnerActivation from "./PartnerActivation";

interface Props {
  params: { token: string };
}

function ErrorCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="max-w-md mx-auto mt-16 px-4 text-center">
      <h1 className="text-2xl font-bold mb-3">{title}</h1>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

export default async function PartnerPage({ params }: Props) {
  const { token } = params;

  // Check if the current visitor already has a session
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Query the token using service role to bypass RLS
  const supabaseAdmin = createAdminClient();
  const { data: partnerToken, error } = await supabaseAdmin
    .from("partner_tokens")
    .select(
      "id, partner_name, runs_granted, redeemed_at, redeemed_by_user_id, expires_at"
    )
    .eq("token", token)
    .single();

  if (error || !partnerToken) {
    return (
      <ErrorCard
        title="Link not found"
        message="This partner link is invalid. Please check the URL or contact the person who shared it with you."
      />
    );
  }

  if (
    partnerToken.expires_at &&
    new Date(partnerToken.expires_at) < new Date()
  ) {
    return (
      <ErrorCard
        title="Link expired"
        message="This partner link has expired. Please contact the person who shared it for a new one."
      />
    );
  }

  if (partnerToken.redeemed_at) {
    // If this exact user is the one who redeemed it, send them to the tool
    if (user && user.id === partnerToken.redeemed_by_user_id) {
      redirect("/market-spy/analyze");
    }
    return (
      <ErrorCard
        title="Link already used"
        message="This partner link has already been redeemed and can only be used once."
      />
    );
  }

  return (
    <PartnerActivation
      token={token}
      partnerName={partnerToken.partner_name}
    />
  );
}
