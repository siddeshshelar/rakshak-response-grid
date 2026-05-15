import { ReactNode } from "react";

type Hotspot = {
  cx: number;
  cy: number;
  type: "critical" | "warning" | "active";
  label?: string;
};

const DEFAULT_HOTSPOTS: Hotspot[] = [
  { cx: 280, cy: 240, type: "critical", label: "Mumbai-Pune Expy" },
  { cx: 410, cy: 285, type: "warning", label: "Pune Ring Rd" },
  { cx: 560, cy: 200, type: "critical", label: "Samruddhi Mahamarg" },
  { cx: 680, cy: 165, type: "active", label: "Nagpur Outer" },
  { cx: 350, cy: 360, type: "warning", label: "NH-66 Ratnagiri" },
  { cx: 480, cy: 320, type: "active", label: "Solapur Bypass" },
  { cx: 540, cy: 145, type: "warning", label: "Aurangabad" },
  { cx: 250, cy: 200, type: "active", label: "Thane Ghodbunder" },
];

const ROUTES = [
  "M 240 220 Q 360 180 460 240 T 700 180",
  "M 280 360 Q 400 300 540 340 T 720 280",
  "M 220 280 Q 320 340 420 320 T 660 360",
];

const COLOR: Record<Hotspot["type"], string> = {
  critical: "var(--emergency)",
  warning: "var(--warning)",
  active: "var(--primary)",
};

export function MapPanel({
  height = 520,
  showOverlays = true,
  children,
  hotspots = DEFAULT_HOTSPOTS,
}: {
  height?: number;
  showOverlays?: boolean;
  children?: ReactNode;
  hotspots?: Hotspot[];
}) {
  return (
    <div
      className="relative overflow-hidden panel grid-bg scan-line"
      style={{ height }}
    >
      {/* Stylized Maharashtra silhouette */}
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.28 0.04 255)" />
            <stop offset="100%" stopColor="oklch(0.22 0.03 255)" />
          </linearGradient>
          <radialGradient id="heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.62 0.24 25 / 0.55)" />
            <stop offset="100%" stopColor="oklch(0.62 0.24 25 / 0)" />
          </radialGradient>
        </defs>

        {/* Maharashtra simplified outline */}
        <path
          d="M 150 180
             L 230 130 L 320 110 L 430 100 L 540 115 L 640 140 L 720 180
             L 740 240 L 720 310 L 670 370 L 590 410 L 490 425 L 400 415
             L 320 395 L 250 365 L 200 320 L 165 270 Z"
          fill="url(#land)"
          stroke="oklch(0.62 0.17 255 / 0.5)"
          strokeWidth="1.2"
        />

        {/* District grid hints */}
        <g stroke="oklch(1 0 0 / 0.05)" strokeWidth="0.5">
          <path d="M 230 130 L 250 365" />
          <path d="M 320 110 L 320 395" />
          <path d="M 430 100 L 400 415" />
          <path d="M 540 115 L 490 425" />
          <path d="M 640 140 L 590 410" />
          <path d="M 200 320 L 720 310" fill="none" />
          <path d="M 230 200 L 720 200" fill="none" />
        </g>

        {/* Heat blobs */}
        {showOverlays && (
          <>
            <circle cx="280" cy="240" r="80" fill="url(#heat)" />
            <circle cx="560" cy="200" r="70" fill="url(#heat)" />
            <circle cx="350" cy="360" r="55" fill="url(#heat)" />
          </>
        )}

        {/* Highway routes */}
        {ROUTES.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="oklch(0.62 0.17 255 / 0.7)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="anim-dash"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* Ambulance icons moving along route */}
        {showOverlays && (
          <g>
            <circle cx="380" cy="208" r="4" fill="oklch(0.72 0.18 155)">
              <animateMotion dur="9s" repeatCount="indefinite"
                path="M 0 0 Q 120 -40 220 20 T 460 -40" />
            </circle>
            <circle cx="320" cy="320" r="3.5" fill="oklch(0.78 0.16 60)">
              <animateMotion dur="11s" repeatCount="indefinite"
                path="M 0 0 Q 120 -60 260 -20 T 440 -80" />
            </circle>
          </g>
        )}

        {/* Hotspots */}
        {hotspots.map((h, i) => (
          <g key={i}>
            <circle cx={h.cx} cy={h.cy} r="14" fill={COLOR[h.type]} opacity="0.15">
              <animate attributeName="r" values="14;26;14" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.25;0;0.25" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <circle cx={h.cx} cy={h.cy} r="4" fill={COLOR[h.type]} />
          </g>
        ))}
      </svg>

      {/* Corner brackets */}
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      <Bracket pos="br" />

      {/* Compass / coordinates */}
      <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div>LAT 19.7515° N</div>
        <div>LON 75.7139° E</div>
        <div className="mt-1 text-foreground/70">SECTOR · MH-CENTRAL</div>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
        <span className="live-dot" />
        <span>Live · 2.4s sync</span>
      </div>

      {/* Scale */}
      <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-[2px] w-16 bg-foreground/40" />
          <span>50 KM</span>
        </div>
      </div>

      {children}
    </div>
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
