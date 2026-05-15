import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { MapPanel } from "@/components/MapPanel";
import { Brain, FileText, TrendingDown, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Government Analytics — RAKSHAK" }] }),
  component: Analytics,
});

const DISTRICTS = [
  { n: "Mumbai City", inc: 412, fat: 38, resp: "5.4m", trend: -8 },
  { n: "Pune", inc: 387, fat: 41, resp: "6.1m", trend: -12 },
  { n: "Thane", inc: 318, fat: 29, resp: "5.9m", trend: -4 },
  { n: "Nagpur", inc: 264, fat: 31, resp: "7.2m", trend: -6 },
  { n: "Nashik", inc: 218, fat: 24, resp: "6.8m", trend: 3 },
  { n: "Aurangabad", inc: 197, fat: 22, resp: "7.4m", trend: -9 },
  { n: "Kolhapur", inc: 142, fat: 14, resp: "6.5m", trend: -5 },
  { n: "Solapur", inc: 138, fat: 18, resp: "8.1m", trend: 2 },
];

function Analytics() {
  return (
    <ConsoleLayout
      title="Government Analytics"
      subtitle="National-grade intelligence for RTO · Police · Highway Authority · Disaster Management"
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        <StatCard label="State Incidents YTD" value="48,217" delta="−14.2% YoY" intent="success" />
        <StatCard label="Fatalities YTD" value="3,412" delta="−12.4% YoY" intent="success" />
        <StatCard label="Avg. Response" value="6.2m" delta="−1.4m vs FY23" intent="success" />
        <StatCard label="Hazard Convoys" value="4.2K/day" />
        <StatCard label="Citizen Reports" value="312K" delta="+38% MoM" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="panel p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Statewide Incidents · Rolling 12 mo</div>
                <div className="mt-1 font-display text-xl">Trend Analysis</div>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Incidents</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emergency" /> Fatalities</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Resolved</span>
              </div>
            </div>
            <BarChart />
          </div>

          <MapPanel height={380} />
        </div>

        <div className="space-y-5">
          <div className="panel p-4">
            <div className="flex items-center gap-2"><Brain className="h-4 w-4 text-primary-foreground/80" /><span className="text-sm font-medium">AI Recommendations</span></div>
            <div className="mt-3 space-y-3">
              {[
                { t: "Add speed cameras: NH-48 KM 38–46", p: "Projected −22% fatalities" },
                { t: "Reroute LPG convoys around Pune Ring Rd 17:00–20:00", p: "−68% blast-zone exposure" },
                { t: "Deploy ambulance hub at Khalapur toll", p: "−2.1m avg dispatch" },
                { t: "Citizen-report incentives in Solapur district", p: "+34% reporting coverage" },
              ].map((r, i) => (
                <div key={i} className="border-l-2 border-primary/60 pl-3 py-1">
                  <div className="text-xs font-medium">{r.t}</div>
                  <div className="text-[11px] text-muted-foreground">{r.p}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center gap-2"><FileText className="h-4 w-4" /><span className="text-sm font-medium">Reports & Exports</span></div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                "FY24 District Safety Index",
                "Hazardous Convoy Audit · Q4",
                "Black Spot Reduction Plan",
                "108 EMS Performance Brief",
                "Citizen Engagement Report",
              ].map((r) => (
                <div key={r} className="flex justify-between p-2 rounded border border-border hover:border-primary/40 cursor-pointer">
                  <span>{r}</span>
                  <span className="text-muted-foreground font-mono">PDF</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 panel">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <span className="font-display text-sm font-medium">District-wise Performance</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">36 districts · top 8 shown</span>
        </div>
        <div className="grid grid-cols-12 gap-3 px-4 py-2 border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
          <div className="col-span-3">District</div>
          <div className="col-span-2 text-right">Incidents (mo)</div>
          <div className="col-span-2 text-right">Fatalities</div>
          <div className="col-span-2 text-right">Avg Response</div>
          <div className="col-span-3">YoY Trend</div>
        </div>
        <div className="divide-y divide-border">
          {DISTRICTS.map((d) => (
            <div key={d.n} className="grid grid-cols-12 gap-3 px-4 py-3 items-center text-sm hover:bg-accent/40">
              <div className="col-span-3 font-medium">{d.n}</div>
              <div className="col-span-2 font-mono text-right">{d.inc}</div>
              <div className="col-span-2 font-mono text-right text-emergency">{d.fat}</div>
              <div className="col-span-2 font-mono text-right">{d.resp}</div>
              <div className="col-span-3 flex items-center gap-3">
                <div className="flex-1 h-1 bg-accent rounded">
                  <div className="h-full rounded" style={{
                    width: `${Math.min(100, Math.abs(d.trend) * 6)}%`,
                    background: d.trend < 0 ? "var(--success)" : "var(--emergency)",
                  }} />
                </div>
                <span className={`text-xs font-mono inline-flex items-center gap-1 ${d.trend < 0 ? "text-success" : "text-emergency"}`}>
                  {d.trend < 0 ? <TrendingDown className="h-3 w-3" /> : <TrendingUp className="h-3 w-3" />}
                  {Math.abs(d.trend)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}

function BarChart() {
  const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  return (
    <div className="mt-5">
      <svg viewBox="0 0 600 220" className="w-full h-56">
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <line key={p} x1="40" x2="600" y1={20 + p * 160} y2={20 + p * 160} stroke="oklch(1 0 0 / 0.05)" />
        ))}
        {months.map((m, i) => {
          const x = 50 + i * 46;
          const inc = 60 + Math.sin(i / 2) * 30 + Math.random() * 20;
          const fat = inc * (0.18 + Math.random() * 0.05);
          const res = inc * 0.85;
          return (
            <g key={m}>
              <rect x={x} y={180 - inc} width="10" height={inc} fill="oklch(0.62 0.17 255)" rx="1" />
              <rect x={x + 12} y={180 - fat} width="10" height={fat} fill="oklch(0.62 0.24 25)" rx="1" />
              <rect x={x + 24} y={180 - res} width="10" height={res} fill="oklch(0.72 0.18 155 / 0.8)" rx="1" />
              <text x={x + 17} y="200" textAnchor="middle" fontSize="9" fontFamily="JetBrains Mono" fill="oklch(0.66 0.02 250)">{m}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
