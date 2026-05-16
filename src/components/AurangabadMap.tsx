import { ReactNode } from "react";

type Incident = {
  // percentage positions over the map frame
  x: number;
  y: number;
  type: "critical" | "warning" | "active";
  label: string;
  meta?: string;
};

const INCIDENTS: Incident[] = [
  { x: 48, y: 46, type: "critical", label: "Kranti Chowk", meta: "RTA · 2 vehicles" },
  { x: 38, y: 38, type: "warning", label: "Jalna Road", meta: "Congestion +320%" },
  { x: 60, y: 32, type: "active", label: "CIDCO N-7", meta: "AMB-218 dispatched" },
  { x: 30, y: 58, type: "warning", label: "Beed Bypass", meta: "Black-spot KM-14" },
  { x: 68, y: 60, type: "critical", label: "Waluj MIDC", meta: "Hazmat tanker leak" },
  { x: 52, y: 70, type: "active", label: "Cidco Bus Stand", meta: "Crowd surge alert" },
  { x: 22, y: 30, type: "active", label: "Daulatabad Fort Rd", meta: "Patrol PCR-07" },
  { x: 78, y: 44, type: "warning", label: "Chikalthana Airport", meta: "Runway clear" },
];

const RING: Record<Incident["type"], string> = {
  critical: "var(--emergency)",
  warning: "var(--warning)",
  active: "var(--primary)",
};

// Official RAKSHAK operational layer — Google My Maps (Aurangabad / Chh. Sambhajinagar)
const GMAPS_SRC =
  "https://www.google.com/maps/d/u/0/embed?mid=1MvzdlwrJ5YuHhOxaXQnrA6fal-UcgAM&ehbc=2E312F";

export function AurangabadMap({
  height = 560,
  children,
}: {
  height?: number;
  children?: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden panel grid-bg scan-line"
      style={{ height }}
    >
      {/* Real OSM tiles */}
      <iframe
        title="Aurangabad live operational map"
        src={OSM_SRC}
        className="absolute inset-0 h-full w-full"
        style={{
          border: 0,
          filter:
            "invert(0.92) hue-rotate(180deg) saturate(0.7) brightness(0.95) contrast(1.05)",
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Tactical tint overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, oklch(0.55 0.18 255 / 0.10), transparent 65%), linear-gradient(180deg, oklch(0.18 0.03 255 / 0.35), oklch(0.12 0.02 255 / 0.55))",
        }}
      />

      {/* SVG overlays: hotspots + sweep */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="abad-heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.62 0.24 25 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 25 / 0)" />
          </radialGradient>
          <radialGradient id="abad-sweep" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 195 / 0.35)" />
            <stop offset="100%" stopColor="oklch(0.72 0.18 195 / 0)" />
          </radialGradient>
        </defs>

        {/* Heat blobs over key zones */}
        <circle cx="48" cy="46" r="14" fill="url(#abad-heat)" />
        <circle cx="68" cy="60" r="10" fill="url(#abad-heat)" />
        <circle cx="38" cy="38" r="9" fill="url(#abad-heat)" />

        {/* Radar sweep around Kranti Chowk */}
        <circle cx="48" cy="46" r="22" fill="url(#abad-sweep)">
          <animate
            attributeName="r"
            values="6;28;6"
            dur="4.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="4.5s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Incident pulses */}
        {INCIDENTS.map((i, idx) => (
          <g key={idx}>
            <circle
              cx={i.x}
              cy={i.y}
              r="2.4"
              fill={RING[i.type]}
              opacity="0.18"
            >
              <animate
                attributeName="r"
                values="2.4;4.6;2.4"
                dur="2.4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.35;0;0.35"
                dur="2.4s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={i.x} cy={i.y} r="0.85" fill={RING[i.type]} />
          </g>
        ))}
      </svg>

      {/* Incident labels */}
      {INCIDENTS.map((i, idx) => (
        <div
          key={idx}
          className="pointer-events-none absolute -translate-x-1/2 translate-y-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest"
          style={{
            left: `${i.x}%`,
            top: `${i.y}%`,
            color:
              i.type === "critical"
                ? "var(--emergency)"
                : i.type === "warning"
                  ? "var(--warning)"
                  : "var(--primary)",
            textShadow: "0 0 8px oklch(0.12 0.02 255 / 0.9)",
          }}
        >
          <span className="opacity-90">{i.label}</span>
          {i.meta && (
            <span className="ml-2 text-foreground/70">· {i.meta}</span>
          )}
        </div>
      ))}

      {/* Corner brackets */}
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      {/* HUD: header */}
      <div className="absolute top-3 left-3 right-3 flex items-start justify-between font-mono text-[10px] uppercase tracking-widest">
        <div className="text-muted-foreground">
          <div className="text-foreground/90">
            CITY · CHHATRAPATI SAMBHAJINAGAR (AURANGABAD)
          </div>
          <div>SECTOR · MH-20 · DIVISION CENTRAL</div>
          <div>LAT 19.8762° N · LON 75.3433° E</div>
        </div>
        <div className="flex items-center gap-2 panel px-2 py-1">
          <span className="live-dot" />
          <span>Live · 2.4s sync</span>
        </div>
      </div>

      {/* HUD: legend */}
      <div className="absolute bottom-3 left-3 panel px-3 py-2 font-mono text-[10px] uppercase tracking-widest">
        <div className="flex items-center gap-3">
          <LegendDot color="var(--emergency)" label="Critical" />
          <LegendDot color="var(--warning)" label="Warning" />
          <LegendDot color="var(--primary)" label="Active Unit" />
        </div>
        <div className="mt-1 flex items-center gap-2 text-muted-foreground">
          <div className="h-[2px] w-12 bg-foreground/40" />
          <span>2 KM</span>
        </div>
      </div>

      {/* HUD: stats */}
      <div className="absolute bottom-3 right-3 panel px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-right">
        <div className="text-emergency">3 CRITICAL</div>
        <div className="text-warning">5 WARNINGS</div>
        <div className="text-primary">12 UNITS DEPLOYED</div>
      </div>

      {children}
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
      />
      <span>{label}</span>
    </span>
  );
}

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute h-4 w-4 border-primary/60";
  const cls = {
    tl: "top-2 left-2 border-l border-t",
    tr: "top-2 right-2 border-r border-t",
    bl: "bottom-2 left-2 border-l border-b",
    br: "bottom-2 right-2 border-r border-b",
  }[pos];
  return <div className={`${base} ${cls}`} />;
}
