"use client";

import { useState, useRef, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Message } from "@/components/ui/message";
import Papa from "papaparse";

interface Recipient {
  email: string;
  [key: string]: string;
}

interface SendResults {
  successful: string[];
  failed: { email: string; error: string }[];
}

interface ResendTemplate {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function EmailCampaignsPage() {
  const [templates, setTemplates] = useState<ResendTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [templateId, setTemplateId] = useState("");
  const [useHtml, setUseHtml] = useState(false);
  const [templateHtml, setTemplateHtml] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [fromName, setFromName] = useState("STR Scout");
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<SendResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch templates on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/admin/resend/templates");
        const data = await response.json();

        if (response.ok) {
          setTemplates(data.templates || []);
        } else {
          console.error("Failed to fetch templates:", data.error);
        }
      } catch (err) {
        console.error("Error fetching templates:", err);
      } finally {
        setLoadingTemplates(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setCsvFile(file);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data as Recipient[];

        // Validate that email column exists
        if (data.length > 0 && !data[0].email) {
          setError('CSV must have an "email" column');
          setRecipients([]);
          return;
        }

        setRecipients(data);
      },
      error: (error) => {
        setError(`Failed to parse CSV: ${error.message}`);
        setRecipients([]);
      },
    });
  };

  const handleSendCampaign = async () => {
    if (useHtml) {
      if (!templateHtml.trim()) {
        setError("Please enter HTML template");
        return;
      }
    } else {
      if (!templateId.trim()) {
        setError("Please enter Resend template ID");
        return;
      }
    }

    if (recipients.length === 0) {
      setError("Please upload a CSV file with recipients");
      return;
    }

    setIsSending(true);
    setProgress(0);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/admin/send-campaign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: useHtml ? undefined : templateId,
          templateHtml: useHtml ? templateHtml : undefined,
          fromEmail,
          fromName,
          subject,
          recipients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send campaign");
      }

      setResults(data.results);
      setProgress(100);
    } catch (err: any) {
      setError(err.message || "Failed to send campaign");
    } finally {
      setIsSending(false);
    }
  };

  const handleReset = () => {
    setTemplateId("");
    setTemplateHtml("");
    setUseHtml(false);
    setFromEmail("onboarding@resend.dev");
    setFromName("STR Scout");
    setSubject("");
    setRecipients([]);
    setCsvFile(null);
    setResults(null);
    setError(null);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Email Campaigns</h1>
        <p className="text-muted-foreground">
          Send marketing emails using Resend templates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Configuration</CardTitle>
            <CardDescription>
              Configure your email campaign settings and template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Type Toggle */}
            <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
              <Label htmlFor="useHtml" className="text-sm font-medium">
                Template Type:
              </Label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!useHtml}
                    onChange={() => setUseHtml(false)}
                    disabled={isSending}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Use Resend Template</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={useHtml}
                    onChange={() => setUseHtml(true)}
                    disabled={isSending}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Use Custom HTML</span>
                </label>
              </div>
            </div>

            {/* Resend Template Selector */}
            {!useHtml && (
              <div className="space-y-2">
                <Label htmlFor="templateId">Select Resend Template *</Label>
                {loadingTemplates ? (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                    <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Loading templates...
                    </span>
                  </div>
                ) : templates.length > 0 ? (
                  <>
                    <Select
                      value={templateId}
                      onValueChange={setTemplateId}
                      disabled={isSending}
                    >
                      <SelectTrigger id="templateId">
                        <SelectValue placeholder="Choose a template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      Variables from your CSV will be passed to the selected
                      template. Supports both {`{variable}`} and{" "}
                      {`{{variable}}`} formats.
                    </p>
                  </>
                ) : (
                  <div className="p-4 border rounded-md bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-2">
                      No templates found in your Resend account.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Create templates in your Resend dashboard, then refresh
                      this page.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* HTML Template Field */}
            {useHtml && (
              <div className="space-y-2">
                <Label htmlFor="templateHtml">Email HTML Template *</Label>
                <Textarea
                  id="templateHtml"
                  placeholder="Paste your HTML email template here. Use {{variablename}} for dynamic content (e.g., {{firstname}}, {{lastname}})"
                  value={templateHtml}
                  onChange={(e) => setTemplateHtml(e.target.value)}
                  disabled={isSending}
                  rows={10}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Use {`{{firstname}}`}, {`{{lastname}}`}, etc. to insert
                  variables from your CSV
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="subject">Email Subject *</Label>
              <Input
                id="subject"
                placeholder="e.g., Special offer just for you!"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSending}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromName">From Name</Label>
                <Input
                  id="fromName"
                  placeholder="STR Scout"
                  value={fromName}
                  onChange={(e) => setFromName(e.target.value)}
                  disabled={isSending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromEmail">From Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  placeholder="onboarding@resend.dev"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  disabled={isSending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="csvFile">Recipients CSV File *</Label>
              <Input
                id="csvFile"
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileUpload}
                disabled={isSending}
              />
              <p className="text-xs text-muted-foreground">
                Upload a CSV file with columns: email, firstname (and any other
                template variables)
              </p>
            </div>

            {error && <Message variant="error">{error}</Message>}
          </CardContent>
        </Card>

        {/* Preview Card */}
        {recipients.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recipients Preview</CardTitle>
              <CardDescription>
                {recipients.length} recipient
                {recipients.length !== 1 ? "s" : ""} loaded
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md max-h-96 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(recipients[0] || {}).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.slice(0, 10).map((recipient, index) => (
                      <TableRow key={index}>
                        {Object.values(recipient).map((value, valueIndex) => (
                          <TableCell key={valueIndex}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {recipients.length > 10 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Showing first 10 of {recipients.length} recipients
                </p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Send Button */}
        <div className="flex gap-4">
          <Button
            onClick={handleSendCampaign}
            disabled={
              isSending ||
              recipients.length === 0 ||
              (useHtml ? !templateHtml.trim() : !templateId.trim())
            }
            size="lg"
            className="flex-1"
          >
            {isSending
              ? "Sending..."
              : `Send Campaign to ${recipients.length} Recipients`}
          </Button>
          <Button
            onClick={handleReset}
            disabled={isSending}
            variant="outline"
            size="lg"
          >
            Reset
          </Button>
        </div>

        {/* Progress */}
        {isSending && (
          <Card>
            <CardContent className="pt-6">
              <Progress value={progress} className="w-full" />
              <p className="text-center mt-2 text-sm text-muted-foreground">
                Sending emails...
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results Card */}
        {results && (
          <Card>
            <CardHeader>
              <CardTitle>Campaign Results</CardTitle>
              <CardDescription>
                {results.successful.length} successful, {results.failed.length}{" "}
                failed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.successful.length > 0 && (
                <div>
                  <h3 className="font-semibold text-green-600 mb-2">
                    Successfully Sent ({results.successful.length})
                  </h3>
                  <div className="border rounded-md p-4 max-h-48 overflow-auto bg-green-50">
                    <div className="space-y-1">
                      {results.successful.map((email, index) => (
                        <p key={index} className="text-sm">
                          {email}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {results.failed.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">
                    Failed to Send ({results.failed.length})
                  </h3>
                  <div className="border rounded-md max-h-48 overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Error</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.failed.map((failure, index) => (
                          <TableRow key={index}>
                            <TableCell>{failure.email}</TableCell>
                            <TableCell className="text-red-600">
                              {failure.error}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
