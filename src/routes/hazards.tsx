import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { MapPanel } from "@/components/MapPanel";
import { Construction, Droplets, TreeDeciduous, Lightbulb, Camera, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/hazards")({
  head: () => ({ meta: [{ title: "Citizen Road Hazard Reports — RAKSHAK" }] }),
  component: Hazards,
});

const TYPES = [
  { i: Construction, l: "Pothole", c: 1842 },
  { i: Droplets, l: "Flooding", c: 312 },
  { i: TreeDeciduous, l: "Fallen tree", c: 89 },
  { i: AlertCircle, l: "Broken divider", c: 124 },
  { i: Lightbulb, l: "Dead streetlight", c: 968 },
  { i: Droplets, l: "Oil spill", c: 47 },
];

const REPORTS = [
  { id: "RPT-2891", type: "Pothole", loc: "Ghodbunder Rd · Thane", by: "S. Mehta", time: "8m ago", status: "verified" },
  { id: "RPT-2890", type: "Oil spill", loc: "NH-48 KM 142", by: "R. Patil", time: "14m ago", status: "dispatched" },
  { id: "RPT-2889", type: "Flooding", loc: "Hinjewadi underpass", by: "A. Khan", time: "22m ago", status: "verified" },
  { id: "RPT-2888", type: "Dead streetlight", loc: "FC Road · Pune", by: "P. Shinde", time: "31m ago", status: "queued" },
  { id: "RPT-2887", type: "Fallen tree", loc: "Old Mumbai-Pune Hwy", by: "V. Kulkarni", time: "44m ago", status: "resolved" },
];

function Hazards() {
  return (
    <ConsoleLayout
      title="Citizen Road Hazard Reports"
      subtitle="Crowdsourced road safety intelligence · verified before dispatch"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Reports Today" value="3,841" />
        <StatCard label="Verified" value="2,108" intent="success" />
        <StatCard label="Avg. Resolution" value="4h 12m" />
        <StatCard label="Open Critical" value="38" intent="danger" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {TYPES.map((t) => {
          const Icon = t.i;
          return (
            <div key={t.l} className="panel p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-md bg-accent grid place-items-center"><Icon className="h-5 w-5" /></div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground">{t.l}</div>
                <div className="font-display text-xl font-semibold">{t.c.toLocaleString()}</div>
              </div>
              <button className="text-xs text-muted-foreground hover:text-foreground">View →</button>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MapPanel height={420} />
        </div>
        <div className="panel p-5">
          <div className="text-sm font-medium flex items-center gap-2"><Camera className="h-4 w-4" /> Submit New Report</div>
          <div className="mt-4 space-y-3 text-xs">
            <div>
              <div className="text-muted-foreground mb-1">Hazard type</div>
              <div className="grid grid-cols-3 gap-1.5">
                {TYPES.slice(0, 6).map((t) => (
                  <button key={t.l} className="p-2 rounded border border-border hover:border-primary/50 text-[11px]">{t.l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Location</div>
              <input className="w-full h-9 px-3 rounded bg-surface border border-border" placeholder="Auto-detected · GPS lock" />
            </div>
            <div>
              <div className="text-muted-foreground mb-1">Photo evidence</div>
              <div className="border border-dashed border-border rounded-md p-6 text-center text-muted-foreground">
                <Camera className="h-5 w-5 mx-auto" />
                <div className="mt-1 text-[11px]">Tap to capture or upload</div>
              </div>
            </div>
            <button className="w-full py-2.5 rounded bg-primary text-primary-foreground text-xs font-medium">Submit Report</button>
          </div>
        </div>
      </div>

      <div className="mt-5 panel">
        <div className="px-4 py-3 border-b border-border text-sm font-medium">Recent Reports</div>
        <div className="divide-y divide-border">
          {REPORTS.map((r) => (
            <div key={r.id} className="grid grid-cols-12 gap-3 px-4 py-3 items-center hover:bg-accent/40 text-sm">
              <div className="col-span-2 font-mono text-xs text-muted-foreground">{r.id}</div>
              <div className="col-span-2">{r.type}</div>
              <div className="col-span-3 text-xs text-muted-foreground">{r.loc}</div>
              <div className="col-span-2 text-xs">By {r.by}</div>
              <div className="col-span-2">
                <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                  r.status === "verified" ? "bg-success/20 text-success border-success/40" :
                  r.status === "dispatched" ? "bg-primary/20 text-primary-foreground/90 border-primary/40" :
                  r.status === "resolved" ? "bg-muted-foreground/20 text-muted-foreground border-border" :
                  "bg-warning/20 text-warning border-warning/40"
                }`}>{r.status}</span>
              </div>
              <div className="col-span-1 text-[11px] text-muted-foreground font-mono text-right">{r.time}</div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
