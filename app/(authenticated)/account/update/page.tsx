'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from '../../../../components/Avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


export default function AccountForm({ user }: any) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {

    // console.log("user account", user);

    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--background');
    // console.log('Background color:', bgColor);
  }, []);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
      console.log('Profile updated!')
    } catch (error) {
      console.log('Error updating the data!')
    } finally {
      setLoading(false)
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
        <Label htmlFor="email" className="mt-5">Email</Label>
        <Input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="mt-2 mb-5"
        />
      </div>
      <div>
        <Label htmlFor="fullName" className="mt-5">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          value={fullname || ''}
          onChange={(e) => setFullname(e.target.value)}
          className="mt-2 mb-5"
        />

      </div>
      <div>
        <Label htmlFor="username" className="mt-5">Username</Label>
        <Input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 mb-5"
        />
      </div>
      <div>
        <Button
          className=""
          onClick={() => updateProfile({ fullname, username, website, avatar_url: avatarUrl })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </Button>
      </div>
    </div>
  )
}