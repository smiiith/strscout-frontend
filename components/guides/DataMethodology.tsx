import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataMethodologyProps {
  totalProperties: number;
  category: string;
  analysisDetails?: string;
}

export function DataMethodology({
  totalProperties,
  category,
  analysisDetails,
}: DataMethodologyProps) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return (
    <section className="mb-12">
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle>About This Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            This guide is based on AI-powered analysis of{" "}
            <strong>{totalProperties.toLocaleString()} real Airbnb listings</strong>{" "}
            conducted between {sixMonthsAgo.toLocaleDateString()} and{" "}
            {new Date().toLocaleDateString()}.
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            {analysisDetails ||
              `Our analysis uses GPT-4o to evaluate listing ${category} against best practices for search visibility, clarity, and conversion. Each listing receives a rating out of 100 and specific improvement suggestions.`}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Source:</strong> STR Sage Property Analysis Database |{" "}
            <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
