import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { MapPanel } from "@/components/MapPanel";
import { Truck, AlertTriangle, Wind, Navigation } from "lucide-react";

export const Route = createFileRoute("/hazardous")({
  head: () => ({ meta: [{ title: "Hazardous Vehicle Monitoring — RAKSHAK" }] }),
  component: Hazardous,
});

const FLEET = [
  { id: "MH-04 KX 8821", cargo: "LPG · 18,000 L", risk: "critical", route: "JNPT → Pune", speed: 64, status: "Stationary 14m" },
  { id: "MH-12 AB 4471", cargo: "Petrol · 24,000 L", risk: "high", route: "Manmad → Mumbai", speed: 78, status: "On route" },
  { id: "MH-43 PQ 0029", cargo: "Sulphuric Acid", risk: "critical", route: "Tarapur → Dombivli", speed: 52, status: "Approaching black spot" },
  { id: "MH-31 LM 9921", cargo: "Industrial Explosives", risk: "critical", route: "Nagpur → Chandrapur", speed: 48, status: "Convoy escort" },
  { id: "MH-18 RT 3382", cargo: "Diesel · 30,000 L", risk: "medium", route: "Solapur → Latur", speed: 71, status: "On route" },
  { id: "MH-09 GH 1148", cargo: "Compressed CNG", risk: "high", route: "Kolhapur → Sangli", speed: 55, status: "Refueling" },
];

function Hazardous() {
  return (
    <ConsoleLayout
      title="Hazardous Vehicle Monitoring"
      subtitle="LPG · Petrol · Chemicals · Explosives — live convoy intelligence"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Tracked Convoys" value="312" />
        <StatCard label="In Alert Zone" value="3" intent="danger" />
        <StatCard label="Leakage Sensors" value="OK" intent="success" />
        <StatCard label="Air Toxicity Index" value="42 AQI" intent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <MapPanel height={460}>
            {/* blast radius simulation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 rounded-full border border-emergency/50 bg-emergency/10 ping-slow" />
                <div className="absolute inset-4 rounded-full border border-warning/60 bg-warning/10" />
                <div className="absolute inset-10 rounded-full bg-emergency" />
              </div>
            </div>
            <div className="absolute bottom-4 right-4 panel-elevated p-3 w-60">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Blast Radius Sim</div>
              <div className="mt-2 space-y-1 text-xs">
                <Row k="Vehicle" v="MH-04 KX 8821" />
                <Row k="Cargo" v="LPG 18,000 L" />
                <Row k="Lethal R" v="180 m" danger />
                <Row k="Heat R" v="450 m" warn />
                <Row k="Evac R" v="800 m" />
              </div>
            </div>
          </MapPanel>

          <div className="panel">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span className="font-display text-sm font-medium">Active Hazard Fleet</span>
              <span className="live-dot ml-1" />
            </div>
            <div className="divide-y divide-border">
              {FLEET.map((f) => (
                <div key={f.id} className="px-4 py-3 grid grid-cols-12 gap-3 items-center text-sm hover:bg-accent/40">
                  <div className="col-span-3 font-mono text-xs">{f.id}</div>
                  <div className="col-span-3 text-xs">{f.cargo}</div>
                  <div className="col-span-3 text-xs text-muted-foreground flex items-center gap-1.5"><Navigation className="h-3 w-3" /> {f.route}</div>
                  <div className="col-span-1 font-mono text-xs">{f.speed}</div>
                  <div className="col-span-1"><Risk r={f.risk as any} /></div>
                  <div className="col-span-1 text-[11px] text-muted-foreground text-right">{f.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-emergency" />
              <span className="text-sm font-medium">Leakage Alerts</span>
            </div>
            <div className="mt-3 space-y-3">
              {[
                { t: "Sensor: HC-vapor anomaly", v: "MH-12 AB 4471 · −2.3%/min", c: "warning" },
                { t: "Pressure drop detected", v: "MH-04 KX 8821 · 6.1 → 5.3 bar", c: "emergency" },
              ].map((a, i) => (
                <div key={i} className="border-l-2 pl-3" style={{ borderColor: a.c === "emergency" ? "var(--emergency)" : "var(--warning)" }}>
                  <div className="text-xs font-medium">{a.t}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">{a.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-sm font-medium">Evacuation Plan</span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between"><span>Population in lethal R</span><span className="font-mono text-emergency">~4,200</span></div>
              <div className="flex justify-between"><span>Schools / hospitals</span><span className="font-mono">3 / 2</span></div>
              <div className="flex justify-between"><span>Wind direction</span><span className="font-mono">SW · 18 km/h</span></div>
              <div className="flex justify-between"><span>Toxic plume reach</span><span className="font-mono text-warning">1.2 km / 14 min</span></div>
            </div>
            <button className="mt-4 w-full text-xs py-2 rounded bg-emergency text-emergency-foreground font-medium">
              Initiate Evacuation Protocol
            </button>
          </div>

          <div className="panel p-4">
            <div className="text-sm font-medium">Smart Reroute Suggestions</div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { t: "Reroute MH-12 AB via NH-50", s: "+12 km · −68% risk" },
                { t: "Hold MH-31 LM at depot 14m", s: "Convoy ahead congestion" },
                { t: "MH-18 RT bypass Solapur city", s: "+4 km · school zone" },
              ].map((r, i) => (
                <div key={i} className="p-2.5 rounded border border-border hover:border-primary/50 cursor-pointer">
                  <div className="font-medium">{r.t}</div>
                  <div className="text-muted-foreground text-[11px] mt-0.5">{r.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}

function Risk({ r }: { r: "critical" | "high" | "medium" }) {
  const m = {
    critical: "bg-emergency/20 text-emergency border-emergency/40",
    high: "bg-warning/20 text-warning border-warning/40",
    medium: "bg-primary/20 text-primary-foreground/90 border-primary/40",
  };
  return <span className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${m[r]}`}>{r}</span>;
}

function Row({ k, v, danger, warn }: { k: string; v: string; danger?: boolean; warn?: boolean }) {
  const c = danger ? "text-emergency" : warn ? "text-warning" : "text-foreground";
  return <div className="flex justify-between"><span className="text-muted-foreground">{k}</span><span className={`font-mono ${c}`}>{v}</span></div>;
}
