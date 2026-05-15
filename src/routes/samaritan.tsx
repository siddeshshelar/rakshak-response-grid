import { createFileRoute } from "@tanstack/react-router";
import { ConsoleLayout, StatCard } from "@/components/ConsoleLayout";
import { Award, ShieldCheck, Trophy, Upload, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/samaritan")({
  head: () => ({ meta: [{ title: "Good Samaritan Reward System — RAKSHAK" }] }),
  component: Samaritan,
});

const LEADERS = [
  { name: "Vikram Patil", city: "Pune", rescues: 47, score: 9820, badge: "Platinum" },
  { name: "Anjali Deshmukh", city: "Nagpur", rescues: 38, score: 8410, badge: "Platinum" },
  { name: "Rohit Kulkarni", city: "Mumbai", rescues: 32, score: 7390, badge: "Gold" },
  { name: "Sneha Joshi", city: "Aurangabad", rescues: 29, score: 6820, badge: "Gold" },
  { name: "Amit Shinde", city: "Kolhapur", rescues: 24, score: 5940, badge: "Gold" },
  { name: "Priya Bhosale", city: "Nashik", rescues: 21, score: 5210, badge: "Silver" },
];

function Samaritan() {
  return (
    <ConsoleLayout
      title="Good Samaritan Reward System"
      subtitle="Verified citizen rescue participation · digital certificates · civic reputation"
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <StatCard label="Verified Citizens" value="412,890" intent="success" />
        <StatCard label="Rescues This Month" value="1,847" />
        <StatCard label="Lives Saved YTD" value="11,204" intent="success" />
        <StatCard label="₹ Rewards Disbursed" value="3.4 Cr" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="panel p-6 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-saffron font-mono">Become a Rakshak</div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  Every report saves a life. Get recognised for it.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Upload rescue proof with GPS + timestamp validation. Earn verified badges,
                  digital certificates from the Government of Maharashtra, and monetary rewards.
                </p>
                <button className="mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-saffron/90 text-background font-medium text-sm">
                  <Upload className="h-4 w-4" /> Submit Rescue Report
                </button>
              </div>
              <div className="panel-elevated p-5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Your Reputation</div>
                <div className="mt-2 flex items-end gap-2">
                  <div className="font-display text-4xl font-semibold">7,420</div>
                  <div className="text-xs text-success mb-1.5">+180 this week</div>
                </div>
                <div className="mt-3 h-1.5 bg-accent rounded">
                  <div className="h-full rounded bg-gradient-to-r from-primary to-saffron" style={{ width: "74%" }} />
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground font-mono flex justify-between">
                  <span>Gold Tier</span><span>2,580 to Platinum</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  {[
                    { l: "Rescues", v: "12" },
                    { l: "Verified", v: "11" },
                    { l: "Pending", v: "1" },
                  ].map((s) => (
                    <div key={s.l} className="border border-border rounded p-2">
                      <div className="text-lg font-display font-semibold">{s.v}</div>
                      <div className="text-[10px] text-muted-foreground font-mono uppercase">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <Trophy className="h-4 w-4 text-saffron" />
              <span className="font-display text-sm font-medium">Maharashtra Top Rescuers · This Quarter</span>
            </div>
            <div className="divide-y divide-border">
              {LEADERS.map((l, i) => (
                <div key={l.name} className="px-4 py-3 grid grid-cols-12 gap-3 items-center hover:bg-accent/40">
                  <div className="col-span-1 font-display text-lg text-muted-foreground">#{i + 1}</div>
                  <div className="col-span-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-saffron grid place-items-center text-xs font-semibold">
                      {l.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{l.name}</div>
                      <div className="text-[11px] text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {l.city}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-xs"><span className="font-mono">{l.rescues}</span> rescues</div>
                  <div className="col-span-3 font-mono text-sm">{l.score.toLocaleString()} pts</div>
                  <div className="col-span-2">
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                      l.badge === "Platinum" ? "bg-saffron/20 text-saffron border-saffron/40" :
                      l.badge === "Gold" ? "bg-warning/20 text-warning border-warning/40" :
                      "bg-muted-foreground/20 text-muted-foreground border-border"
                    }`}>{l.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel p-4">
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /><span className="text-sm font-medium">Verification Pipeline</span></div>
            <div className="mt-3 space-y-3">
              {[
                { t: "GPS coordinate match", c: "success" },
                { t: "Timestamp ↔ incident sync", c: "success" },
                { t: "Photo / video proof OCR", c: "success" },
                { t: "Aadhaar e-KYC link", c: "warning" },
                { t: "RTO officer co-sign", c: "muted" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    s.c === "success" ? "bg-success" : s.c === "warning" ? "bg-warning" : "bg-muted-foreground"
                  }`} />
                  <span className="text-xs">{s.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="panel p-4">
            <div className="flex items-center gap-2"><Award className="h-4 w-4 text-saffron" /><span className="text-sm font-medium">Reward Tiers</span></div>
            <div className="mt-3 space-y-2 text-xs">
              <Tier name="Platinum" range="9,000+ pts" reward="₹25,000 + State citation" />
              <Tier name="Gold" range="5,000–8,999" reward="₹10,000 + RTO certificate" />
              <Tier name="Silver" range="2,000–4,999" reward="₹3,000 + digital badge" />
              <Tier name="Bronze" range="500–1,999" reward="Public acknowledgement" />
            </div>
          </div>
          <div className="panel p-4">
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /><span className="text-sm font-medium">Recent Verifications</span></div>
            <div className="mt-3 space-y-2 text-xs">
              {[
                { n: "S. Joshi", a: "Mumbai-Pune Expy", t: "12m ago" },
                { n: "R. Patil", a: "Nashik NH-50", t: "47m ago" },
                { n: "A. Khan", a: "Aurangabad city", t: "1h ago" },
              ].map((v, i) => (
                <div key={i} className="flex justify-between border-b border-border pb-1.5 last:border-0">
                  <span><span className="font-medium">{v.n}</span> · {v.a}</span>
                  <span className="text-muted-foreground font-mono">{v.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}

function Tier({ name, range, reward }: { name: string; range: string; reward: string }) {
  return (
    <div className="border-l-2 border-saffron/60 pl-3 py-1">
      <div className="flex justify-between">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-muted-foreground">{range}</span>
      </div>
      <div className="text-[11px] text-muted-foreground">{reward}</div>
    </div>
  );
}
