import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileStack,
  Layers,
  Lock,
  MessageSquare,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";
import {
  buildInnovatorDashboardHero,
  buildInnovatorProgramCard,
  getInnovatorExecutionPhasesLive,
  innovatorCareerReadiness,
  innovatorDashboardKpis,
  innovatorDashboardOpportunities,
  innovatorDashboardQuickWidgets,
  innovatorMentorFeedbackCards,
  innovatorTeamPanel,
  type ExecutionTaskRow,
} from "@/data/innovator-dashboard-workspace";
import { useNagpurNextCohortStoreVersion } from "@/hooks/use-nagpur-next-cohort-store";

function taskStatusClass(status: ExecutionTaskRow["status"]) {
  if (status === "Completed" || status === "Approved")
    return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200 border-emerald-500/30";
  if (status === "Pending Review" || status === "Under Review" || status === "Submitted")
    return "bg-amber-500/15 text-amber-900 dark:text-amber-100 border-amber-500/35";
  if (status === "Rework Needed") return "bg-rose-500/15 text-rose-900 dark:text-rose-100 border-rose-500/35";
  if (status === "In Progress") return "bg-violet-500/15 text-violet-900 dark:text-violet-100 border-violet-500/35";
  if (status === "Not Started") return "bg-muted text-muted-foreground border-border";
  return "bg-muted/80 text-muted-foreground border-border";
}

export default function InnovatorDashboard() {
  const cohortV = useNagpurNextCohortStoreVersion();
  const hero = useMemo(() => buildInnovatorDashboardHero(), [cohortV]);
  const innovatorProgramCard = useMemo(() => buildInnovatorProgramCard(), [cohortV]);
  const innovatorExecutionPhases = useMemo(() => getInnovatorExecutionPhasesLive(), [cohortV]);

  const navigate = useNavigate();
  const [taskModal, setTaskModal] = useState<ExecutionTaskRow | null>(null);

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 pb-10">
      {/* Hero */}
      <section
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
          "bg-gradient-to-br from-card via-card to-violet-500/[0.07]",
        )}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-600 text-lg font-bold text-primary-foreground shadow-md ring-4 ring-primary/15">
                {hero.initials}
              </div>
              <div className="min-w-0 space-y-3">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{hero.name}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{hero.roleLine}</p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    Current Project: <span className="text-primary">{hero.currentProject}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {hero.badges.map((b) => (
                    <Badge key={b.label} variant="secondary" className="border border-primary/20 bg-primary/[0.06] font-mono text-xs">
                      {b.label} {b.value}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline" className="border-primary/30 bg-primary/[0.06] font-semibold text-primary">
                    {innovatorActiveChallenge.cohort.programTitle}
                  </Badge>
                  <span className="rounded-lg border border-border/80 bg-secondary/60 px-2.5 py-1 font-medium text-foreground">
                    Cohort: {innovatorActiveChallenge.cohort.name}
                  </span>
                  <span className="rounded-lg border border-border/80 bg-secondary/60 px-2.5 py-1 font-medium text-foreground">
                    Assigned MSME: {hero.assignedMsme}
                  </span>
                  <span className="rounded-lg border border-emerald-500/25 bg-emerald-500/[0.08] px-2.5 py-1 font-medium text-emerald-900 dark:text-emerald-100">
                    {hero.challengeStatus}
                  </span>
                  <span className="rounded-lg border border-primary/20 bg-primary/[0.06] px-2.5 py-1 font-mono font-medium text-foreground">
                    Overall {hero.overallProgressPct}%
                  </span>
                  <span className="rounded-lg border border-border/80 bg-background px-2.5 py-1 text-muted-foreground">
                    Next review: <span className="font-medium text-foreground">{hero.nextReview}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-lg border border-border/80 bg-secondary/60 px-2.5 py-1 font-medium text-foreground">
                    Phase: {hero.currentPhase}
                  </span>
                  <span className="rounded-lg border border-violet-500/25 bg-violet-500/[0.08] px-2.5 py-1 font-medium text-violet-900 dark:text-violet-100">
                    {hero.currentSprint}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {hero.skills.map((s) => (
                    <Badge key={s} variant="outline" className="border-primary/20 bg-background/80 text-[11px] font-normal">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
              <Button className="gap-2 shadow-sm" onClick={() => navigate("/innovator/profile")}>
                View Profile
                <ChevronRight className="h-4 w-4 opacity-70" />
              </Button>
              <Button variant="secondary" className="gap-2" onClick={() => navigate("/innovator/recruit-profile")}>
                Edit Portfolio
                <ExternalLink className="h-4 w-4 opacity-70" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs — sourced from `innovatorActiveChallenge.dashboard.summaryKpis` */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {innovatorDashboardKpis.map((k) => (
          <Card
            key={k.id}
            className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] font-semibold",
                    k.positive ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "bg-rose-500/10 text-rose-700",
                  )}
                >
                  {k.positive ? <TrendingUp className="mr-0.5 inline h-3 w-3" /> : <TrendingDown className="mr-0.5 inline h-3 w-3" />}
                  {k.delta}
                </Badge>
              </div>
              <p className="text-xl font-bold tracking-tight text-foreground md:text-2xl">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick widgets */}
      <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <ClipboardList className="h-3.5 w-3.5 text-primary" />
              Assigned problem
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">
            {innovatorActiveChallenge.problemStatement}
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <MessageSquare className="h-3.5 w-3.5 text-violet-600" />
              Latest mentor comment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs leading-relaxed text-muted-foreground">{innovatorDashboardQuickWidgets.latestMentorComment}</CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              Upcoming deadline
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <p className="font-medium text-foreground">{innovatorDashboardQuickWidgets.upcomingDeadline.label}</p>
            <p className="mt-1 text-muted-foreground">{innovatorDashboardQuickWidgets.upcomingDeadline.date}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <FileStack className="h-3.5 w-3.5 text-primary" />
              Deliverable status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs">
            <p className="font-semibold text-foreground">{innovatorDashboardQuickWidgets.deliverableStatus.summary}</p>
            <Progress
              value={(innovatorDashboardQuickWidgets.deliverableStatus.submitted / innovatorDashboardQuickWidgets.deliverableStatus.expected) * 100}
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="inline-flex items-center gap-2 text-xs font-semibold">
              <Users className="h-3.5 w-3.5 text-primary" />
              Team members
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-xs">
            {innovatorDashboardQuickWidgets.teamMembers.map((m) => (
              <div key={m.name} className="flex justify-between gap-2 border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
                <span className="font-medium text-foreground">{m.name}</span>
                <span className="text-muted-foreground">{m.role}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Program + execution */}
        <div className="space-y-4 xl:col-span-2">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">{innovatorProgramCard.programName}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Week {innovatorProgramCard.weekCurrent} of {innovatorProgramCard.weekTotal}
                  </p>
                </div>
                <Button size="sm" className="shrink-0 gap-1" onClick={() => navigate("/innovator/sprint?from=dashboard")}>
                  Open active sprint
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border/80 bg-secondary/30 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Assigned challenge</p>
                <p className="mt-1 text-sm font-semibold text-foreground">{innovatorProgramCard.assignedChallengeTitle}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  <span>
                    MSME: <span className="font-medium text-foreground">{innovatorProgramCard.assignedMsme}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Status: <span className="font-medium text-foreground">{innovatorProgramCard.challengeStatus}</span>
                  </span>
                  <span>·</span>
                  <span>
                    Next review: <span className="font-medium text-foreground">{innovatorProgramCard.nextReview}</span>
                  </span>
                </div>
                <Button
                  variant="link"
                  className="mt-1 h-auto px-0 text-xs text-primary"
                  onClick={() => navigate(`/innovator/problems/${hero.linkedChallengeId}`)}
                >
                  Open challenge brief
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-border px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase text-muted-foreground">Mentor</p>
                  <p className="text-sm font-semibold">{innovatorProgramCard.mentorName}</p>
                </div>
                <div className="rounded-xl border border-border px-3 py-2.5">
                  <p className="text-[10px] font-medium uppercase text-muted-foreground">Demo Day</p>
                  <p className="text-sm font-semibold">{innovatorProgramCard.demoDaysLeft} days left</p>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                  <span>Program progress</span>
                  <span className="font-mono font-semibold text-foreground">{innovatorProgramCard.overallProgressPct}%</span>
                </div>
                <Progress value={innovatorProgramCard.overallProgressPct} className="h-2" />
              </div>
              <Progress value={(innovatorProgramCard.weekCurrent / innovatorProgramCard.weekTotal) * 100} className="h-1.5 opacity-80" />
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-base font-semibold">
                <Layers className="h-4 w-4 text-primary" />
                Active execution flow
              </CardTitle>
              <p className="text-xs text-muted-foreground">Phases unlock after sprint gate approval.</p>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" defaultValue={["nn-p3"]} className="space-y-2">
                {innovatorExecutionPhases.map((phase, idx) => (
                  <AccordionItem
                    key={phase.id}
                    value={phase.id}
                    className="rounded-xl border border-border px-3 data-[state=open]:bg-secondary/20"
                  >
                    <AccordionTrigger className="py-3 text-left hover:no-underline">
                      <div className="flex flex-1 flex-col gap-1 text-left sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-sm font-semibold">
                          PHASE {idx + 1}: {phase.title}
                        </span>
                        {phase.lockedUntilGate && idx > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <Lock className="h-3 w-3" />
                            Locked until sprint gate approved
                          </span>
                        ) : null}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0">
                      {phase.tasks.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Complete the active sprint to unlock tasks for this phase.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-medium text-muted-foreground">
                              Sprint: <span className="text-foreground">{phase.sprintLabel}</span>
                            </span>
                            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => navigate("/innovator/sprint?from=dashboard")}>
                              Open sprint board
                            </Button>
                          </div>
                          <div className="overflow-x-auto rounded-lg border border-border">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/40">
                                  <TableHead className="text-[11px]">Task</TableHead>
                                  <TableHead className="text-[11px]">Status</TableHead>
                                  <TableHead className="text-[11px]">Mentor</TableHead>
                                  <TableHead className="text-[11px]">Due</TableHead>
                                  <TableHead className="text-right text-[11px]">Tool</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {phase.tasks.map((row) => (
                                  <TableRow key={row.id} className="hover:bg-primary/[0.02]">
                                    <TableCell className="text-sm font-medium">{row.name}</TableCell>
                                    <TableCell>
                                      <Badge variant="outline" className={cn("text-[10px]", taskStatusClass(row.status))}>
                                        {row.status}
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">{row.mentor}</TableCell>
                                    <TableCell className="font-mono text-xs">{row.dueDate}</TableCell>
                                    <TableCell className="text-right">
                                      <Button
                                        size="sm"
                                        variant="secondary"
                                        className="h-8 text-xs"
                                        disabled={row.status === "Locked"}
                                        onClick={() => setTaskModal(row)}
                                      >
                                        <Wrench className="mr-1 h-3 w-3" />
                                        Open tool
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Mentor feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {innovatorMentorFeedbackCards.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    "rounded-xl border p-3 text-sm transition-colors hover:border-primary/25",
                    c.tone === "success" && "border-emerald-500/25 bg-emerald-500/[0.04]",
                    c.tone === "warning" && "border-amber-500/25 bg-amber-500/[0.05]",
                    c.tone === "primary" && "border-primary/25 bg-primary/[0.04]",
                    c.tone === "muted" && "border-border bg-secondary/30",
                  )}
                >
                  <p className="font-semibold text-foreground">{c.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.detail}</p>
                  <Button
                    variant="link"
                    className="mt-2 h-auto px-0 text-xs"
                    onClick={() => toast.message(c.title, { description: c.detail })}
                  >
                    Acknowledge
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
                <Target className="h-4 w-4 text-primary" />
                Career readiness
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Portfolio score</span>
                  <span className="font-mono font-bold">{innovatorCareerReadiness.portfolioScore}</span>
                </div>
                <Progress value={innovatorCareerReadiness.portfolioScore} className="mt-1 h-2" />
              </div>
              {(
                [
                  ["Tech match", innovatorCareerReadiness.techMatchPct],
                  ["Communication", innovatorCareerReadiness.communicationPct],
                  ["Leadership", innovatorCareerReadiness.leadershipPct],
                  ["Innovation index", innovatorCareerReadiness.innovationIndexPct],
                ] as const
              ).map(([label, pct]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono">{pct}%</span>
                  </div>
                  <Progress value={pct} className="mt-1 h-1.5" />
                </div>
              ))}
              <Button className="w-full" size="sm" onClick={() => navigate("/innovator/recruit-profile")}>
                Open recruit profile
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="inline-flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4 text-violet-600" />
                {innovatorTeamPanel.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-1.5 text-xs">
                {innovatorTeamPanel.membersDetail.map((m) => (
                  <li key={m.name} className="flex justify-between gap-2">
                    <span className="font-medium text-foreground">{m.name}</span>
                    <span className="text-muted-foreground">{m.role}</span>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-lg border border-border px-2 py-2">
                  <p className="text-muted-foreground">Members</p>
                  <p className="font-semibold">{innovatorTeamPanel.members}</p>
                </div>
                <div className="rounded-lg border border-border px-2 py-2">
                  <p className="text-muted-foreground">Contribution</p>
                  <p className="font-semibold">{innovatorTeamPanel.contributionPct}%</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Last activity: <span className="font-medium text-foreground">{innovatorTeamPanel.lastActivity}</span>
              </p>
              <Badge className="bg-emerald-500/90 text-[10px]">Health: {innovatorTeamPanel.health}</Badge>
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => navigate("/innovator/sprint?from=dashboard")}>
                View team workspace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Opportunities */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Opportunities</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {innovatorDashboardOpportunities.map((o) => (
            <Card key={o.id} className="rounded-2xl border-border shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold leading-snug">{o.title}</CardTitle>
                <p className="text-xs text-muted-foreground">{o.detail}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full text-xs"
                  onClick={() => {
                    if (o.id === "op1") navigate(`/innovator/problems/${hero.linkedChallengeId}`);
                    else if (o.id === "op5") navigate("/mentor/sessions");
                    else if (o.id === "op4") navigate("/reports");
                    else navigate("/innovator/marketplace");
                    toast.success(o.action, { description: o.title });
                  }}
                >
                  {o.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Dialog open={!!taskModal} onOpenChange={(o) => !o && setTaskModal(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          {taskModal && (
            <>
              <DialogHeader>
                <DialogTitle>{taskModal.name}</DialogTitle>
                <DialogDescription>
                  {taskModal.toolLabel} · Due {taskModal.dueDate} · Mentor {taskModal.mentor}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Open the linked workspace tool. Submission will sync to your sprint board.</p>
              </div>
              <DialogFooter className="gap-2 sm:justify-between">
                <Button variant="outline" onClick={() => setTaskModal(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Tool session opened", { description: taskModal.toolLabel });
                    setTaskModal(null);
                  }}
                >
                  Launch {taskModal.toolLabel}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
