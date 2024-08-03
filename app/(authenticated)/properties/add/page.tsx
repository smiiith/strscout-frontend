import React from 'react'
import { createClient } from '../../../../utils/supabase/server'

const Account = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div>Add a new property {user?.email}</div>
  )
}

export default Account;