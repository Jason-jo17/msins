import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Building2, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getInnovatorProblemById } from "@/data/innovator-workspace";
import { cn } from "@/lib/utils";

export default function InnovatorProblemDetailPage() {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();
  const problem = useMemo(() => (problemId ? getInnovatorProblemById(problemId) : undefined), [problemId]);

  if (!problem) {
    return (
      <div className="max-w-xl mx-auto space-y-4 text-center py-16">
        <h1 className="text-lg font-semibold text-foreground">Problem not found</h1>
        <p className="text-sm text-muted-foreground">This challenge is not in your innovator workspace catalog.</p>
        <Button asChild variant="secondary">
          <Link to="/innovator/problems">Back to problems</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="ghost" size="sm" className="gap-1.5 -ml-2 text-muted-foreground" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <span className="text-muted-foreground">/</span>
        <Link to="/innovator/problems" className="text-sm text-primary hover:underline">
          Browse problems
        </Link>
      </div>

      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm",
          "bg-gradient-to-br from-card via-card to-violet-500/[0.06]",
        )}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="font-normal">
            {problem.sector}
          </Badge>
          <Badge className="bg-primary/90 font-normal gap-1">
            <Sparkles className="h-3 w-3" />
            {problem.matchPct}% match
          </Badge>
        </div>
        <h1 className="mt-4 text-2xl md:text-3xl font-bold tracking-tight text-foreground">{problem.title}</h1>
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-primary/80" />
            {problem.msme}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary/80" />
            {problem.region}, Maharashtra
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-violet-700 dark:text-violet-300">Estimated value: {problem.valueLabel}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Why you match:</span> {problem.why}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button onClick={() => navigate("/innovator/dashboard")}>Apply on dashboard</Button>
          <Button variant="outline" asChild>
            <Link to="/innovator/sprint">View sprint context</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Problem summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">{problem.summary}</CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Where it shows up</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">{problem.problemLocation}</CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Business impact</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">{problem.businessImpact}</CardContent>
        </Card>
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Desired outcome</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">{problem.desiredOutcome}</CardContent>
        </Card>
      </div>
    </div>
  );
}
