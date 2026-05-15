import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { MapPanel } from "@/components/MapPanel";
import { AlertTriangle, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/blackspots")({
  head: () => ({ meta: [{ title: "Black Spot Intelligence — RAKSHAK" }] }),
  component: BlackSpots,
});

const SPOTS = [
  { name: "Mumbai-Pune Expy KM 41", risk: 96, fatal: 38, type: "Sharp curve + descent" },
  { name: "Samruddhi Mahamarg KM 312", risk: 91, fatal: 27, type: "Wildlife crossing" },
  { name: "NH-66 Ratnagiri Ghat", risk: 88, fatal: 22, type: "Monsoon landslide" },
  { name: "Pune Ring Rd Wagholi", risk: 84, fatal: 19, type: "Heavy intersection" },
  { name: "Aurangabad Bypass Junction-3", risk: 79, fatal: 14, type: "Visibility deficit" },
  { name: "NH-48 Khalapur Toll", risk: 77, fatal: 11, type: "Sudden braking" },
];

function BlackSpots() {
  return (
    <ConsoleLayout
      title="Black Spot Intelligence"
      subtitle="AI accident-prediction across Maharashtra's national and state highway network"
    >
      <div className="rounded-md border border-emergency/40 bg-emergency/10 px-4 py-3 mb-5 flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-emergency" />
        <div className="flex-1">
          <div className="text-sm font-medium">Entering High Accident Probability Zone</div>
          <div className="text-xs text-muted-foreground">Mumbai-Pune Expressway · KM 38–46 · Risk Index 96/100 · Last fatality 6 days ago</div>
        </div>
        <button className="text-xs px-3 py-1.5 rounded border border-emergency/50 hover:bg-emergency/20">Suggest Safer Route</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Active Black Spots" value="284" intent="danger" />
        <StatCard label="Predicted Next 24h" value="19" intent="warning" />
        <StatCard label="Fatalities YTD" value="3,412" delta="−12% YoY" />
        <StatCard label="AI Safety Score" value="74" delta="+3 pts vs Q3" intent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MapPanel height={460} />
        </div>
        <div className="panel p-4">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Top Risk Corridors</div>
          <div className="mt-4 space-y-3">
            {SPOTS.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium">{s.name}</span>
                  <span className="font-mono text-emergency">{s.risk}</span>
                </div>
                <div className="text-[11px] text-muted-foreground">{s.type} · {s.fatal} fatalities</div>
                <div className="mt-1.5 h-1 bg-accent rounded">
                  <div className="h-full rounded bg-gradient-to-r from-warning to-emergency" style={{ width: `${s.risk}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-5">
        <div className="panel p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Fatality Trend · 12 mo</div>
              <div className="mt-1 font-display text-xl">Statewide Fatalities</div>
            </div>
            <div className="flex items-center gap-1.5 text-success text-sm"><TrendingUp className="h-4 w-4 rotate-180" /> −12.4%</div>
          </div>
          <Sparkline />
        </div>
        <div className="panel p-5">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Time-of-Day Heatmap</div>
          <div className="mt-3 grid grid-cols-24 gap-px" style={{ gridTemplateColumns: "repeat(24, 1fr)" }}>
            {Array.from({ length: 24 * 7 }).map((_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{
                    background: `oklch(${0.25 + intensity * 0.4} ${0.05 + intensity * 0.2} ${25 + intensity * 30})`,
                  }}
                />
              );
            })}
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-mono text-muted-foreground">
            <span>00:00</span><span>12:00</span><span>23:59</span>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}

function Sparkline() {
  const points = Array.from({ length: 24 }, (_, i) => ({
    x: (i / 23) * 100,
    y: 50 + Math.sin(i / 2) * 18 + Math.random() * 8,
  }));
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox="0 0 100 80" className="mt-4 w-full h-32">
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.17 255 / 0.4)" />
          <stop offset="100%" stopColor="oklch(0.62 0.17 255 / 0)" />
        </linearGradient>
      </defs>
      <path d={`${path} L 100 80 L 0 80 Z`} fill="url(#spark)" />
      <path d={path} fill="none" stroke="oklch(0.62 0.17 255)" strokeWidth="1.2" />
    </svg>
  );
}
