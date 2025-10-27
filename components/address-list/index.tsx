"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AddressCard from "../address-card";

interface Address {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
  comps?: any;
}

interface AddressListProps {
  comps: Address[];
  detailsPageUrl?: string; // Optional custom URL for details page (defaults to /comp-details)
}

export default function AddressList({ comps: comps, detailsPageUrl = "/comp-details" }: AddressListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAddresses = useMemo(() => {
    if (!searchTerm.trim()) {
      return comps;
    }

    return comps.filter((address) =>
      address.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [comps, searchTerm]);

  return (
    <div className="w-full space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search addresses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredAddresses.length === comps.length
          ? `Showing all ${comps.length} addresses`
          : `Found ${filteredAddresses.length} of ${comps.length} addresses`}
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredAddresses.map((comp) => (
          <AddressCard
            key={comp.id}
            address={comp.address}
            latitude={comp.latitude}
            longitude={comp.longitude}
            status={comp.status}
            occupancyData={comp.comps}
            useNavigation={true}
            compBasisId={comp.id}
            runDate={comp.created_at}
            detailsPageUrl={detailsPageUrl}
          />
        ))}
      </div>

      {/* No Results Message */}
      {filteredAddresses.length === 0 && searchTerm.trim() && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No addresses found matching "{searchTerm}"
          </p>
        </div>
      )}
    </div>
  );
}
