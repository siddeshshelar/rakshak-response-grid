import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { Brain, Activity, Watch, Cpu } from "lucide-react";

export const Route = createFileRoute("/ai-detection")({
  head: () => ({ meta: [{ title: "AI Accident Detection — RAKSHAK" }] }),
  component: AIDetection,
});

function AIDetection() {
  return (
    <ConsoleLayout
      title="AI Accident Detection System"
      subtitle="Sensor-fusion crash inference · autonomous SOS triggering · wearable telemetry"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Sensors Online" value="1,28,400" intent="success" />
        <StatCard label="AI Inferences/sec" value="42,180" />
        <StatCard label="False-Positive Rate" value="0.31%" intent="success" />
        <StatCard label="Auto-SOS Today" value="89" intent="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 panel p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-sm font-medium">Live Inference Stream · Vehicle MH-12 AB 4471</span>
            </div>
            <span className="live-dot success" />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <Gauge label="Impact G-force" value={0.42} unit="g" intent="success" />
            <Gauge label="Tilt Angle" value={0.18} unit="°" intent="success" />
            <Gauge label="Crash Probability" value={0.04} unit="%" intent="success" />
          </div>

          <div className="mt-6 panel-elevated p-4">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Sensor Telemetry · last 60s</div>
            <Telemetry />
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel p-4">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary-foreground/80" />
              <span className="text-sm font-medium">Active Models</span>
            </div>
            <div className="mt-3 space-y-2.5">
              {[
                { n: "ImpactNet v3.2", s: "running", a: "98.4%" },
                { n: "TiltSense v2.1", s: "running", a: "97.1%" },
                { n: "CrashProb XL", s: "running", a: "96.8%" },
                { n: "CV-DashCam Vision", s: "warming", a: "94.2%" },
              ].map((m) => (
                <div key={m.n} className="flex items-center justify-between p-2 rounded border border-border">
                  <div>
                    <div className="text-xs font-medium">{m.n}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">accuracy {m.a}</div>
                  </div>
                  <span className={`live-dot ${m.s === "running" ? "success" : "warning"}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center gap-2">
              <Watch className="h-4 w-4" />
              <span className="text-sm font-medium">Wearable Integrations</span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { n: "Apple Watch HRV link", v: "ON" },
                { n: "Wear OS crash API", v: "ON" },
                { n: "Helmet IMU sensors", v: "1,420" },
                { n: "Truck blackbox feed", v: "8,910" },
              ].map((x) => (
                <div key={x.n} className="flex justify-between"><span>{x.n}</span><span className="font-mono">{x.v}</span></div>
              ))}
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-emergency" />
              <span className="text-sm font-medium">Recent Auto-SOS</span>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { id: "MH-14 PR 7733", t: "Confirmed crash · ambulance dispatched", c: "emergency", time: "2m" },
                { id: "MH-09 KL 0212", t: "False positive · driver overrode", c: "muted", time: "8m" },
                { id: "MH-04 BX 1190", t: "Tilt > 45° · checking …", c: "warning", time: "11m" },
              ].map((x, i) => (
                <div key={i} className="border-l-2 pl-3 py-1" style={{ borderColor: x.c === "emergency" ? "var(--emergency)" : x.c === "warning" ? "var(--warning)" : "var(--muted-foreground)" }}>
                  <div className="font-mono">{x.id} <span className="text-muted-foreground">· {x.time}</span></div>
                  <div className="text-[11px] text-muted-foreground">{x.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}

function Gauge({ label, value, unit, intent }: { label: string; value: number; unit: string; intent: "success" | "warning" | "danger" }) {
  const pct = Math.min(100, value * 100);
  const color = intent === "success" ? "var(--success)" : intent === "warning" ? "var(--warning)" : "var(--emergency)";
  const r = 36;
  const c = 2 * Math.PI * r;
  return (
    <div className="panel-elevated p-4 text-center">
      <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto -rotate-90">
        <circle cx="50" cy="50" r={r} stroke="var(--accent)" strokeWidth="6" fill="none" />
        <circle cx="50" cy="50" r={r} stroke={color} strokeWidth="6" fill="none"
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round" />
      </svg>
      <div className="-mt-16 font-display text-xl font-semibold">{(value * (unit === "%" ? 100 : 1)).toFixed(2)}{unit}</div>
      <div className="mt-9 text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</div>
    </div>
  );
}

function Telemetry() {
  const series = [
    { name: "Accel X", color: "oklch(0.62 0.17 255)" },
    { name: "Accel Y", color: "oklch(0.78 0.16 60)" },
    { name: "Accel Z", color: "oklch(0.72 0.18 155)" },
  ];
  return (
    <div className="mt-3">
      <svg viewBox="0 0 600 160" className="w-full h-32">
        {series.map((s, idx) => {
          const pts = Array.from({ length: 60 }, (_, i) => {
            const x = (i / 59) * 600;
            const y = 80 + Math.sin(i / 4 + idx) * (20 + idx * 8) + Math.random() * 6;
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
          }).join(" ");
          return <path key={s.name} d={pts} fill="none" stroke={s.color} strokeWidth="1.2" opacity="0.85" />;
        })}
        <line x1="0" y1="80" x2="600" y2="80" stroke="oklch(1 0 0 / 0.06)" />
      </svg>
      <div className="flex gap-4 mt-2 text-[10px] font-mono text-muted-foreground">
        {series.map((s) => (
          <div key={s.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />{s.name}
          </div>
        ))}
      </div>
    </div>
  );
}
