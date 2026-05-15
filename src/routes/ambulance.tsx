import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { MapPanel } from "@/components/MapPanel";
import { Ambulance, Hospital, Droplet, Clock } from "lucide-react";

export const Route = createFileRoute("/ambulance")({
  head: () => ({ meta: [{ title: "Ambulance & Hospital Response — RAKSHAK" }] }),
  component: AmbPage,
});

const AMBS = [
  { id: "AMB-MH12-0421", crew: "Dr. P. Naik · 2 EMT", eta: "3m 12s", to: "Sahyadri Trauma", status: "en-route" },
  { id: "AMB-MH12-0337", crew: "Dr. S. Kale · 2 EMT", eta: "—", to: "Standby Hadapsar", status: "standby" },
  { id: "AMB-MH14-0119", crew: "Dr. R. Borkar", eta: "5m 40s", to: "Ruby Hall", status: "en-route" },
  { id: "AMB-MH04-1102", crew: "Dr. A. Shaikh", eta: "8m 02s", to: "KEM Mumbai", status: "en-route" },
];

const HOSPITALS = [
  { name: "Sahyadri Super Speciality", icu: 4, beds: 17, blood: "All", trauma: true },
  { name: "Ruby Hall Clinic", icu: 2, beds: 9, blood: "B+, O−", trauma: true },
  { name: "KEM Hospital", icu: 11, beds: 38, blood: "All", trauma: true },
  { name: "Aditya Birla Memorial", icu: 0, beds: 4, blood: "A+, O+", trauma: false },
  { name: "Lilavati Hospital", icu: 3, beds: 12, blood: "All", trauma: true },
];

function AmbPage() {
  return (
    <ConsoleLayout
      title="Ambulance & Hospital Response"
      subtitle="Golden Hour AI routing · ICU availability · trauma-bay coordination"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Fleet Active" value="2,184" intent="success" />
        <StatCard label="Currently Engaged" value="218" />
        <StatCard label="ICU Beds Available" value="487" intent="success" />
        <StatCard label="Avg. Dispatch" value="38s" delta="−12s vs last hr" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <MapPanel height={480} />
        </div>
        <div className="panel p-4">
          <div className="flex items-center gap-2">
            <Ambulance className="h-4 w-4" />
            <span className="text-sm font-medium">Active Dispatches</span>
            <span className="live-dot ml-1" />
          </div>
          <div className="mt-3 space-y-3">
            {AMBS.map((a) => (
              <div key={a.id} className="p-3 rounded border border-border hover:border-primary/40 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs">{a.id}</div>
                  <div className={`text-[10px] px-1.5 py-0.5 rounded border font-mono uppercase ${
                    a.status === "en-route" ? "bg-emergency/20 text-emergency border-emergency/40" : "bg-success/20 text-success border-success/40"
                  }`}>{a.status}</div>
                </div>
                <div className="mt-1.5 text-xs">{a.crew}</div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>→ {a.to}</span>
                  <span className="font-mono flex items-center gap-1"><Clock className="h-3 w-3" /> {a.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 panel">
        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
          <Hospital className="h-4 w-4" />
          <span className="font-display text-sm font-medium">Hospital Network · Live Capacity</span>
        </div>
        <div className="grid grid-cols-12 gap-3 px-4 py-2 border-b border-border text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
          <div className="col-span-4">Facility</div>
          <div className="col-span-2">ICU Beds</div>
          <div className="col-span-2">Emergency Beds</div>
          <div className="col-span-2 flex items-center gap-1"><Droplet className="h-3 w-3" /> Blood Bank</div>
          <div className="col-span-2">Trauma Center</div>
        </div>
        <div className="divide-y divide-border">
          {HOSPITALS.map((h) => (
            <div key={h.name} className="grid grid-cols-12 gap-3 px-4 py-3 items-center text-sm hover:bg-accent/40">
              <div className="col-span-4 font-medium">{h.name}</div>
              <div className="col-span-2 font-mono">
                <span className={h.icu === 0 ? "text-emergency" : h.icu < 3 ? "text-warning" : "text-success"}>{h.icu}</span>
                <span className="text-muted-foreground"> available</span>
              </div>
              <div className="col-span-2 font-mono">{h.beds}</div>
              <div className="col-span-2 text-xs">{h.blood}</div>
              <div className="col-span-2">
                {h.trauma ? <span className="text-xs text-success">● Level-1</span> : <span className="text-xs text-muted-foreground">— None</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
