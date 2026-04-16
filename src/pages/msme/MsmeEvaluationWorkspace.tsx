import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  FileText, 
  CheckCircle2, 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  Award, 
  Target, 
  Zap,
  Star,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { NAGPUR_NEXT_CHALLENGES } from "@/data/nagpur-next-data";
import { cn } from "@/lib/utils";

const RUBRIC_LEVELS = [
  { 
    level: 1, 
    label: "Critical Gap", 
    color: "text-red-600 bg-red-50", 
    reasoning: "Submission is missing core requirements or has severe technical flaws. Shows a lack of understanding of the PRD." 
  },
  { 
    level: 2, 
    label: "Developing", 
    color: "text-orange-600 bg-orange-50", 
    reasoning: "Basic concepts are present but implementation is fragmented or lacks critical detail to be functional." 
  },
  { 
    level: 3, 
    label: "Proficient", 
    color: "text-blue-600 bg-blue-50", 
    reasoning: "Meets all standard PRD requirements with acceptable technical logic and clear adherence to specifications." 
  },
  { 
    level: 4, 
    label: "Highly Competent", 
    color: "text-indigo-600 bg-indigo-50", 
    reasoning: "Robust implementation. Shows attention to performance metrics, error handling, and solid documentation." 
  },
  { 
    level: 5, 
    label: "Exceptional", 
    color: "text-emerald-600 bg-emerald-50", 
    reasoning: "Exceeds PRD specs. Solution is production-ready, highly optimized, and demonstrates innovative engineering." 
  },
];

export default function MsmeEvaluationWorkspace() {
  const { challengeId, applicantId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rubric");
  const [message, setMessage] = useState("");
  const [scores, setScores] = useState<Record<string, number>>({});
  
  const challenge = useMemo(() => 
    NAGPUR_NEXT_CHALLENGES.find(c => c.id === challengeId) || NAGPUR_NEXT_CHALLENGES[0]
  , [challengeId]);

   const applicantName = useMemo(() => {
    if (!applicantId || applicantId === "kiran") return "KIRAN · Lead Systems";
    return applicantId?.toUpperCase() || "SOLVER TEAM";
  }, [applicantId]);

  const handleScoreChange = (reqId: string, score: number) => {
    setScores(prev => ({ ...prev, [reqId]: score }));
  };

  const totalScore = useMemo(() => {
    const values = Object.values(scores);
    if (values.length === 0) return 0;
    return Math.round((values.reduce((a, b) => a + b, 0) / (values.length * 5)) * 100);
  }, [scores]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    toast.success("Feedback sent to solver team", {
      description: "A notification has been triggered for " + applicantName
    });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] gap-4 overflow-hidden pt-2">
      {/* Top Navigation / Stats Bar */}
      <div className="flex items-center justify-between bg-card/50 backdrop-blur-md border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-xl">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-base font-black tracking-tight">{challenge.title}</h2>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant="outline" className="text-[10px] uppercase font-bold text-primary border-primary/20">
                {applicantName}
              </Badge>
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                Submission ID: SUB-88291
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[9px] font-black text-muted-foreground uppercase opacity-60 tracking-wider">Audit Confidence</p>
            <div className="flex items-center gap-3 mt-1">
               <Progress value={totalScore} className="h-1.5 w-24" />
               <span className="text-sm font-black text-primary">{totalScore}%</span>
            </div>
          </div>
          <Button className="rounded-xl h-10 px-6 font-bold shadow-lg shadow-primary/20">
            Finalize Evaluation
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Left Pane: PDF Viewer */}
        <Card className="flex-[1.4] rounded-3xl border-border/50 shadow-xl shadow-black/5 overflow-hidden bg-neutral-100 flex flex-col">
          <div className="bg-white/80 p-3 flex items-center justify-between border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-600">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold text-neutral-600">PROPOSED_SOLUTION.pdf</span>
            </div>
            <div className="flex items-center gap-2">
               <Badge className="bg-neutral-900/5 text-neutral-600 border-none text-[10px]">12 Pages</Badge>
               <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold">Download Copy</Button>
            </div>
          </div>
          <div className="flex-1 bg-neutral-200 relative">
             <iframe 
               src={`${challenge.proposed_solution_pdf || "/Azhar - Nagpur NEXT - MSME Presentation Template.pptx.pdf"}#toolbar=0`} 
               className="w-full h-full border-none"
               title="Submission PDF"
             />
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl rounded-2xl px-6 py-3 flex items-center gap-4 border border-white/10 text-white shadow-2xl">
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold hover:bg-white/10 text-white/50 hover:text-white transition-colors">Prev</Button>
               <span className="text-[10px] font-black tracking-widest">PAGE 01 / 12</span>
               <Button variant="ghost" size="sm" className="h-8 text-[10px] font-bold hover:bg-white/10 text-white/50 hover:text-white transition-colors">Next</Button>
             </div>
          </div>
        </Card>

        {/* Right Pane: Evaluation Hub */}
        <Card className="flex-1 rounded-3xl border-border/50 shadow-xl shadow-black/5 flex flex-col bg-background/50 backdrop-blur-md overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-5 pt-5 pb-2">
              <TabsList className="w-full grid grid-cols-3 h-11 rounded-xl bg-muted/50 p-1">
                <TabsTrigger value="rubric" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm">
                  <Award className="h-3.5 w-3.5 mr-2" />
                  Rubric
                </TabsTrigger>
                <TabsTrigger value="remarks" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm">
                  <AlertCircle className="h-3.5 w-3.5 mr-2" />
                  Remarks
                </TabsTrigger>
                <TabsTrigger value="chat" className="rounded-lg text-xs font-bold data-[state=active]:shadow-sm">
                  <MessageSquare className="h-3.5 w-3.5 mr-2" />
                  Chat
                </TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1 px-5 py-4">
              <TabsContent value="rubric" className="mt-0 space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                    <div className="flex items-center gap-2 text-primary">
                      <Zap className="h-4 w-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest italic">Maturity Matrix Audit</h3>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold bg-primary/5 border-primary/20 text-primary">
                      {Object.keys(scores).length} / {challenge.prd?.functional_requirements?.length || 0} Evaluated
                    </Badge>
                  </div>

                  <div className="rounded-2xl border border-border overflow-hidden bg-white/50 dark:bg-black/20">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow className="hover:bg-transparent border-border">
                          <TableHead className="w-[240px] text-[10px] font-black uppercase tracking-widest">Requirement Detail</TableHead>
                          {[1, 2, 3, 4, 5].map((level) => (
                            <TableHead key={level} className="text-center px-2">
                              <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black">{level}</span>
                                <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-tighter">Level</span>
                              </div>
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {challenge.prd?.functional_requirements?.map((fr) => (
                          <TableRow key={fr.id} className="hover:bg-primary/[0.01] transition-colors group">
                            <TableCell className="py-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-[8px] h-4 py-0 font-mono opacity-50">{fr.id}</Badge>
                                  {fr.priority === 'P0' && (
                                    <Badge className="bg-red-500/10 text-red-600 text-[8px] h-4 py-0 border-none font-black ring-1 ring-red-500/20">CRITICAL</Badge>
                                  )}
                                </div>
                                <p className="text-[11px] font-bold leading-tight group-hover:text-primary transition-colors">{fr.requirement}</p>
                              </div>
                            </TableCell>
                            {[1, 2, 3, 4, 5].map((level) => {
                              const isSelected = scores[fr.id] === level;
                              const levelData = RUBRIC_LEVELS.find(l => l.level === level);
                              return (
                                <TableCell key={level} className="p-0 text-center">
                                  <TooltipProvider delayDuration={0}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <button
                                          onClick={() => handleScoreChange(fr.id, level)}
                                          className={cn(
                                            "w-full h-16 flex items-center justify-center transition-all border-r border-border/50",
                                            isSelected 
                                              ? "bg-primary text-white shadow-inner" 
                                              : "hover:bg-muted/50"
                                          )}
                                        >
                                          {isSelected ? (
                                            <CheckCircle2 className="h-4 w-4" />
                                          ) : (
                                            <div className="h-1.5 w-1.5 rounded-full bg-border group-hover:bg-primary/20" />
                                          )}
                                        </button>
                                      </TooltipTrigger>
                                      <TooltipContent side="top" className="max-w-[200px] p-3 rounded-xl bg-neutral-900 border-none shadow-2xl">
                                        <p className="text-[10px] font-black text-primary uppercase mb-1">{levelData?.label}</p>
                                        <p className="text-[10px] text-white/80 leading-relaxed font-medium">{levelData?.reasoning}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Maturity Legend */}
                  <div className="grid grid-cols-5 gap-2 pt-2">
                    {RUBRIC_LEVELS.map((level) => (
                      <div key={level.level} className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                          <div className={cn("h-1 w-full rounded-full", 
                            level.level === 1 ? "bg-red-500" :
                            level.level === 2 ? "bg-orange-500" :
                            level.level === 3 ? "bg-blue-500" :
                            level.level === 4 ? "bg-indigo-500" :
                            "bg-emerald-500"
                          )} />
                        </div>
                        <p className="text-[8px] font-black uppercase text-muted-foreground text-center">{level.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Summary Card */}
                {Object.keys(scores).length > 0 && (
                  <Card className="border-primary/20 bg-primary/5 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-primary uppercase tracking-widest">Weighted Maturity Index</p>
                          <p className="text-xl font-black">{totalScore}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60">Status</p>
                          <p className="text-xs font-bold text-primary">
                            {totalScore >= 80 ? 'EXCEPTIONAL' : totalScore >= 60 ? 'COMMENDABLE' : 'DEVELOPING'}
                          </p>
                        </div>
                        <Separator orientation="vertical" className="h-8" />
                        <Button variant="outline" className="h-9 text-[10px] font-black uppercase tracking-widest border-primary/20">
                          View Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

                <div className="space-y-4 pb-8">
                  <div className="flex items-center gap-2 text-emerald-600 border-b border-emerald-500/10 pb-2">
                    <Target className="h-4 w-4" />
                    <h3 className="text-xs font-black uppercase tracking-widest italic">Success Targets</h3>
                  </div>
                  {challenge.prd?.success_metrics.primary_kpis.map((kpi, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                      <div className="flex justify-between items-end mb-3">
                         <div>
                           <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 italic">Metric</p>
                           <p className="text-xs font-bold leading-tight mt-0.5">{kpi.metric}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-[10px] font-black text-muted-foreground uppercase opacity-60 italic">Target</p>
                           <p className="text-xs font-black text-emerald-600">{kpi.target}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-3">
                         <Progress value={(scores[`kpi-${i}`] || 0) * 20} className="h-1.5 flex-1" />
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="h-8 text-[9px] font-bold rounded-xl px-3 group hover:bg-emerald-500 hover:text-white transition-all"
                           onClick={() => handleScoreChange(`kpi-${i}`, 1 + Math.floor(Math.random() * 5))}
                         >
                           <ShieldCheck className="h-3 w-3 mr-1.5" />
                           Verify Result
                         </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="remarks" className="mt-0 space-y-6">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest italic">Performance Audit Remarks</label>
                  <Textarea 
                    placeholder="Enter detailed auditor reasoning here..." 
                    className="min-h-[160px] rounded-2xl border-border/50 focus:ring-primary/20 bg-card/50 text-sm leading-relaxed"
                  />
                </div>
              </TabsContent>

              <TabsContent value="chat" className="mt-0 space-y-4">
                 {/* Chat content exactly as before, but with consistent spacing */}
                 <div className="flex flex-col gap-4 min-h-[300px]">
                    <div className="flex gap-4">
                      <div className="h-9 w-9 rounded-xl bg-neutral-900 flex items-center justify-center shrink-0">
                        <p className="text-[10px] font-black text-white">MS</p>
                      </div>
                      <div className="bg-muted/80 rounded-2xl rounded-tl-none p-4 max-w-[85%] shadow-sm">
                        <p className="text-[13px] font-medium leading-relaxed">
                          The current logic for the beam adjustment looks solid, but we need to see the <span className="text-primary font-bold">thermal dissipation</span> data for the 50W variant.
                        </p>
                        <span className="text-[9px] text-muted-foreground font-black mt-2 block uppercase tracking-widest">10:42 AM · MSME Auditor</span>
                      </div>
                    </div>
                    {/* ... rest of chat ... */}
                 </div>
              </TabsContent>
            </ScrollArea>

            <div className="p-5 bg-muted/20 border-t border-border/50">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask for more clarity or provide a remark..." 
                  className="rounded-xl border-border/50 bg-card h-12 text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" className="h-12 w-12 rounded-xl shadow-lg shadow-primary/20" onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
