"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
// import Avatar from "../../../../components/Avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProfileData {
  full_name: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

interface AccountFormProps {
  user: User | null;
  initialProfile: ProfileData;
}

export default function AccountForm({ user, initialProfile }: AccountFormProps) {
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState<string | null>(initialProfile.full_name);
  const [username, setUsername] = useState<string | null>(initialProfile.username);
  const [website, setWebsite] = useState<string | null>(initialProfile.website);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialProfile.avatar_url);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    if (!user?.id) {
      console.log("No user ID available for update");
      return;
    }

    try {
      setLoading(true);

      const supabase = createClient();
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
      console.log("Profile updated!");
    } catch (error) {
      console.log("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget md:max-w-[500px] w-full">
      {/* <Avatar
        uid={user?.id ?? null}
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          console.log("set the avatar url", url);
          setAvatarUrl(url)
          updateProfile({ fullname, username, website, avatar_url: url })
        }}
      /> */}
      <div className="mt-8">
        <Label htmlFor="email" className="mt-5">
          Email
        </Label>
        <Input
          id="email"
          type="text"
          value={user?.email || ""}
          disabled
          className="mt-2 mb-5"
        />
      </div>
      <div>
        <Label htmlFor="fullName" className="mt-5">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          className="mt-2 mb-5"
        />
      </div>
      <div>
        <Label htmlFor="username" className="mt-5">
          Username
        </Label>
        <Input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 mb-5"
        />
      </div>
      <div>
        <Button
          className=""
          onClick={() =>
            updateProfile({
              fullname,
              username,
              website,
              avatar_url: avatarUrl,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </div>
    </div>
  );
}
