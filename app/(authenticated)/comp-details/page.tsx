"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { MapPinIcon, Navigation03Icon } from "@/components/Icons";
import { useRouter } from "next/navigation";
import ProtectedPage from "@/components/ProtectedPage";
import { PLANS } from "@/app/types/plans";

interface OccupancyData {
  id: string;
  created_at: string;
  profile_id: string;
  scan_id: string;
  listing_id: string;
  thirty_day: number;
  sixty_day: number;
  ninety_day: number;
  overall_occupancy: number;
}

interface CompDetails {
  address: string;
  latitude: number;
  longitude: number;
  status: string;
  occupancyData: OccupancyData[];
}

export default function CompDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [compDetails, setCompDetails] = useState<CompDetails | null>(null);

  useEffect(() => {
    const address = searchParams.get("address");
    const latitude = searchParams.get("latitude");
    const longitude = searchParams.get("longitude");
    const status = searchParams.get("status");
    const occupancyData = searchParams.get("occupancyData");

    if (address && latitude && longitude && status) {
      setCompDetails({
        address,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        status,
        occupancyData: occupancyData ? JSON.parse(decodeURIComponent(occupancyData)) : [],
      });
    }
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  if (!compDetails) {
    return (
      <ProtectedPage requiredPlan={PLANS.STANDARD}>
        <div className="min-h-[700px] py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading comp details...</p>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage requiredPlan={PLANS.STANDARD}>
      <div className="min-h-[700px] py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Comps
          </Button>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-primary" color="red" />
                Comp Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
                <p className="text-lg">{compDetails.address}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Latitude</p>
                  <div className="flex items-center gap-1">
                    <Navigation03Icon className="h-3 w-3 text-muted-foreground" />
                    <p className="text-sm font-mono">{compDetails.latitude}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Longitude</p>
                  <div className="flex items-center gap-1">
                    <Navigation03Icon className="h-3 w-3 text-muted-foreground" />
                    <p className="text-sm font-mono">{compDetails.longitude}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                <p className="text-sm capitalize">{compDetails.status}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Occupancy Data ({compDetails.occupancyData.length} records)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {compDetails.occupancyData.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Listing ID</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>30 Day</TableHead>
                        <TableHead>60 Day</TableHead>
                        <TableHead>90 Day</TableHead>
                        <TableHead>Overall</TableHead>
                        <TableHead>Scan ID</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {compDetails.occupancyData.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-mono text-sm">{record.listing_id}</TableCell>
                          <TableCell className="text-sm">{formatDate(record.created_at)}</TableCell>
                          <TableCell className={`font-semibold ${getOccupancyColor(record.thirty_day)}`}>
                            {record.thirty_day}
                          </TableCell>
                          <TableCell className={`font-semibold ${getOccupancyColor(record.sixty_day)}`}>
                            {record.sixty_day}
                          </TableCell>
                          <TableCell className={`font-semibold ${getOccupancyColor(record.ninety_day)}`}>
                            {record.ninety_day}
                          </TableCell>
                          <TableCell className={`font-semibold ${getOccupancyColor(record.overall_occupancy)}`}>
                            {record.overall_occupancy}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{record.scan_id}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">No occupancy data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  );
}