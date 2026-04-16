import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AlertItem } from "@/components/dashboard/AlertItem";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell, PieChart, Pie } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DETAILED_PERFORMANCE_DATA, 
  MSINS_REGISTRY_28, 
  FUNDING_REPORT_TEXT,
  DetailedIncubator
} from "@/data/msins-funding-data";
import { 
  Search, 
  Info, 
  AlertTriangle, 
  TrendingUp, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Building2,
  Lock,
  EyeOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

const tooltipStyle = { 
  contentStyle: { 
    background: "hsl(var(--card))", 
    border: "1px solid hsl(var(--border))", 
    borderRadius: "12px", 
    fontSize: "12px",
    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)"
  } 
};

const chartColors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const FundGovernance = () => {
  const [selected, setSelected] = useState<DetailedIncubator | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRegistry = MSINS_REGISTRY_28.filter(inc => 
    inc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inc.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] h-5 border-primary/20 bg-primary/5 text-primary">MSINS Official</Badge>
              <Badge variant="outline" className="text-[10px] h-5 border-amber-500/20 bg-amber-500/5 text-amber-600">Confidential View</Badge>
            </div>
            <h1 className="text-3xl font-black text-foreground tracking-tight">Financial Intelligence</h1>
            <p className="text-sm text-muted-foreground mt-1 font-medium">Tracking ₹185.53 Cr in multi-source incubator grants & state commitments</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">State Commitment</p>
                <p className="text-xl font-black text-foreground">₹80.00 Cr</p>
             </div>
             <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">SISFS Sanctioned</p>
                <p className="text-xl font-black text-foreground">₹105.53 Cr</p>
             </div>
          </div>
        </div>

        <Tabs defaultValue="intelligence" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-3 bg-muted/50 p-1 rounded-2xl border border-border/50">
            <TabsTrigger value="intelligence" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Intelligence Report</TabsTrigger>
            <TabsTrigger value="governance" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Live Governance</TabsTrigger>
            <TabsTrigger value="directory" className="rounded-xl font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">Center Directory</TabsTrigger>
          </TabsList>

          {/* Tab 1: Intelligence Report (Rich Text + High Fidelity Table) */}
          <TabsContent value="intelligence" className="space-y-8 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <Card className="rounded-[2.5rem] border-border/40 bg-card/60 backdrop-blur-xl shadow-2xl shadow-primary/5 overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                       <EyeOff className="h-6 w-6 text-amber-500" /> Transparency Deficit: An Analysis
                    </CardTitle>
                    <CardDescription className="text-sm font-medium italic">
                      "Most data remains hidden from public view" — MSINS Incubator Funding Report
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                    <p className="font-bold text-foreground text-base">
                      {FUNDING_REPORT_TEXT.intro}
                    </p>
                    <p>
                      {FUNDING_REPORT_TEXT.summary}
                    </p>
                    <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-3xl my-6 flex gap-4">
                       <AlertTriangle className="h-8 w-8 text-red-500 shrink-0 mt-1" />
                       <div>
                          <h4 className="text-red-600 font-black uppercase tracking-wider text-xs mb-1">Critical Finding</h4>
                          <p className="text-sm text-foreground/90 leading-normal m-0">
                            {FUNDING_REPORT_TEXT.opacity_analysis}
                          </p>
                       </div>
                    </div>
                    <h3 className="text-foreground font-black text-lg mt-8">Policy Context</h3>
                    <p>{FUNDING_REPORT_TEXT.msins_background}</p>
                    <h3 className="text-foreground font-black text-lg mt-8">The 2025 Outlook</h3>
                    <p>{FUNDING_REPORT_TEXT.policy_2025}</p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black tracking-tight">Tier Performance Matrix</h2>
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/20">Audit Grade: Est. 2024</Badge>
                  </div>
                  <div className="bg-card rounded-[2rem] border border-border/50 overflow-hidden shadow-xl">
                    <Table>
                      <TableHeader className="bg-muted/40">
                        <TableRow className="border-b border-border/50">
                          <TableHead className="py-4 px-6 text-[10px] font-black uppercase tracking-widest">Incubator</TableHead>
                          <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest">Grant (MS)</TableHead>
                          <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest">Total Funds</TableHead>
                          <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest">Startups</TableHead>
                          <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest text-center">Util %</TableHead>
                          <TableHead className="py-4 text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {DETAILED_PERFORMANCE_DATA.map((row) => (
                          <TableRow key={row.name} className="border-b border-border/40 hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => setSelected(row)}>
                            <TableCell className="py-4 px-6">
                              <div className="font-bold text-sm">{row.name}</div>
                              <div className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="h-2 w-2" /> {row.city}</div>
                            </TableCell>
                            <TableCell className="py-4">
                               <Badge variant="outline" className="text-[10px] font-mono h-5">{row.msinsGrant}</Badge>
                            </TableCell>
                            <TableCell className="py-4 font-mono font-bold text-xs">{row.fundsReceived}</TableCell>
                            <TableCell className="py-4 font-mono text-xs">{row.startups}</TableCell>
                            <TableCell className="py-4 text-center">
                               <div className="inline-flex flex-col items-center">
                                  <span className={`text-xs font-black ${row.utilization === '15%' ? 'text-red-500' : 'text-foreground'}`}>
                                    {row.utilization}
                                  </span>
                                  {row.utilization !== 'N/A' && (
                                     <div className="w-12 h-1 bg-muted rounded-full overflow-hidden mt-1">
                                        <div 
                                          className={`h-full ${parseInt(row.utilization) < 30 ? 'bg-red-500' : 'bg-green-500'}`} 
                                          style={{ width: row.utilization }} 
                                        />
                                     </div>
                                  )}
                               </div>
                            </TableCell>
                            <TableCell className="py-4">
                               <Badge 
                                 className={`rounded-lg py-0 h-5 text-[9px] font-black uppercase tracking-tighter ${
                                   row.status === 'Elite' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20' : 
                                   row.status === 'Slow' ? 'bg-red-500/10 text-red-600 border-red-500/20' : 
                                   'bg-primary/10 text-primary border-primary/20'
                                 }`}
                                 variant="outline"
                               >
                                 {row.status}
                               </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6">
                 <Card className="rounded-[2rem] border-border/50 overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-xl">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-base font-black uppercase tracking-widest opacity-80 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" /> Global Sanctions
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold opacity-60 uppercase">Aggregated Grant Target</p>
                          <p className="text-4xl font-black">₹185.53 Cr</p>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                             <p className="text-[10px] font-bold opacity-60">MSINS Sanction</p>
                             <p className="text-xl font-black">₹80.00Cr</p>
                          </div>
                          <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
                             <p className="text-[10px] font-bold opacity-60">SISFS Support</p>
                             <p className="text-xl font-black">₹105.53Cr</p>
                          </div>
                       </div>
                    </CardContent>
                 </Card>

                 <InsightCard 
                    title="Case Study: DBATU Lonere" 
                    subtitle="Systemic Over-Sanction / Under-Utilization"
                    message="Against a ₹5 crore sanction, DBATU received only ₹75 lakhs since 2019 — reflecting a 15% utilization rate over 7 years."
                    type="warning"
                 />

                 <InsightCard 
                    title="Best Practice: NETRARIT" 
                    subtitle="Multi-Source Disclosure Model"
                    message="Total disclosed funding of ₹12.4 Cr across MSINS, DST, and MSME, representing the gold standard for state incubator transparency."
                    type="success"
                 />

                 <div className="bg-muted/40 rounded-[2rem] p-6 border border-border/50">
                    <div className="flex items-center gap-2 text-foreground font-black text-xs uppercase tracking-widest mb-4">
                       <Info className="h-4 w-4" /> Methodology Notes
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                       This report synthesized data from the Maharashtra State Startup Policy 2018 GR, DBT official records, and NIDHI scheme documentation. Official government utilization reports remain largely inaccessible.
                    </p>
                 </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 2: Live Governance (The analytics view) */}
          <TabsContent value="governance" className="space-y-6 mt-6">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="SISFS Disbursed" value="₹47.36 Cr" trend={{ value: "45% of Sanction", positive: true }} />
                <StatCard label="Active Incubators" value="28" subtitle="SISFS Approved" />
                <StatCard label="Ecosystem Value" value="USD 3.56B" subtitle="SINE Portfolio alone" />
                <StatCard label="Target Startups" value="10,000" subtitle="Policy 2018 Goal" />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="rounded-[2rem] p-6 border-border/50 bg-card">
                   <h2 className="text-base font-black uppercase tracking-widest text-foreground/80 mb-6 px-2">Funding Source Distribution</h2>
                   <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie
                               data={[
                                  { name: 'SISFS', value: 105.53 },
                                  { name: 'MSINS', value: 80.00 },
                               ]}
                               cx="50%"
                               cy="50%"
                               innerRadius={60}
                               outerRadius={80}
                               paddingAngle={5}
                               dataKey="value"
                            >
                               <Cell fill="#3b82f6" />
                               <Cell fill="#8b5cf6" />
                            </Pie>
                            <Tooltip {...tooltipStyle} />
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div className="flex justify-center gap-8 mt-4">
                      <div className="flex items-center gap-2">
                         <div className="h-3 w-3 rounded-full bg-blue-500" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">SISFS (₹105Cr)</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="h-3 w-3 rounded-full bg-violet-500" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">MSINS (₹80Cr)</span>
                      </div>
                   </div>
                </Card>

                <Card className="rounded-[2rem] p-6 border-border/50 bg-card space-y-6">
                    <div>
                        <h2 className="text-base font-black uppercase tracking-widest text-foreground/80 mb-1 px-2">Utilization Risks</h2>
                        <p className="text-[10px] text-muted-foreground px-2 uppercase tracking-wide">High priority governance alerts</p>
                    </div>
                    <div className="space-y-3">
                        <AlertItem title="Transparency Deficit" description="No consolidated audit report for MSINS grants in 5 years" severity="high" time="Policy Review Needed" />
                        <AlertItem title="Slow Disbursement" description="DBATU Lonere: Only ₹75L received of ₹5Cr sanctioned" severity="medium" time="Trigger: Manual Audit" />
                        <AlertItem title="Concentration Risk" description="IITB and Venture Centre hold 60% of total NIDHI CoE grants" severity="medium" time="Risk Index: High" />
                    </div>
                </Card>
             </div>
          </TabsContent>

          {/* Tab 3: Center Directory */}
          <TabsContent value="directory" className="space-y-6 mt-6">
             <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                   <Input 
                      placeholder="Search and verify 28 supported centers..." 
                      className="pl-10 h-11 rounded-xl border-border/50 bg-muted/30 focus:bg-background transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                   />
                </div>
                <div className="flex gap-2">
                   <Badge variant="outline" className="rounded-lg h-9 px-4 font-bold">Total: {MSINS_REGISTRY_28.length} Centers</Badge>
                   <Badge variant="outline" className="rounded-lg h-9 px-4 font-bold border-indigo-500/20 bg-indigo-500/5 text-indigo-600">Tier 2/3 Focus: 12</Badge>
                </div>
             </div>

             <ScrollArea className="h-[700px] w-full pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                   {filteredRegistry.map(center => (
                      <Card key={center.id} className="rounded-2xl border-border/40 bg-card/40 hover:bg-card/80 transition-all hover:shadow-xl hover:-translate-y-1 group">
                         <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                               <div className="p-2 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                  <Building2 className="h-5 w-5" />
                               </div>
                               <Badge variant="secondary" className="text-[9px] uppercase tracking-tighter rounded-full">{center.type || "Incubator"}</Badge>
                            </div>
                            <CardTitle className="text-base font-bold tracking-tight mt-3">{center.name}</CardTitle>
                            <CardDescription className="text-xs flex items-center gap-1 font-medium"><MapPin className="h-3 w-3" /> {center.city}, Maharashtra</CardDescription>
                         </CardHeader>
                         <CardContent className="space-y-4">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Focus Sectors</p>
                               <div className="flex flex-wrap gap-1">
                                  {center.sector.split(',').slice(0, 3).map(s => (
                                     <Badge key={s} variant="outline" className="text-[9px] font-medium py-0 h-5 bg-muted/30">{s.trim()}</Badge>
                                  ))}
                               </div>
                            </div>
                            <div className="pt-2 flex items-center justify-between gap-2">
                               <a href={`mailto:${center.email}`} className="flex-1">
                                  <button className="w-full flex items-center justify-center gap-2 h-9 rounded-xl border border-border text-[11px] font-bold hover:bg-muted transition-colors">
                                     <Mail className="h-3 w-3" /> Contact
                                  </button>
                               </a>
                               <a href={center.website} target="_blank" rel="noreferrer" className="flex-1">
                                  <button className="w-full flex items-center justify-center gap-2 h-9 rounded-xl bg-primary text-white text-[11px] font-bold hover:opacity-90 transition-all">
                                     <ExternalLink className="h-3 w-3" /> Website
                                  </button>
                               </a>
                            </div>
                         </CardContent>
                      </Card>
                   ))}
                </div>
             </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.name || ""} subtitle="Governance Deep-Dive">
        {selected && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
               <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">MSINS Grant</p>
                  <p className="text-lg font-black mt-1">{selected.msinsGrant}</p>
               </div>
               <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Funds Disbursed</p>
                  <p className="text-lg font-black mt-1 font-mono">{selected.fundsReceived}</p>
               </div>
               <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Utilization</p>
                  <p className="text-lg font-black mt-1 font-mono">{selected.utilization}</p>
               </div>
               <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Startups</p>
                  <p className="text-lg font-black mt-1 font-mono">{selected.startups}</p>
               </div>
            </div>

            <div className="space-y-3">
               <p className="text-xs font-black uppercase text-foreground/70">Intelligence Summary</p>
               <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-sm leading-relaxed italic text-foreground/80">"{selected.notes}"</p>
               </div>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-black uppercase text-foreground/70">Other Funding Channels</p>
                <div className="flex flex-wrap gap-2">
                   {selected.otherGovtFunds.split(',').map(f => (
                      <Badge key={f} variant="secondary" className="bg-muted text-foreground font-bold">{f.trim()}</Badge>
                   ))}
                </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 uppercase tracking-tighter text-[9px] font-black">Audit Verified {selected.source}</Badge>
               </div>
               <StatusBadge status={selected.utilization === '15%' ? 'At Risk' : 'On Track'} />
            </div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default FundGovernance;
