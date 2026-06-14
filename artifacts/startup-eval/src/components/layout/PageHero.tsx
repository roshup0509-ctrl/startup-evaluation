import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export type HeroAccent = "emerald" | "violet" | "amber" | "rose" | "blue" | "cyan" | "slate" | "indigo";

const ACCENT: Record<HeroAccent, { mesh: string; chip: string; iconBg: string; iconText: string; ring: string }> = {
  emerald: { mesh: "bg-mesh-emerald", chip: "bg-emerald-100 text-emerald-700 border-emerald-200", iconBg: "bg-emerald-500", iconText: "text-white", ring: "ring-emerald-200/60" },
  violet: { mesh: "bg-mesh-violet", chip: "bg-violet-100 text-violet-700 border-violet-200", iconBg: "bg-violet-500", iconText: "text-white", ring: "ring-violet-200/60" },
  amber: { mesh: "bg-mesh-amber", chip: "bg-amber-100 text-amber-800 border-amber-200", iconBg: "bg-amber-500", iconText: "text-white", ring: "ring-amber-200/60" },
  rose: { mesh: "bg-mesh-rose", chip: "bg-rose-100 text-rose-700 border-rose-200", iconBg: "bg-rose-500", iconText: "text-white", ring: "ring-rose-200/60" },
  blue: { mesh: "bg-mesh-blue", chip: "bg-blue-100 text-blue-700 border-blue-200", iconBg: "bg-blue-500", iconText: "text-white", ring: "ring-blue-200/60" },
  cyan: { mesh: "bg-mesh-cyan", chip: "bg-cyan-100 text-cyan-700 border-cyan-200", iconBg: "bg-cyan-500", iconText: "text-white", ring: "ring-cyan-200/60" },
  slate: { mesh: "bg-mesh-slate", chip: "bg-slate-200 text-slate-700 border-slate-300", iconBg: "bg-slate-600", iconText: "text-white", ring: "ring-slate-300/60" },
  indigo: { mesh: "bg-mesh-blue", chip: "bg-indigo-100 text-indigo-700 border-indigo-200", iconBg: "bg-indigo-500", iconText: "text-white", ring: "ring-indigo-200/60" },
};

interface PageHeroProps {
  accent: HeroAccent;
  icon: LucideIcon;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: ReactNode;
  actions?: ReactNode;
  meta?: ReactNode;
}

export default function PageHero({ accent, icon: Icon, eyebrow, title, subtitle, breadcrumb, actions, meta }: PageHeroProps) {
  const a = ACCENT[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl border border-border ${a.mesh} p-6 md:p-8`}
    >
      {/* decorative blob */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/30 blur-3xl blob-float" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-white/20 blur-3xl blob-float" style={{ animationDelay: "2s" }} />

      <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-start gap-4 min-w-0">
          <div className={`h-14 w-14 rounded-2xl ${a.iconBg} ${a.iconText} flex items-center justify-center shadow-lg ring-4 ${a.ring} flex-shrink-0`}>
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0">
            {breadcrumb && <div className="text-xs text-muted-foreground mb-2">{breadcrumb}</div>}
            {eyebrow && (
              <span className={`inline-block text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full border ${a.chip} mb-2`}>
                {eyebrow}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 truncate">{title}</h1>
            {subtitle && <p className="text-sm md:text-base text-slate-700/80 mt-1 max-w-2xl">{subtitle}</p>}
            {meta && <div className="mt-3 flex flex-wrap gap-2">{meta}</div>}
          </div>
        </div>
        {actions && <div className="flex flex-wrap gap-2 md:flex-shrink-0">{actions}</div>}
      </div>
    </motion.div>
  );
}
