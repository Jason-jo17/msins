import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Layers, Lock, LockOpen, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NAGPUR_NEXT_CYCLE_LABEL, NAGPUR_NEXT_PHASES } from "@/data/nagpur-next-program-config";
import type { NagpurCohortTaskStatus } from "@/lib/nagpur-next-cohort-store";
import {
  getNagpurNextCohortState,
  nagpurNextMentorReviewAction,
  nagpurNextReassignMentor,
  nagpurNextSetTaskDueDate,
  nagpurNextToggleTaskLock,
  nagpurNextUpdateTask,
} from "@/lib/nagpur-next-cohort-store";
import { cn } from "@/lib/utils";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";
import { mentorProfile } from "@/data/mentor-workspace";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";

const STATUS_OPTIONS: NagpurCohortTaskStatus[] = [
  "not_started",
  "in_progress",
  "submitted",
  "under_review",
  "approved",
  "rework_needed",
  "completed",
  "locked",
];

function statusBadge(status: NagpurCohortTaskStatus) {
  if (status === "completed" || status === "approved")
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100";
  if (status === "under_review" || status === "submitted")
    return "border-amber-500/35 bg-amber-500/10 text-amber-900 dark:text-amber-100";
  if (status === "rework_needed") return "border-rose-500/35 bg-rose-500/10 text-rose-900 dark:text-rose-100";
  if (status === "in_progress") return "border-violet-500/30 bg-violet-500/10 text-violet-900 dark:text-violet-100";
  if (status === "locked") return "border-border bg-muted text-muted-foreground";
  return "border-border bg-secondary/60 text-muted-foreground";
}

export default function CohortProgramBuilderPage() {
  const v = useNagpurNextCohortStoreVersion();
  const state = useMemo(() => getNagpurNextCohortState(), [v]);
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="mb-2 -ml-2 h-8 gap-1 text-xs" asChild>
            <Link to="/cohort/dashboard">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to desk
            </Link>
          </Button>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            Nagpur NEXT · Program builder
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-foreground">Cohort program framework</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Config-driven structure: phases, sprints, and tasks. Mentor actions write to the same store the innovator sprint
            reads — no duplicate program JSON.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Cycle <span className="font-medium text-foreground">{NAGPUR_NEXT_CYCLE_LABEL}</span> · Primary team{" "}
            <span className="font-medium text-foreground">{innovatorActiveChallenge.student.displayName}</span> ·{" "}
            {innovatorActiveChallenge.msme.company}
          </p>
        </div>
        <Card className="border-border shadow-sm sm:w-[280px] shrink-0">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Sync rule
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            Updates to status, comments, locks, and due dates on this screen persist to local storage and immediately refresh
            the innovator Active Sprint and dashboard execution table.
          </CardContent>
        </Card>
      </div>

      <Accordion type="multiple" defaultValue={NAGPUR_NEXT_PHASES.map((p) => p.id)} className="space-y-3">
        {NAGPUR_NEXT_PHASES.map((phase) => (
          <AccordionItem key={phase.id} value={phase.id} className="rounded-2xl border border-border bg-card shadow-sm">
            <AccordionTrigger className="px-4 py-3 text-left hover:no-underline md:px-5 [&[data-state=open]>svg]:rotate-180">
              <div className="flex flex-col gap-0.5 pr-2 text-left sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="text-sm font-semibold">
                  Phase {phase.index}: {phase.title}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {phase.sprints.length} sprint{phase.sprints.length > 1 ? "s" : ""}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-border/60 px-0 pb-4 pt-0">
              <div className="space-y-6 px-3 md:px-4 pt-4">
                {phase.sprints.map((sprint) => (
                  <div key={sprint.id} className="rounded-xl border border-border/80 bg-secondary/10 p-3 md:p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Sprint</p>
                        <p className="text-sm font-semibold text-foreground">{sprint.name}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">{sprint.evidenceNote}</p>
                      </div>
                    </div>
                    <div className="overflow-x-auto rounded-lg border border-border/80 bg-card">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-[11px] whitespace-nowrap">Task</TableHead>
                            <TableHead className="text-[11px]">Status</TableHead>
                            <TableHead className="text-[11px]">Due</TableHead>
                            <TableHead className="text-[11px]">Mentor</TableHead>
                            <TableHead className="text-[11px] min-w-[220px]">Mentor actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sprint.tasks.map((t) => {
                            const rt = state.taskState[t.id];
                            const st = rt?.status ?? "not_started";
                            return (
                              <TableRow key={t.id}>
                                <TableCell className="max-w-[240px]">
                                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                                  <p className="text-[11px] text-muted-foreground">{t.subtitle}</p>
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={st}
                                    onValueChange={(val) =>
                                      nagpurNextUpdateTask(t.id, { status: val as NagpurCohortTaskStatus })
                                    }
                                  >
                                    <SelectTrigger className="h-8 w-[140px] text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {STATUS_OPTIONS.map((s) => (
                                        <SelectItem key={s} value={s} className="text-xs">
                                          {s.replace(/_/g, " ")}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <Badge variant="outline" className={cn("mt-1.5 text-[10px] font-normal", statusBadge(st))}>
                                    {st.replace(/_/g, " ")}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    className="h-8 w-[120px] text-xs"
                                    defaultValue={rt?.dueDate}
                                    onBlur={(e) => nagpurNextSetTaskDueDate(t.id, e.target.value)}
                                  />
                                </TableCell>
                                <TableCell>
                                  <Select
                                    value={rt?.mentor ?? innovatorActiveChallenge.mentor.primaryName}
                                    onValueChange={(val) => nagpurNextReassignMentor(t.id, val)}
                                  >
                                    <SelectTrigger className="h-8 w-[160px] text-xs">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value={innovatorActiveChallenge.mentor.primaryName} className="text-xs">
                                        {innovatorActiveChallenge.mentor.primaryName}
                                      </SelectItem>
                                      <SelectItem value={mentorProfile.shortName} className="text-xs">
                                        {mentorProfile.shortName}
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-wrap gap-1">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="h-7 text-[10px] px-2"
                                        onClick={() => nagpurNextMentorReviewAction(t.id, "approve", "Approved via builder")}
                                      >
                                        Approve
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 text-[10px] px-2"
                                        onClick={() =>
                                          nagpurNextMentorReviewAction(t.id, "request_changes", "Please refine evidence")
                                        }
                                      >
                                        Request changes
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-7 gap-0.5 text-[10px] px-2"
                                        onClick={() => {
                                          nagpurNextToggleTaskLock(t.id);
                                          toast.message(rt?.taskLocked ? "Task unlocked" : "Task locked");
                                        }}
                                      >
                                        {rt?.taskLocked ? <LockOpen className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                        {rt?.taskLocked ? "Unlock" : "Lock"}
                                      </Button>
                                    </div>
                                    <div className="flex gap-1">
                                      <Input
                                        className="h-8 flex-1 text-xs"
                                        placeholder="Add comment…"
                                        value={commentDraft[t.id] ?? ""}
                                        onChange={(e) => setCommentDraft((d) => ({ ...d, [t.id]: e.target.value }))}
                                      />
                                      <Button
                                        size="sm"
                                        className="h-8 shrink-0 text-xs"
                                        onClick={() => {
                                          const c = commentDraft[t.id]?.trim();
                                          if (!c) return;
                                          nagpurNextMentorReviewAction(t.id, "comment", c);
                                          setCommentDraft((d) => ({ ...d, [t.id]: "" }));
                                        }}
                                      >
                                        Post
                                      </Button>
                                    </div>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
