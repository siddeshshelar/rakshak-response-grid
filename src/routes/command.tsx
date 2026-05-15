import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { MapPanel } from "@/components/MapPanel";
import { Siren, Ambulance, Truck, AlertTriangle, MapPin, Clock, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/command")({
  head: () => ({ meta: [{ title: "Live Command Center — RAKSHAK" }] }),
  component: Command,
});

const INCIDENTS = [
  { id: "INC-24871", t: "Multi-vehicle collision", loc: "NH-48, Khalapur", sev: "critical", eta: "4m", time: "12s ago" },
  { id: "INC-24870", t: "Tanker leakage reported", loc: "Panvel, MH-12", sev: "critical", eta: "6m", time: "1m ago" },
  { id: "INC-24869", t: "Two-wheeler skid", loc: "Pune Ring Rd", sev: "warning", eta: "3m", time: "2m ago" },
  { id: "INC-24868", t: "Pedestrian injury", loc: "Aurangabad Bypass", sev: "warning", eta: "8m", time: "3m ago" },
  { id: "INC-24867", t: "Cattle on highway", loc: "Samruddhi KM 412", sev: "info", eta: "—", time: "5m ago" },
  { id: "INC-24866", t: "Vehicle breakdown", loc: "Mumbai-Pune Expy", sev: "info", eta: "12m", time: "6m ago" },
];

function Command() {
  return (
    <ConsoleLayout
      title="Live Command Center"
      subtitle="Real-time multi-agency emergency operations · Maharashtra-wide"
      rightPanel={<RightPanel />}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Active Incidents" value="47" delta="+6 last 30m" intent="danger" />
        <StatCard label="Ambulances Engaged" value="218" delta="of 2,184 fleet" intent="success" />
        <StatCard label="Hazardous Convoys" value="312" delta="3 in alert zone" intent="warning" />
        <StatCard label="Avg. Response" value="6.2m" delta="−18s vs SLA" />
      </div>

      <MapPanel height={520}>
        <div className="absolute bottom-4 right-4 panel-elevated p-3 w-64">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Layers</div>
          <div className="mt-2 space-y-1.5 text-xs">
            {["Incidents", "Ambulances", "Hospitals", "Hazard Convoys", "Black Spots", "Weather", "Road Closures"].map((l) => (
              <label key={l} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="accent-primary" />
                <span>{l}</span>
              </label>
            ))}
          </div>
        </div>
      </MapPanel>

      <div className="mt-5 panel">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Siren className="h-4 w-4 text-emergency" />
            <span className="font-display font-medium text-sm">Live Incident Feed</span>
            <span className="live-dot ml-1" />
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground">View all →</button>
        </div>
        <div className="divide-y divide-border">
          {INCIDENTS.map((i) => (
            <div key={i.id} className="px-4 py-3 grid grid-cols-12 gap-3 items-center hover:bg-accent/40 transition-colors cursor-pointer">
              <div className="col-span-2 font-mono text-xs text-muted-foreground">{i.id}</div>
              <div className="col-span-4 text-sm font-medium">{i.t}</div>
              <div className="col-span-3 text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> {i.loc}
              </div>
              <div className="col-span-1">
                <SevBadge sev={i.sev as any} />
              </div>
              <div className="col-span-1 text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> {i.eta}
              </div>
              <div className="col-span-1 text-xs font-mono text-muted-foreground text-right">{i.time}</div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}

function SevBadge({ sev }: { sev: "critical" | "warning" | "info" }) {
  const map = {
    critical: "bg-emergency/20 text-emergency border-emergency/40",
    warning: "bg-warning/20 text-warning border-warning/40",
    info: "bg-primary/20 text-primary-foreground/90 border-primary/40",
  };
  return <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${map[sev]}`}>{sev}</span>;
}

function RightPanel() {
  return (
    <>
      <div className="panel p-4">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Critical Alerts</div>
          <span className="live-dot" />
        </div>
        <div className="mt-3 space-y-3">
          {[
            { t: "LPG Tanker · MH-04 KX 8821", l: "Stationary 14m on NH-48", c: "emergency" },
            { t: "Black spot threshold breached", l: "Pune Ring Rd · 3 incidents/hr", c: "warning" },
            { t: "Cyclonic winds 65 km/h", l: "Konkan belt · evacuation watch", c: "warning" },
          ].map((a, i) => (
            <div key={i} className="border-l-2 pl-3 py-1" style={{ borderColor: a.c === "emergency" ? "var(--emergency)" : "var(--warning)" }}>
              <div className="text-xs font-medium">{a.t}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{a.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Nearby Responders</div>
        <div className="mt-3 space-y-2">
          {[
            { t: "AMB-MH12-0421", d: "Pune · 1.2 km", i: Ambulance, c: "success" },
            { t: "PCR-MH14-119", d: "Khadki · 2.1 km", i: Siren, c: "primary" },
            { t: "AMB-MH12-0337", d: "Hadapsar · 3.8 km", i: Ambulance, c: "success" },
            { t: "FIRE-MH12-04", d: "Yerwada · 4.2 km", i: Truck, c: "warning" },
          ].map((r, i) => {
            const Icon = r.i;
            return (
              <div key={i} className="flex items-center gap-2.5 p-2 rounded-md hover:bg-accent/50 cursor-pointer">
                <div className="h-8 w-8 rounded-md bg-accent grid place-items-center">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-mono">{r.t}</div>
                  <div className="text-[11px] text-muted-foreground">{r.d}</div>
                </div>
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel p-4">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Hazard Watch</div>
        <div className="mt-3 space-y-2.5">
          {[
            { l: "LPG Convoys", v: 47, c: "emergency" },
            { l: "Petrol Tankers", v: 128, c: "warning" },
            { l: "Chemical Carriers", v: 89, c: "warning" },
            { l: "Explosives", v: 12, c: "emergency" },
          ].map((x) => (
            <div key={x.l}>
              <div className="flex justify-between text-xs"><span>{x.l}</span><span className="font-mono">{x.v}</span></div>
              <div className="mt-1 h-1 bg-accent rounded">
                <div className="h-full rounded" style={{
                  width: `${Math.min(100, x.v)}%`,
                  background: x.c === "emergency" ? "var(--emergency)" : "var(--warning)",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
