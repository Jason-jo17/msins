import {
  NAGPUR_NEXT_CYCLE_LABEL,
  NAGPUR_NEXT_EXECUTION_LANES,
  NAGPUR_NEXT_INNOVATOR_TEAM_ID,
  NAGPUR_NEXT_PHASES,
  NAGPUR_NEXT_PROGRAM_ID,
  NAGPUR_NEXT_TASK_ID_ORDER,
  getSprintOrderIndex,
  type NagpurProgramPhaseTemplate,
  type NagpurProgramSprintTemplate,
  type NagpurProgramTaskTemplate,
  type NagpurProgramResource,
  type NagpurProgramSme,
} from "@/data/nagpur-next-program-config";
import { innovatorActiveChallenge } from "@/data/innovator-active-challenge";
import type {
  InnovatorEvidenceItem,
  InnovatorExecutionPhase,
  InnovatorSprint,
  InnovatorSprintTask,
  InnovatorTaskStatus,
} from "@/data/innovator-active-challenge";
import { mentorProfile } from "@/data/mentor-workspace";

const LS_KEY = "maharashtra-nagpur-next-cohort-v1";
const PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

const M_MSME = innovatorActiveChallenge.msme.poc;
const M_COHORT = mentorProfile.shortName;

export type NagpurCohortTaskStatus = InnovatorTaskStatus;

export type CohortActivityKind =
  | "submission"
  | "feedback"
  | "approval"
  | "sprint_unlock"
  | "delay";

export interface CohortActivityItem {
  id: string;
  kind: CohortActivityKind;
  label: string;
  detail: string;
  atLabel: string;
  teamId: string;
}

export interface CohortReviewItem {
  id: string;
  dateLabel: string;
  teamName: string;
  sprintLabel: string;
  mentor: string;
}

export interface NagpurTeamCard {
  id: string;
  teamName: string;
  studentLead: string;
  college: string;
  currentSprintLabel: string;
  currentPhaseTitle: string;
  riskReason?: string;
  atRisk: boolean;
  progressPct: number;
  domain: string;
}

export interface TaskRuntime {
  status: NagpurCohortTaskStatus;
  dueDate: string;
  mentor: string;
  mentorComments: string[];
  submitted: boolean;
  mentorReview?: "Approved" | "Pending Review";
  evidence: InnovatorEvidenceItem[];
  /** Mentor/admin hard lock */
  taskLocked: boolean;
}

export interface NagpurCohortStoreState {
  version: 1;
  programId: typeof NAGPUR_NEXT_PROGRAM_ID;
  cycleLabel: string;
  /** Dynamic program structure */
  programFramework: NagpurProgramPhaseTemplate[];
  /** TRL / CRL / IRL — innovator UI reads same numbers */
  levels: { trl: number; crl: number; irl: number };
  taskState: Record<string, TaskRuntime>;
  activity: CohortActivityItem[];
  upcomingReviews: CohortReviewItem[];
  teamsMeta: Record<string, { atRisk: boolean; riskReason?: string }>;
  avgMentorResponseHours: number;
  demoReadinessPct: number;
  activeProjectId: string;
}

type Listener = () => void;
const listeners = new Set<Listener>();
let memVersion = 0;

function defaultMentorForTask(taskIndex: number): string {
  return taskIndex % 2 === 0 ? M_MSME : M_COHORT;
}

function buildDefaultTaskState(framework: NagpurProgramPhaseTemplate[]): Record<string, TaskRuntime> {
  const map: Record<string, TaskRuntime> = {};
  let idx = 0;
  for (const ph of framework) {
    for (const sp of ph.sprints) {
      for (const t of sp.tasks) {
        map[t.id] = {
          status: "not_started",
          dueDate: "Jun 2026",
          mentor: defaultMentorForTask(idx),
          mentorComments: [],
          submitted: false,
          evidence: [],
          taskLocked: false,
        };
        idx += 1;
      }
    }
  }
  return map;
}

/** Demo seed aligned with Kiran / Navitas / Nagpur NEXT narrative */
function initialState(): NagpurCohortStoreState {
  const programFramework = JSON.parse(JSON.stringify(NAGPUR_NEXT_PHASES));
  const taskState = buildDefaultTaskState(programFramework);
  const done = (id: string, due: string, mentor?: string, evidenceTitle?: string) => {
    taskState[id] = {
      ...taskState[id],
      status: "completed",
      dueDate: due,
      mentor: mentor ?? taskState[id].mentor,
      submitted: true,
      mentorReview: "Approved",
      mentorComments: ["Meets Nagpur NEXT gate — keep evidence trail updated."],
      evidence: evidenceTitle
        ? [{ id: `${id}-ev`, title: evidenceTitle, url: PDF, kind: "pdf" }]
        : [],
      taskLocked: false,
    };
  };

  // Phase 1–2 + sprint 5 complete
  done("nn-t-s1-1", "12 Apr 2026", M_MSME, "Industry_Scan_Nagpur.pdf");
  done("nn-t-s1-2", "14 Apr 2026", M_COHORT, "Competitor_Study_Lighting.pdf");
  done("nn-t-s1-3", "16 Apr 2026", M_MSME, "User_Pain_SAR_Operators.pdf");
  done("nn-t-s1-4", "18 Apr 2026", M_COHORT, "Problem_Frame_HMW.pdf");
  done("nn-t-s2-1", "20 Apr 2026", M_MSME, "Stakeholder_Interviews.pdf");
  done("nn-t-s2-2", "21 Apr 2026", M_MSME, "Field_Visit_Navitas.pdf");
  done("nn-t-s2-3", "22 Apr 2026", M_COHORT, "Operator_Survey_Chart.pdf");
  done("nn-t-s2-4", "24 Apr 2026", M_COHORT, "Insight_Synthesis_Memo.pdf");
  done("nn-t-s3-1", "26 Apr 2026", M_COHORT, "Fishbone_Night_Coverage.pdf");
  done("nn-t-s3-2", "27 Apr 2026", M_COHORT, "Five_Why_Pack.pdf");
  done("nn-t-s3-3", "28 Apr 2026", M_MSME, "Opportunity_Areas_Map.pdf");
  done("nn-t-s4-1", "30 Apr 2026", M_COHORT, "Idea_Generation_Board.pdf");
  done("nn-t-s4-2", "2 May 2026", M_MSME, "Concept_Scoring_Sheet.pdf");
  done("nn-t-s4-3", "4 May 2026", M_MSME, "Feasibility_Matrix.pdf");
  done("nn-t-s5-1", "8 May 2026", M_MSME, "BOM_Draft_Navitas.pdf");
  done("nn-t-s5-2", "10 May 2026", M_COHORT, "CAD_Architecture_Pack.pdf");
  done("nn-t-s5-3", "12 May 2026", M_MSME, "Resource_Plan.pdf");

  // Sprint 6 — active
  taskState["nn-t-s6-1"] = {
    ...taskState["nn-t-s6-1"],
    status: "under_review",
    dueDate: "18 May 2026",
    mentor: M_MSME,
    submitted: true,
    mentorReview: "Pending Review",
    mentorComments: [
      "Strong bench evidence — add one more lux contour at 40 m AGL.",
      "Awaiting final pass for MVP gate.",
    ],
    evidence: [{ id: "nn-t-s6-1-ev", title: "Prototype_Evidence_Pack.pdf", url: PDF, kind: "pdf" }],
    taskLocked: false,
  };
  taskState["nn-t-s6-2"] = {
    ...taskState["nn-t-s6-2"],
    status: "in_progress",
    dueDate: "22 May 2026",
    mentor: M_COHORT,
    submitted: false,
    mentorComments: ["Log fail-safe cutover explicitly in next upload."],
    evidence: [{ id: "nn-t-s6-2-ev", title: "Testing_Log_Draft.pdf", url: PDF, kind: "pdf" }],
    taskLocked: false,
  };
  taskState["nn-t-s6-3"] = {
    ...taskState["nn-t-s6-3"],
    status: "not_started",
    dueDate: "28 May 2026",
    mentor: M_MSME,
    mentorComments: [],
    submitted: false,
    evidence: [],
    taskLocked: false,
  };

  const activity: CohortActivityItem[] = [
    {
      id: "act-1",
      kind: "submission",
      label: "Submission uploaded",
      detail: `${innovatorActiveChallenge.student.displayName} — Prototype evidence pack (Sprint 6)`,
      atLabel: "2h ago",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-2",
      kind: "feedback",
      label: "Mentor feedback added",
      detail: `${M_MSME} commented on Testing logs`,
      atLabel: "5h ago",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-3",
      kind: "approval",
      label: "Task approved",
      detail: "Resource plan signed off for MVP build",
      atLabel: "Yesterday",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-4",
      kind: "sprint_unlock",
      label: "Sprint unlocked",
      detail: "Sprint 6: MVP Build unlocked after planning gate",
      atLabel: "2d ago",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    },
    {
      id: "act-5",
      kind: "delay",
      label: "Team delayed",
      detail: "Team Aurora — waiting on vendor LEDs (watchlist)",
      atLabel: "3d ago",
      teamId: "team-aurora",
    },
  ];

  const upcomingReviews: CohortReviewItem[] = [
    {
      id: "rev-1",
      dateLabel: innovatorActiveChallenge.project.nextReview,
      teamName: `${innovatorActiveChallenge.project.name} · ${innovatorActiveChallenge.student.displayName}`,
      sprintLabel: "Sprint 6: MVP Build",
      mentor: M_MSME,
    },
    {
      id: "rev-2",
      dateLabel: "25 May 2026",
      teamName: "Aurora Grid Labs",
      sprintLabel: "Sprint 5: Prototype Planning",
      mentor: M_COHORT,
    },
    {
      id: "rev-3",
      dateLabel: "29 May 2026",
      teamName: "Vidarbha AgriSense",
      sprintLabel: "Sprint 4: Ideation",
      mentor: M_MSME,
    },
  ];

  return {
    version: 1,
    programId: NAGPUR_NEXT_PROGRAM_ID,
    cycleLabel: NAGPUR_NEXT_CYCLE_LABEL,
    programFramework,
    levels: { ...innovatorActiveChallenge.levels },
    taskState,
    activity,
    upcomingReviews,
    teamsMeta: {
      [NAGPUR_NEXT_INNOVATOR_TEAM_ID]: { atRisk: false },
      "team-aurora": { atRisk: true, riskReason: "Vendor slip on LED reels — milestone at risk" },
      "team-agrisense": { atRisk: false },
    },
    avgMentorResponseHours: 6.5,
    demoReadinessPct: 61,
    activeProjectId: "project-drone",
  };
}

function loadOrCreate(): NagpurCohortStoreState {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return initialState();
    const parsed = JSON.parse(raw) as NagpurCohortStoreState;
    if (parsed?.version !== 1 || !parsed.taskState) return initialState();
    return parsed;
  } catch {
    return initialState();
  }
}

let state: NagpurCohortStoreState = loadOrCreate();

function persist() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function emit() {
  memVersion += 1;
  persist();
  listeners.forEach((l) => l());
}

export function subscribeNagpurNextCohortStore(cb: Listener) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getNagpurNextCohortStoreVersion() {
  return memVersion;
}

export function getNagpurNextCohortState(): NagpurCohortStoreState {
  return state;
}

export function resetNagpurNextCohortDemo() {
  state = initialState();
  emit();
}

function taskWeight(s: NagpurCohortTaskStatus): number {
  if (s === "completed" || s === "approved") return 1;
  if (s === "under_review" || s === "submitted") return 0.85;
  if (s === "in_progress" || s === "rework_needed") return 0.45;
  if (s === "not_started") return 0;
  if (s === "locked") return 0;
  return 0;
}

function isTerminal(s: NagpurCohortTaskStatus): boolean {
  return s === "completed" || s === "approved";
}

function sprintComplete(sprintId: string): boolean {
  const sprint = state.programFramework.flatMap((p) => p.sprints).find((s) => s.id === sprintId);
  if (!sprint) return false;
  return sprint.tasks.every((t) => {
    const st = state.taskState[t.id]?.status ?? "not_started";
    return isTerminal(st);
  });
}

function sprintGloballyLocked(sprintId: string): boolean {
  const ord = getSprintOrderIndex(sprintId);
  if (ord <= 0) return false;
  const flat = state.programFramework.flatMap((p) => p.sprints);
  const prev = flat[ord - 1];
  return !sprintComplete(prev.id);
}

function mergeSprint(phase: NagpurProgramPhaseTemplate, sprint: NagpurProgramSprintTemplate): InnovatorSprint {
  const sequentialLock = sprintGloballyLocked(sprint.id);
  const locked = sequentialLock;

  return {
    id: sprint.id,
    name: sprint.name,
    locked,
    lockHint: sequentialLock ? "Complete the previous sprint gate to unlock." : "Locked by mentor.",
    defaultOpen: !locked && (sprint.id === "nn-s6" || sprint.id === "nn-s5"),
    evidenceNote: sprint.evidenceNote,
    tasks: sprint.tasks.map((t) => toInnovatorTask(phase, sprint, t.id)),
    resources: sprint.resources,
    smeData: sprint.smeData,
  };
}

function toInnovatorTask(
  phase: NagpurProgramPhaseTemplate,
  sprint: NagpurProgramSprintTemplate,
  taskId: string,
): InnovatorSprintTask {
  const tmpl = sprint.tasks.find((x) => x.id === taskId)!;
  const rt = state.taskState[taskId] ?? buildDefaultTaskState(state.programFramework)[taskId];
  const sequentialLock = sprintGloballyLocked(sprint.id);
  let status: InnovatorTaskStatus = rt.status;
  if (sequentialLock) status = "locked";
  else if (rt.taskLocked) status = "locked";

  const score =
    status === "completed" || status === "approved"
      ? "9.0 / 10"
      : status === "under_review"
        ? "In review"
        : status === "rework_needed"
          ? "Rework"
          : "—";

  return {
    id: tmpl.id,
    name: tmpl.name,
    subtitle: tmpl.subtitle,
    status,
    dueDate: rt.dueDate,
    mentor: rt.mentor,
    submitted: rt.submitted,
    mentorReview: rt.mentorReview,
    progressPct:
      status === "in_progress" ? 42 : status === "under_review" ? 88 : status === "submitted" ? 100 : undefined,
    toolLabel: "Open workspace",
    objective: tmpl.objective,
    mentorComments: rt.mentorComments,
    score,
    evidence: rt.evidence,
    resources: tmpl.resources,
    smeData: tmpl.smeData,
  };
}

export function getNagpurNextExecutionPhasesForInnovator(): InnovatorExecutionPhase[] {
  return state.programFramework.map((phase) => ({
    id: phase.id,
    index: phase.index,
    title: phase.title,
    defaultOpen: phase.id === "nn-p3",
    collapsedSprintLabels: [] as string[],
    sprints: phase.sprints.map((s) => mergeSprint(phase, s)),
  }));
}

export function getNagpurNextSprintHeaderSnapshot() {
  const pct = computeOverallProgressPct();
  return {
    userName: innovatorActiveChallenge.student.displayName,
    studentName: innovatorActiveChallenge.student.displayName,
    projectName: innovatorActiveChallenge.project.name,
    programName: innovatorActiveChallenge.cohort.name,
    assignedMsme: innovatorActiveChallenge.msme.company,
    stage: innovatorActiveChallenge.project.stageLabel,
    trl: state.levels.trl,
    crl: state.levels.crl,
    irl: state.levels.irl,
    currentPhase: "Phase 3: Prototype Development",
    currentSprint: "Sprint 6: MVP Build",
    progressPct: pct,
    nextMentorReview: innovatorActiveChallenge.project.nextReview,
    challengeStatus: innovatorActiveChallenge.project.status,
    domain: innovatorActiveChallenge.msme.domain,
  } as const;
}

/** Set active project ID for innovator context */
export function nagpurNextSetActiveProject(projectId: string) {
  state.activeProjectId = projectId;
  emit();
}

/** Get active project context from innovator challenge */
export function getNagpurNextActiveProject() {
  const pId = state.activeProjectId || "project-drone";
  return innovatorActiveChallenge.projects.find((p) => p.id === pId) || innovatorActiveChallenge.projects[0];
}

export function getNagpurNextProjectSnapshot() {
  const pct = computeOverallProgressPct();
  return {
    overallProgressPct: pct,
    nextReview: innovatorActiveChallenge.project.nextReview,
    weekCurrent: innovatorActiveChallenge.project.weekCurrent,
    weekTotal: innovatorActiveChallenge.project.weekTotal,
    demoDaysLeft: innovatorActiveChallenge.project.demoDaysLeft,
    stageLabel: innovatorActiveChallenge.project.stageLabel,
    currentPhaseTitle: "Phase 3: Prototype Development",
    currentSprintTitle: "Sprint 6: MVP Build",
  } as const;
}

function computeOverallProgressPct(): number {
  let sum = 0;
  const taskIds = state.programFramework.flatMap(p => p.sprints).flatMap(s => s.tasks).map(t => t.id);
  for (const id of taskIds) {
    const s = state.taskState[id]?.status ?? "not_started";
    sum += taskWeight(s);
  }
  if (taskIds.length === 0) return 0;
  return Math.min(100, Math.round((sum / taskIds.length) * 100));
}

export function getNagpurNextLaneProgress() {
  return NAGPUR_NEXT_EXECUTION_LANES.map((lane) => {
    const taskIds = state.programFramework.flatMap((p) =>
      p.sprints.filter((s) => (lane.sprintIds as readonly string[]).includes(s.id)).flatMap((s) => s.tasks.map((t) => t.id)),
    );
    const pct =
      taskIds.length === 0
        ? 0
        : Math.round(
            (taskIds.reduce((a, id) => a + taskWeight(state.taskState[id]?.status ?? "not_started"), 0) / taskIds.length) *
              100,
          );
    return { id: lane.id, label: lane.label, completionPct: Math.min(100, pct) };
  });
}

export function getNagpurNextCohortKpis() {
  const tasks = Object.values(state.taskState);
  const pendingReview = tasks.filter((t) => t.status === "under_review").length;
  const approved = tasks.filter((t) => t.mentorReview === "Approved" || t.status === "approved" || t.status === "completed").length;
  const totalInnovators = 24;
  const activeTeams = 18;
  const atRiskTeams = Object.values(state.teamsMeta).filter((m) => m.atRisk).length;
  const sprintCompletion = computeOverallProgressPct();

  return [
    { id: "ti", label: "Total innovators", value: String(totalInnovators) },
    { id: "at", label: "Active teams", value: String(activeTeams) },
    { id: "pr", label: "Tasks pending review", value: String(pendingReview) },
    { id: "sc", label: "Sprint completion", value: `${sprintCompletion}%` },
    { id: "rk", label: "At-risk teams", value: String(atRiskTeams) },
    { id: "ap", label: "Approved submissions", value: String(approved) },
    { id: "rt", label: "Avg mentor response", value: `${state.avgMentorResponseHours}h` },
    { id: "dr", label: "Demo readiness", value: `${state.demoReadinessPct}%` },
  ] as const;
}

export function getNagpurNextTeamsAttention(): NagpurTeamCard[] {
  return [
    {
      id: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
      teamName: innovatorActiveChallenge.project.name,
      studentLead: innovatorActiveChallenge.student.displayName,
      college: "VNIT Nagpur",
      currentSprintLabel: "Sprint 6: MVP Build",
      currentPhaseTitle: "Prototype Development",
      atRisk: state.teamsMeta[NAGPUR_NEXT_INNOVATOR_TEAM_ID]?.atRisk ?? false,
      riskReason: state.teamsMeta[NAGPUR_NEXT_INNOVATOR_TEAM_ID]?.riskReason,
      progressPct: computeOverallProgressPct(),
      domain: innovatorActiveChallenge.msme.domain,
    },
    {
      id: "team-aurora",
      teamName: "Aurora Grid Labs",
      studentLead: "Sana Sheikh",
      college: "IIM Nagpur",
      currentSprintLabel: "Sprint 5: Prototype Planning",
      currentPhaseTitle: "Prototype Development",
      atRisk: true,
      riskReason: state.teamsMeta["team-aurora"]?.riskReason,
      progressPct: 54,
      domain: "Energy",
    },
    {
      id: "team-agrisense",
      teamName: "Vidarbha AgriSense",
      studentLead: "Rohit Bhagat",
      college: "PIET Nagpur",
      currentSprintLabel: "Sprint 4: Ideation",
      currentPhaseTitle: "Validation & Concepting",
      atRisk: false,
      progressPct: 62,
      domain: "Agri-tech",
    },
  ];
}

export function getNagpurNextTeamDetail(teamId: string) {
  const ac = innovatorActiveChallenge;
  if (teamId !== NAGPUR_NEXT_INNOVATOR_TEAM_ID) {
    const card = getNagpurNextTeamsAttention().find((t) => t.id === teamId);
    return {
      teamId,
      student: card
        ? { name: card.studentLead, college: card.college, skills: [] as string[], matchScore: 0, attendancePct: 0, trend: "—" as const }
        : null,
      project: card
        ? {
            problemStatement: "—",
            msme: "—",
            trl: 0,
            crl: 0,
            irl: 0,
            phase: card.currentPhaseTitle,
            sprint: card.currentSprintLabel,
          }
        : null,
      tasksPreview: [] as { name: string; status: string }[],
    };
  }

  const taskIds = state.programFramework.flatMap(p => p.sprints).flatMap(s => s.tasks).map(t => t.id);
  const tasksPreview = taskIds.map((id) => {
    const tmpl = state.programFramework.flatMap((p) => p.sprints).flatMap((s) => s.tasks).find((t) => t.id === id)!;
    return { id, name: tmpl.name, status: state.taskState[id]?.status ?? "not_started" };
  });

  return {
    teamId,
    student: {
      name: ac.student.displayName,
      college: "VNIT Nagpur",
      skills: [...ac.skills],
      matchScore: 94,
      attendancePct: ac.cohortRank.attendancePct,
      trend: "Up" as const,
    },
    project: {
      problemStatement: ac.problemStatement,
      msme: ac.msme.company,
      trl: state.levels.trl,
      crl: state.levels.crl,
      irl: state.levels.irl,
      phase: "Phase 3: Prototype Development",
      sprint: "Sprint 6: MVP Build",
    },
    tasksPreview,
    feedback: ac.mentor.timeline.map((m) => ({ author: m.author, message: m.message })),
    files: ac.deliverableVault,
  };
}

function pushActivity(item: Omit<CohortActivityItem, "id">) {
  const id = `act-${Date.now()}`;
  state = { ...state, activity: [{ id, ...item }, ...state.activity].slice(0, 40) };
  emit();
}

export function nagpurNextUpdateTask(
  taskId: string,
  patch: Partial<TaskRuntime> & { status?: NagpurCohortTaskStatus },
) {
  const cur = state.taskState[taskId];
  if (!cur) return;
  const next: TaskRuntime = { ...cur, ...patch };
  if (patch.status === "approved" || patch.status === "completed") {
    next.mentorReview = "Approved";
    next.submitted = true;
  }
  if (patch.status === "rework_needed") {
    next.mentorReview = "Pending Review";
  }
  state = { ...state, taskState: { ...state.taskState, [taskId]: next } };
  emit();
}

export function nagpurNextMentorReviewAction(
  taskId: string,
  action: "approve" | "request_changes" | "comment",
  comment?: string,
) {
  const cur = state.taskState[taskId];
  if (!cur) return;
  if (action === "approve") {
    nagpurNextUpdateTask(taskId, {
      status: "completed",
      mentorReview: "Approved",
      mentorComments: [...cur.mentorComments, comment ?? "Approved for Nagpur NEXT gate."],
    });
    pushActivity({
      kind: "approval",
      label: "Task approved",
      detail: `${taskId} marked approved`,
      atLabel: "Just now",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    });
  } else if (action === "request_changes") {
    nagpurNextUpdateTask(taskId, {
      status: "rework_needed",
      mentorReview: "Pending Review",
      mentorComments: [...cur.mentorComments, comment ?? "Changes requested — see comments."],
    });
    pushActivity({
      kind: "feedback",
      label: "Changes requested",
      detail: comment ?? "Mentor requested updates",
      atLabel: "Just now",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    });
  } else if (action === "comment" && comment?.trim()) {
    nagpurNextUpdateTask(taskId, {
      mentorComments: [...cur.mentorComments, comment.trim()],
    });
    pushActivity({
      kind: "feedback",
      label: "Mentor comment",
      detail: comment.trim(),
      atLabel: "Just now",
      teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
    });
  }
}

export function nagpurNextToggleTaskLock(taskId: string) {
  const cur = state.taskState[taskId];
  if (!cur) return;
  nagpurNextUpdateTask(taskId, { taskLocked: !cur.taskLocked });
}

export function nagpurNextSetTaskDueDate(taskId: string, dueDate: string) {
  nagpurNextUpdateTask(taskId, { dueDate });
}

export function nagpurNextReassignMentor(taskId: string, mentor: string) {
  nagpurNextUpdateTask(taskId, { mentor });
}

export function nagpurNextSetTeamAtRisk(teamId: string, atRisk: boolean, riskReason?: string) {
  state = {
    ...state,
    teamsMeta: { ...state.teamsMeta, [teamId]: { atRisk, riskReason } },
  };
  emit();
}

export function nagpurNextSetLevels(levels: { trl: number; crl: number; irl: number }) {
  state = { ...state, levels: { ...levels } };
  emit();
}

/** Innovator-side: record upload (demo) — keeps activity feed aligned */
export function nagpurNextRecordInnovatorSubmission(taskId: string, fileName: string) {
  const cur = state.taskState[taskId];
  if (!cur) return;
  nagpurNextUpdateTask(taskId, {
    submitted: true,
    status: cur.status === "not_started" ? "submitted" : "under_review",
    evidence: [...cur.evidence, { id: `up-${Date.now()}`, title: fileName, url: PDF, kind: "pdf" }],
  });
  pushActivity({
    kind: "submission",
    label: "Submission uploaded",
    detail: `${innovatorActiveChallenge.student.displayName} — ${fileName}`,
    atLabel: "Just now",
    teamId: NAGPUR_NEXT_INNOVATOR_TEAM_ID,
  });
}

// PROGRAM MANAGEMENT ACTIONS

export function nagpurNextUpdateSprint(sprintId: string, patch: Partial<NagpurProgramSprintTemplate>) {
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => s.id === sprintId ? { ...s, ...patch } : s)
    }))
  };
  emit();
}

export function nagpurNextAddSprintResource(sprintId: string, resource: Omit<NagpurProgramResource, "id">) {
  const id = `res-${Date.now()}`;
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => s.id === sprintId ? { ...s, resources: [...(s.resources || []), { ...resource, id } as NagpurProgramResource] } : s)
    }))
  };
  emit();
}

export function nagpurNextRemoveSprintResource(sprintId: string, resourceId: string) {
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => s.id === sprintId ? { ...s, resources: (s.resources || []).filter(r => r.id !== resourceId) } : s)
    }))
  };
  emit();
}

export function nagpurNextAddTaskTemplate(sprintId: string, task: Omit<NagpurProgramTaskTemplate, "id">) {
  const id = `task-new-${Date.now()}`;
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => {
        if (s.id !== sprintId) return s;
        return { ...s, tasks: [...s.tasks, { ...task, id } as NagpurProgramTaskTemplate] };
      })
    })),
    taskState: {
      ...state.taskState,
      [id]: {
        status: "not_started",
        dueDate: "Jun 2026",
        mentor: M_MSME,
        mentorComments: [],
        submitted: false,
        evidence: [],
        taskLocked: false,
      }
    }
  };
  emit();
}

export function nagpurNextDeleteTaskTemplate(sprintId: string, taskId: string) {
  const newTaskState = { ...state.taskState };
  delete newTaskState[taskId];

  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => {
        if (s.id !== sprintId) return s;
        return { ...s, tasks: s.tasks.filter(t => t.id !== taskId) };
      })
    })),
    taskState: newTaskState
  };
  emit();
}

export function nagpurNextUpdateTaskTemplate(sprintId: string, taskId: string, updates: Partial<NagpurProgramTaskTemplate>) {
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => {
        if (s.id !== sprintId) return s;
        return {
          ...s,
          tasks: s.tasks.map(t => t.id === taskId ? { ...t, ...updates } : t)
        };
      })
    }))
  };
  emit();
}

export function nagpurNextUpdateSmeSection(sprintId: string, smeData: NagpurProgramSme[]) {
  nagpurNextUpdateSprint(sprintId, { smeData });
}

export function nagpurNextAddTaskResource(sprintId: string, taskId: string, resource: NagpurProgramResource) {
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => {
        if (s.id !== sprintId) return s;
        return {
          ...s,
          tasks: s.tasks.map(t => {
            if (t.id !== taskId) return t;
            return {
              ...t,
              resources: [...(t.resources || []), resource]
            };
          })
        };
      })
    }))
  };
  emit();
}

export function nagpurNextRemoveTaskResource(sprintId: string, taskId: string, resourceId: string) {
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => {
        if (s.id !== sprintId) return s;
        return {
          ...s,
          tasks: s.tasks.map(t => {
            if (t.id !== taskId) return t;
            return {
              ...t,
              resources: (t.resources || []).filter(r => r.id !== resourceId)
            };
          })
        };
      })
    }))
  };
  emit();
}

export function nagpurNextUpdateTaskSmeSection(sprintId: string, taskId: string, smeData: NagpurProgramSme[]) {
  state = {
    ...state,
    programFramework: state.programFramework.map(phase => ({
      ...phase,
      sprints: phase.sprints.map(s => {
        if (s.id !== sprintId) return s;
        return {
          ...s,
          tasks: s.tasks.map(t => t.id === taskId ? { ...t, smeData } : t)
        };
      })
    }))
  };
  emit();
}
