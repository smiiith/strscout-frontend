"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { createClient } from '@/utils/supabase/server'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import axios from 'axios';
import { profile } from 'console';
import { useCallback, useEffect, useState } from 'react';

export default function Properties() {
  const browserClient = createClient()
  const [listings, setListings] = useState<any[]>([])

  const getProperties = async (user: any) => {
    try {
      if (!user?.id) {
        console.log("No user ID available");
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}properties`, {
        // body: { profileId: user.id },
        profileId: user.id,
        headers: {
          // 'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
        }
      });

      console.log("response", response);

      if (response.data) {
        setListings(response.data);
      }
    } catch (error) {
      console.error('Error loading user properties:', error);
    }
  }

  useEffect(() => {

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();

      console.log("user", user);

      getProperties(user);
      return user;
    }

    getUser();
  }, [])

  return <div>
    The Listings
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {listings.map((listing: any) => (
          <TableRow key={listing.id}>
            <TableCell>{listing.name}</TableCell>
            <TableCell>{listing.description}</TableCell>
            <TableCell>{listing.created_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>

  </div>
}