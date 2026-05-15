import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Siren, Ambulance, Hospital, Truck, AlertTriangle,
  Brain, Users, Award, BarChart3, Radio, Search, Globe, Bell, ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { ReactNode } from "react";

const NAV = [
  { to: "/command", label: "Dashboard", icon: LayoutDashboard },
  { to: "/command", label: "Live Incidents", icon: Siren, badge: "12" },
  { to: "/ambulance", label: "Ambulances", icon: Ambulance },
  { to: "/ambulance", label: "Hospitals", icon: Hospital },
  { to: "/hazardous", label: "Hazardous Vehicles", icon: Truck, badge: "47" },
  { to: "/blackspots", label: "Black Spots", icon: AlertTriangle },
  { to: "/ai-detection", label: "AI Risk Analysis", icon: Brain },
  { to: "/hazards", label: "Citizen Reports", icon: Users },
  { to: "/samaritan", label: "Reward System", icon: Award },
  { to: "/analytics", label: "Government Analytics", icon: BarChart3 },
  { to: "/command", label: "Emergency Broadcasts", icon: Radio },
];

export function ConsoleLayout({
  children,
  title,
  subtitle,
  rightPanel,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
  rightPanel?: ReactNode;
}) {
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="flex h-14 items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <div className="leading-none">
              <div className="font-display text-sm font-semibold tracking-tight">RAKSHAK</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Maharashtra · Command</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1.5 rounded-md border border-emergency/40 bg-emergency/10 text-emergency text-xs font-medium">
            <span className="live-dot" />
            DEFCON-3 · 12 active incidents
          </div>

          <div className="flex-1 max-w-lg ml-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search incidents, vehicles, districts, officers…"
              className="w-full h-9 pl-9 pr-20 rounded-md bg-surface border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary"
            />
            <kbd className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 font-mono text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded">⌘K</kbd>
          </div>

          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Globe className="h-4 w-4" /> EN · मराठी · हिंदी
          </button>

          <button className="relative p-2 rounded-md hover:bg-accent transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emergency" />
          </button>

          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border">
            <div className="text-right leading-tight">
              <div className="text-xs font-medium">Insp. R. Deshmukh</div>
              <div className="text-[10px] text-muted-foreground font-mono">RTO-MH-12 · Pune</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-saffron grid place-items-center text-xs font-semibold">
              RD
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 border-r border-border bg-sidebar">
          <div className="px-3 py-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Operations</div>
          <nav className="px-2 space-y-0.5 overflow-y-auto">
            {NAV.map((item, i) => {
              const active = path === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={i}
                  to={item.to}
                  className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-primary/15 text-foreground border border-primary/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent border border-transparent"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emergency/20 text-emergency">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto p-3 border-t border-border">
            <div className="panel-elevated p-3">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="h-4 w-4 text-success" />
                <span className="font-medium">System Nominal</span>
              </div>
              <div className="mt-2 space-y-1 text-[10px] font-mono text-muted-foreground">
                <Row k="Uptime" v="99.982%" />
                <Row k="Sync" v="2.4s" />
                <Row k="Nodes" v="1,284" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="border-b border-border px-6 py-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-mono uppercase tracking-widest">
                <span>RAKSHAK</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-foreground">{title}</span>
              </div>
              <h1 className="mt-1 text-2xl font-display font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
            </div>
            <div className="hidden md:flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <span><span className="live-dot success mr-1.5" /> AI ENGINE OK</span>
              <span><span className="live-dot mr-1.5" /> CAD LINK</span>
              <span><span className="live-dot warning mr-1.5" /> WX FEED</span>
            </div>
          </div>

          <div className="flex">
            <div className="flex-1 min-w-0 p-6">{children}</div>
            {rightPanel && (
              <aside className="hidden xl:block w-80 shrink-0 border-l border-border p-4 space-y-4">
                {rightPanel}
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <span>{k}</span>
      <span className="text-foreground/80">{v}</span>
    </div>
  );
}

export function Logo() {
  return (
    <div className="relative h-8 w-8 rounded-md bg-gradient-to-br from-primary/30 to-emergency/20 border border-primary/40 grid place-items-center">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 L4 6 v6 c0 5 3.5 8 8 10 c4.5 -2 8 -5 8 -10 V6 z" />
        <path d="M9 12 l2 2 l4 -4" />
      </svg>
    </div>
  );
}

export function StatCard({
  label, value, delta, intent = "default",
}: { label: string; value: string; delta?: string; intent?: "default" | "danger" | "success" | "warning" }) {
  const colors = {
    default: "text-foreground",
    danger: "text-emergency",
    success: "text-success",
    warning: "text-warning",
  }[intent];
  return (
    <div className="panel p-4">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{label}</div>
      <div className={`mt-2 text-3xl font-display font-semibold tracking-tight ${colors}`}>{value}</div>
      {delta && <div className="mt-1 text-xs text-muted-foreground font-mono">{delta}</div>}
    </div>
  );
}
