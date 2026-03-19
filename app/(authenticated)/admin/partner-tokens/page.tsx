"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PartnerToken {
  id: string;
  token: string;
  partner_name: string;
  notes: string | null;
  runs_granted: number;
  redeemed_at: string | null;
  redeemed_by_user_id: string | null;
  created_at: string;
  expires_at: string | null;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PartnerTokensPage() {
  const [tokens, setTokens] = useState<PartnerToken[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [partnerName, setPartnerName] = useState("");
  const [notes, setNotes] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const loadTokens = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/partner-tokens");
      if (res.ok) {
        const data = await res.json();
        setTokens(data.tokens || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTokens();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) return;

    setIsCreating(true);
    setCreateError(null);

    try {
      const res = await fetch("/api/admin/partner-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partner_name: partnerName,
          notes: notes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setCreateError(data.error || "Failed to create token");
        return;
      }

      setPartnerName("");
      setNotes("");
      await loadTokens();
    } catch {
      setCreateError("Something went wrong. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleCopy = async (token: PartnerToken) => {
    const url = `${siteUrl}/partner/${token.token}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(token.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRevoke = async (token: PartnerToken) => {
    if (!confirm(`Revoke token for "${token.partner_name}"? This cannot be undone.`)) return;

    setRevokingId(token.id);
    try {
      const res = await fetch(
        `/api/admin/partner-tokens?id=${token.id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        await loadTokens();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to revoke token");
      }
    } finally {
      setRevokingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Partner Tokens</h1>
        <p className="text-muted-foreground mt-1">
          Generate single-use links that give partners free access to Market Spy
          and Market Scout — no account or payment required.
        </p>
      </div>

      {/* Create token */}
      <Card>
        <CardHeader>
          <CardTitle>Generate new token</CardTitle>
          <CardDescription>
            Each token grants 1 analysis run. Share the generated link with your
            partner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="partner_name">Partner / Promoter name</Label>
              <Input
                id="partner_name"
                placeholder="e.g. John Smith"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Input
                id="notes"
                placeholder="e.g. Podcast collaboration, referral partner"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {createError && (
              <p className="text-sm text-destructive">{createError}</p>
            )}

            <Button type="submit" disabled={isCreating || !partnerName.trim()}>
              {isCreating ? "Creating…" : "Generate token"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Token list */}
      <Card>
        <CardHeader>
          <CardTitle>All tokens</CardTitle>
          <CardDescription>
            {tokens.length} token{tokens.length !== 1 ? "s" : ""} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : tokens.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tokens yet. Generate one above.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tokens.map((token) => (
                  <TableRow key={token.id}>
                    <TableCell className="font-medium">
                      {token.partner_name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {token.notes || "—"}
                    </TableCell>
                    <TableCell>
                      {token.redeemed_at ? (
                        <Badge variant="secondary">
                          Redeemed {formatDate(token.redeemed_at)}
                        </Badge>
                      ) : token.expires_at &&
                        new Date(token.expires_at) < new Date() ? (
                        <Badge variant="destructive">Expired</Badge>
                      ) : (
                        <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                          Available
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(token.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(token)}
                          disabled={!!token.redeemed_at}
                        >
                          {copiedId === token.id ? "Copied!" : "Copy link"}
                        </Button>
                        {!token.redeemed_at && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleRevoke(token)}
                            disabled={revokingId === token.id}
                          >
                            {revokingId === token.id ? "Revoking…" : "Revoke"}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
