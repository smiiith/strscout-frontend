"use client";

import { Alert02Icon, CheckmarkCircle02Icon, City01Icon, MyAccountIcon } from "@/components/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatDate } from "@/lib/utils";
import { useRouter } from 'next/navigation';
import { set } from "date-fns";


const MyScans = () => {
  const router = useRouter();
  const browserClient = createClient()
  const [scans, setScans] = useState<any[]>([])


  const getScans = async (user: any) => {
    try {
      if (!user?.id) {
        console.log("No user ID available");
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}recentscans`, {
        profileId: user.id,
        headers: {
          'Authorization': `Bearer ${user.token}` // Include this if you need to send an auth token
        }
      });

      console.log("response", response);

      if (response.data) {
        setScans(response.data.scans);
      }
    } catch (error) {
      console.error('Error loading user scans:', error);
    }
  }

  useEffect(() => {

    console.log("use effect");

    const getUser = async () => {
      const { data: { user }, } = await browserClient.auth.getUser();

      getScans(user);
      return user;
    }

    getUser();
  }, [])

  return (
    <>
      <h1 className="text-3xl mb-6"><City01Icon className="h-8 w-8 inline-block mb-2 mr-2 text-secondary-foreground" />My Property Scans</h1>

      <div className="md:w-[500px]">
        {scans && scans.length > 0 && (
          <Table>
            <TableCaption>Your recent scans</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead className="">Property Name</TableHead>
                <TableHead>Scan Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scans.map((scan: any, index: number) => (
                <TableRow key={scan.id} className="hover:muted-foreground">
                  <TableCell>{scan.has_mismatch ? <span title="Issue found"><Alert02Icon color="red" /></span> : <span title="No issues found"><CheckmarkCircle02Icon color="green" /></span>}</TableCell>
                  <TableCell className="font-medium">
                    <div
                      className="cursor-pointer hover:underline hover:text-blue-500"
                      onClick={() => {
                        router.push(`/properties/add?property=${scan.properties.id}`);
                      }}>
                      {scan.properties.name}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(scan.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}

export default MyScans