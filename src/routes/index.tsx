import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPanel } from "@/components/MapPanel";
import { AurangabadMap } from "@/components/AurangabadMap";
import { Logo } from "@/components/ConsoleLayout";
import {
  Siren, ShieldCheck, Activity, Ambulance, Brain, ArrowRight,
  AlertTriangle, Truck, Award, Radio, Globe, Phone,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RAKSHAK — Maharashtra Integrated Emergency & Road Safety Network" },
      { name: "description", content: "AI-powered public emergency response infrastructure for Maharashtra. Live command center, hazardous vehicle tracking, ambulance coordination." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />
      <Hero />
      <PartnersStrip />
      <CapabilitiesGrid />
      <CommandPreview />
      <NetworkStats />
      <GoldenHour />
      <CTAFooter />
    </div>
  );
}

function TopNav() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto flex h-14 items-center gap-6 px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
          <div className="leading-none">
            <div className="font-display text-sm font-semibold tracking-tight">RAKSHAK</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Maharashtra</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/command" className="hover:text-foreground">Command Center</Link>
          <Link to="/blackspots" className="hover:text-foreground">Black Spots</Link>
          <Link to="/hazardous" className="hover:text-foreground">Hazard Tracking</Link>
          <Link to="/ambulance" className="hover:text-foreground">Response Network</Link>
          <Link to="/samaritan" className="hover:text-foreground">Good Samaritan</Link>
          <Link to="/analytics" className="hover:text-foreground">Government</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button className="hidden md:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Globe className="h-3.5 w-3.5" /> EN
          </button>
          <Link to="/login" className="text-sm px-3.5 py-1.5 rounded-md border border-border hover:border-primary/60 hover:text-foreground text-muted-foreground transition-colors">
            Sign In
          </Link>
          <button className="text-sm px-3.5 py-1.5 rounded-md bg-emergency text-emergency-foreground font-medium inline-flex items-center gap-1.5 hover:opacity-90">
            <Siren className="h-3.5 w-3.5" /> SOS
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative radial-glow border-b border-border overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-xs font-mono uppercase tracking-widest text-primary-foreground/90">
            <span className="live-dot success" />
            Operational · v4.2.1 · Mantralaya Sync
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            AI-Powered Public<br />
            Emergency Infrastructure<br />
            <span className="text-gradient-emergency">Saving lives in the Golden Hour.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            RAKSHAK is Maharashtra's unified emergency command network — coordinating ambulances,
            police, hospitals, RTO, and citizens across 36 districts in real time. Built for the
            sixty minutes that matter most.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link to="/command" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              Open Command Center <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-emergency text-emergency-foreground font-medium hover:opacity-90 transition-opacity">
              <Siren className="h-4 w-4" /> Trigger Emergency SOS
            </button>
            <Link to="/login" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-border hover:border-primary/60 transition-colors">
              <Phone className="h-4 w-4" /> Citizen Access
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg">
            <MiniStat label="Active Incidents" value="47" intent="danger" />
            <MiniStat label="Ambulances Live" value="2,184" intent="success" />
            <MiniStat label="Avg. Response" value="6.2m" />
          </div>
        </div>

        <div className="lg:col-span-6">
          <MapPanel height={520} />
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value, intent }: { label: string; value: string; intent?: "danger" | "success" }) {
  const c = intent === "danger" ? "text-emergency" : intent === "success" ? "text-success" : "text-foreground";
  return (
    <div className="panel p-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</div>
      <div className={`mt-1 text-xl font-display font-semibold ${c}`}>{value}</div>
    </div>
  );
}

function PartnersStrip() {
  const partners = [
    "Government of Maharashtra",
    "Maharashtra RTO",
    "Smart Cities Mission",
    "State Disaster Management Authority",
    "Maharashtra Highway Police",
    "108 EMS Services",
    "MahaIT",
  ];
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center gap-x-10 gap-y-3">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
          Officially integrated with
        </div>
        {partners.map((p) => (
          <div key={p} className="text-sm text-muted-foreground/90 font-medium tracking-tight">
            {p}
          </div>
        ))}
      </div>
    </section>
  );
}

function CapabilitiesGrid() {
  const items = [
    { icon: AlertTriangle, t: "Black Spot Intelligence", d: "AI-predicted accident-prone corridors with live risk scoring across every NH and SH.", to: "/blackspots" },
    { icon: Truck, t: "Hazardous Vehicle Network", d: "Real-time tracking of LPG, petrol, chemical and explosive transport with blast-radius simulation.", to: "/hazardous" },
    { icon: Ambulance, t: "Golden Hour Routing", d: "Dynamic ambulance dispatch with traffic optimization and ICU-bed availability matching.", to: "/ambulance" },
    { icon: Brain, t: "AI Crash Detection", d: "Sensor-fusion impact, tilt and crash probability models triggering autonomous SOS.", to: "/ai-detection" },
    { icon: Award, t: "Good Samaritan Rewards", d: "Verified citizen rescue participation with civic reputation and digital certificates.", to: "/samaritan" },
    { icon: Radio, t: "Government War-Room", d: "Unified analytics for RTO, police, highway authority and disaster management cells.", to: "/analytics" },
  ];
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <SectionHead
          eyebrow="Platform"
          title="One nervous system for state-wide emergency response."
          desc="Eleven interconnected modules built to compress decision-making from minutes to seconds."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Link
                key={it.t}
                to={it.to}
                className="group bg-background p-7 hover:bg-surface transition-colors relative"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-md border border-border bg-surface grid place-items-center group-hover:border-primary/60 transition-colors">
                    <Icon className="h-5 w-5 text-primary-foreground/90" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium tracking-tight">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.d}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CommandPreview() {
  return (
    <section className="border-b border-border bg-surface/30">
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5 space-y-5">
          <SectionHead
            eyebrow="Live Command Center"
            title="A war-room that fits in any browser."
            desc="Operators see every active incident, hazardous convoy, ambulance and weather hazard layered on a single live map of Maharashtra."
            align="left"
          />
          <ul className="space-y-3 text-sm text-muted-foreground">
            {[
              "Live incident feed with AI severity classification",
              "Multi-agency dispatch coordination in one console",
              "Hazardous-cargo blast radius simulation overlay",
              "District-wise SLA monitoring with auto-escalation",
            ].map((x) => (
              <li key={x} className="flex gap-3">
                <ShieldCheck className="h-4 w-4 text-success shrink-0 mt-0.5" />
                {x}
              </li>
            ))}
          </ul>
          <Link to="/command" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-primary/50 bg-primary/10 text-sm font-medium hover:bg-primary/20 transition-colors">
            Launch Command Center <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="lg:col-span-7">
          <MapPanel height={460} />
        </div>
      </div>
    </section>
  );
}

function NetworkStats() {
  const stats = [
    { l: "Districts Covered", v: "36 / 36" },
    { l: "Highway km Monitored", v: "1,71,000" },
    { l: "IoT Sensor Nodes", v: "1,28,400" },
    { l: "Citizen Responders", v: "412,890" },
    { l: "Avg. Response Time", v: "6.2 min" },
    { l: "Lives Saved (FY24)", v: "47,318" },
  ];
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {stats.map((s) => (
            <div key={s.l} className="bg-background p-5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{s.l}</div>
              <div className="mt-2 text-2xl font-display font-semibold tracking-tight">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GoldenHour() {
  return (
    <section className="border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-emergency font-mono">The Golden Hour</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            60 minutes between<br /> a crash and a life saved.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-lg leading-relaxed">
            Every second of delayed response after an accident reduces survival probability by 1%.
            RAKSHAK collapses dispatch, routing and trauma-bay coordination into a single
            sub-second pipeline.
          </p>
        </div>
        <div className="panel-elevated p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Response Pipeline</div>
          <div className="mt-6 space-y-5">
            {[
              { t: "T+0s", l: "Incident detected (sensor / citizen / AI vision)", c: "emergency" },
              { t: "T+3s", l: "Severity classified · nearest assets located", c: "warning" },
              { t: "T+8s", l: "Ambulance dispatched · hospital pre-alerted", c: "primary" },
              { t: "T+15s", l: "Police + traffic signal preemption activated", c: "primary" },
              { t: "T+45s", l: "Convoy hazard zones rerouted around scene", c: "success" },
              { t: "T+6m", l: "Patient at trauma bay, ICU bed reserved", c: "success" },
            ].map((s, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="font-mono text-xs text-muted-foreground w-12 pt-0.5">{s.t}</div>
                <div className={`h-2 w-2 rounded-full mt-1.5 ${
                  s.c === "emergency" ? "bg-emergency" :
                  s.c === "warning" ? "bg-warning" :
                  s.c === "success" ? "bg-success" : "bg-primary"
                }`} />
                <div className="text-sm flex-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAFooter() {
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <Activity className="h-7 w-7 mx-auto text-primary-foreground/80" />
        <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight">
          Built for the next decade of Maharashtra's safety.
        </h2>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          From tehsil to highway to trauma bay — one operational fabric.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/command" className="px-5 py-3 rounded-md bg-primary text-primary-foreground font-medium">
            Enter Operations
          </Link>
          <Link to="/analytics" className="px-5 py-3 rounded-md border border-border hover:border-primary/60">
            Government Portal
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <div>© 2026 Government of Maharashtra · RAKSHAK Mission</div>
          <div className="flex gap-5">
            <span>v4.2.1</span><span>SLA 99.98%</span><span>ISO/IEC 27001</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, desc, align = "center" }: { eyebrow: string; title: string; desc?: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-xl"}>
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/70 font-mono">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}
