import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { DetailDrawer } from "@/components/dashboard/DetailDrawer";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { AlertItem } from "@/components/dashboard/AlertItem";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts";

const fundData = [
  { center: "COEP Bhau Institute", allocated: "₹20Cr", used: "₹18.4Cr", remaining: "₹1.6Cr", startups: 142, outcomes: 48, utilization: 92, risk: "On Track" },
  { center: "IIT Bombay Incubator", allocated: "₹18Cr", used: "₹16.2Cr", remaining: "₹1.8Cr", startups: 128, outcomes: 42, utilization: 90, risk: "On Track" },
  { center: "Venture Center Pune", allocated: "₹16Cr", used: "₹14.8Cr", remaining: "₹1.2Cr", startups: 118, outcomes: 38, utilization: 93, risk: "On Track" },
  { center: "VNIT Nagpur TBI", allocated: "₹12Cr", used: "₹10.2Cr", remaining: "₹1.8Cr", startups: 86, outcomes: 28, utilization: 85, risk: "On Track" },
  { center: "Nashik AgriTech", allocated: "₹10Cr", used: "₹7.8Cr", remaining: "₹2.2Cr", startups: 68, outcomes: 20, utilization: 78, risk: "At Risk" },
  { center: "Amravati Agri", allocated: "₹6Cr", used: "₹3.8Cr", remaining: "₹2.2Cr", startups: 32, outcomes: 8, utilization: 63, risk: "At Risk" },
  { center: "Gadchiroli Rural TBI", allocated: "₹4Cr", used: "₹2.1Cr", remaining: "₹1.9Cr", startups: 18, outcomes: 4, utilization: 53, risk: "Delayed" },
];

const monthlyData = [
  { month: "Jul", disbursed: 22 }, { month: "Aug", disbursed: 28 }, { month: "Sep", disbursed: 32 },
  { month: "Oct", disbursed: 24 }, { month: "Nov", disbursed: 38 }, { month: "Dec", disbursed: 42 },
  { month: "Jan", disbursed: 36 }, { month: "Feb", disbursed: 44 }, { month: "Mar", disbursed: 48 },
];

const tooltipStyle = { contentStyle: { background: "hsl(0, 0%, 100%)", border: "1px solid hsl(220, 13%, 91%)", borderRadius: "8px", fontSize: "12px" } };

const FundGovernance = () => {
  const [selected, setSelected] = useState<typeof fundData[0] | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div>
          <h1 className="text-xl font-bold text-foreground">Fund Governance</h1>
          <p className="text-xs text-muted-foreground mt-1">Track public fund utilization, outcomes, and financial accountability</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="Total Budget" value="₹420Cr" />
          <StatCard label="Utilized" value="₹284Cr" trend={{ value: "8%", positive: true }} />
          <StatCard label="Remaining" value="₹136Cr" />
          <StatCard label="Utilization %" value="67.6%" trend={{ value: "4%", positive: true }} />
          <StatCard label="Cost / Startup" value="₹15.4L" subtitle="Per incubated startup" />
          <StatCard label="Cost / Success" value="₹58.4L" subtitle="Per graduated startup" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Monthly Disbursal (₹Cr)</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="month" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="disbursed" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} name="Disbursed (₹Cr)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <h2 className="text-sm font-semibold text-foreground mb-4">Utilization by Center</h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundData.map(f => ({ name: f.center.split(" ")[0], util: f.utilization }))} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: "hsl(220, 9%, 46%)", fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                  <Tooltip {...tooltipStyle} />
                  <Bar dataKey="util" fill="hsl(152, 69%, 41%)" radius={[0, 4, 4, 0]} name="Utilization %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <FilterBar searchPlaceholder="Search centers..." showExport />
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Center", "Allocated", "Used", "Remaining", "Startups", "Outcomes", "Util %", "Risk"].map(h => (
                    <th key={h} className="py-2.5 px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fundData.map(f => (
                  <tr key={f.center} className="border-b border-border/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => setSelected(f)}>
                    <td className="py-2.5 px-3 font-medium text-foreground">{f.center}</td>
                    <td className="py-2.5 px-3 font-mono">{f.allocated}</td>
                    <td className="py-2.5 px-3 font-mono">{f.used}</td>
                    <td className="py-2.5 px-3 font-mono">{f.remaining}</td>
                    <td className="py-2.5 px-3 font-mono">{f.startups}</td>
                    <td className="py-2.5 px-3 font-mono">{f.outcomes}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold">{f.utilization}%</td>
                    <td className="py-2.5 px-3"><StatusBadge status={f.risk} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="text-sm font-semibold text-foreground mb-3">Fund Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <AlertItem title="Underutilized Funds" description="Gadchiroli TBI at 53% utilization — ₹1.9Cr unused" severity="high" time="2h ago" />
            <AlertItem title="Overspending Risk" description="Nashik AgriTech approaching 90% budget with 60% milestones" severity="medium" time="5h ago" />
            <AlertItem title="Delayed Reporting" description="3 centers have not submitted Q4 financial reports" severity="medium" time="1d ago" />
            <AlertItem title="No Output Alert" description="Amravati center — ₹3.8Cr spent, only 8 graduates" severity="high" time="3h ago" />
          </div>
        </div>
      </div>

      <DetailDrawer open={!!selected} onClose={() => setSelected(null)} title={selected?.center || ""} subtitle="Fund Detail">
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { l: "Allocated", v: selected.allocated }, { l: "Used", v: selected.used },
                { l: "Remaining", v: selected.remaining }, { l: "Utilization", v: `${selected.utilization}%` },
                { l: "Startups", v: selected.startups }, { l: "Outcomes", v: selected.outcomes },
              ].map(i => (
                <div key={i.l} className="bg-secondary rounded-lg p-3">
                  <p className="text-[10px] text-muted-foreground">{i.l}</p>
                  <p className="text-sm font-bold font-mono mt-1">{i.v}</p>
                </div>
              ))}
            </div>
            <div><p className="text-xs font-medium mb-2">Risk Status</p><StatusBadge status={selected.risk} /></div>
          </div>
        )}
      </DetailDrawer>
    </DashboardLayout>
  );
};

export default FundGovernance;
