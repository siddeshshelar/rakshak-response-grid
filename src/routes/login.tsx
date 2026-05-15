import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/ConsoleLayout";
import { Phone, ShieldCheck, Siren, Fingerprint, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — RAKSHAK" }] }),
  component: Login,
});

function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      <div className="hidden lg:flex relative flex-col justify-between p-10 border-r border-border radial-glow overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="relative">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <div className="leading-none">
              <div className="font-display text-sm font-semibold">RAKSHAK</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Maharashtra</div>
            </div>
          </Link>
        </div>
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.2em] text-emergency font-mono flex items-center gap-2">
            <span className="live-dot" /> Operational · Mantralaya Sync
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight leading-tight">
            Identity at the<br /> speed of emergency.
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md">
            Mobile-first sign-in built for moments of panic. No friction. Aadhaar verification only when claiming rewards.
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-3 max-w-md">
          {[
            { l: "Sign-in time", v: "< 8s" },
            { l: "OTP delivery", v: "98.4%" },
            { l: "Citizens", v: "412K" },
          ].map((s) => (
            <div key={s.l} className="panel p-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{s.l}</div>
              <div className="mt-1 font-display text-lg font-semibold">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <button className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-emergency text-emergency-foreground font-medium hover:opacity-90">
            <Siren className="h-4 w-4" /> Emergency Access · No signup
          </button>

          <div className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-mono">or sign in with</div>

          <div className="mt-6 panel p-6">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">Mobile OTP</div>
            <div className="mt-3 flex gap-2">
              <div className="flex items-center gap-2 px-3 rounded border border-border bg-surface text-sm">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />+91
              </div>
              <input className="flex-1 h-10 px-3 rounded bg-surface border border-border text-sm" placeholder="98765 43210" />
            </div>
            <button className="mt-4 w-full h-10 rounded bg-primary text-primary-foreground text-sm font-medium inline-flex items-center justify-center gap-1.5">
              Send OTP <ArrowRight className="h-4 w-4" />
            </button>
            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3 w-3 text-success" /> 256-bit secure</span>
              <span className="font-mono">PCI · ISO 27001</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <button className="panel p-3 hover:border-primary/40 transition-colors flex items-center gap-2 text-sm">
              <Fingerprint className="h-4 w-4" /> Biometric
            </button>
            <button className="panel p-3 hover:border-primary/40 transition-colors flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-saffron" /> Aadhaar OTP
            </button>
          </div>

          <p className="mt-6 text-[11px] text-muted-foreground text-center leading-relaxed">
            Aadhaar verification is only required to claim Good Samaritan rewards.<br />
            Reporting incidents and accessing emergency services never requires it.
          </p>
        </div>
      </div>
    </div>
  );
}
