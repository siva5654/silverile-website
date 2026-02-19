import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Network,
  LayoutDashboard,
  Clock,
  Kanban,
  ChevronRight,
  BarChart3,
  GitBranch,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Timer,
  ArrowUpDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MontyView {
  id: string;
  icon: LucideIcon;
  color: string;
  title: string;
  subtitle: string;
  description: string;
  previewWidgets: React.ReactNode;
}

/* ── Miniature dashboard widgets for each view ── */

const OrgPreview = () => (
  <div className="flex flex-col gap-3 p-4">
    {/* Hierarchy tree */}
    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Organization Hierarchy</div>
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-1.5">
        <span className="text-[10px] font-bold text-primary">Enterprise</span>
      </div>
      <div className="h-3 w-px bg-border" />
      <div className="flex gap-3">
        {["Initiatives", "Programs"].map((label) => (
          <div key={label} className="rounded-md border border-execution/25 bg-execution/8 px-3 py-1">
            <span className="text-[9px] font-semibold text-execution">{label}</span>
          </div>
        ))}
      </div>
      <div className="h-3 w-px bg-border" />
      <div className="flex flex-wrap justify-center gap-2">
        {["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"].map((p) => (
          <div key={p} className="rounded-md border border-border bg-muted/50 px-2.5 py-1">
            <span className="text-[8px] font-medium text-foreground/70">{p}</span>
          </div>
        ))}
      </div>
    </div>
    {/* Metrics row */}
    <div className="mt-2 grid grid-cols-3 gap-2">
      {[
        { label: "Projects", value: "12", icon: Layers },
        { label: "Epics", value: "34", icon: GitBranch },
        { label: "Stories", value: "248", icon: Target },
      ].map((m) => (
        <div key={m.label} className="rounded-lg border border-border bg-card/80 p-2 text-center">
          <m.icon className="mx-auto mb-1 h-3 w-3 text-primary/50" />
          <div className="text-sm font-bold text-foreground">{m.value}</div>
          <div className="text-[8px] text-muted-foreground">{m.label}</div>
        </div>
      ))}
    </div>
  </div>
);

const ScrumPreview = () => (
  <div className="flex flex-col gap-3 p-4">
    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Sprint Board</div>
    <div className="grid grid-cols-3 gap-2">
      {[
        { title: "To Do", count: 5, color: "muted-foreground" },
        { title: "In Progress", count: 3, color: "execution" },
        { title: "Done", count: 8, color: "validation" },
      ].map((col) => (
        <div key={col.title} className="rounded-lg border border-border bg-card/60 p-2">
          <div className="mb-2 flex items-center justify-between">
            <span className={`text-[9px] font-bold text-${col.color}`}>{col.title}</span>
            <span className="rounded-full bg-muted px-1.5 py-0.5 text-[8px] font-bold text-muted-foreground">{col.count}</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {Array.from({ length: Math.min(col.count, 3) }).map((_, i) => (
              <div key={i} className="rounded-md border border-border bg-muted/40 p-1.5">
                <div className="h-1.5 w-full rounded bg-foreground/10 mb-1" />
                <div className="h-1.5 w-2/3 rounded bg-foreground/8" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {/* Velocity bar */}
    <div className="rounded-lg border border-border bg-card/80 p-2">
      <div className="mb-1 flex justify-between text-[8px] text-muted-foreground">
        <span>Sprint Velocity</span>
        <span className="font-bold text-validation">42 pts</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div className="h-2 rounded-full bg-validation/60" style={{ width: "78%" }} />
      </div>
    </div>
  </div>
);

const TimelinePreview = () => (
  <div className="flex flex-col gap-3 p-4">
    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Project Timeline</div>
    <div className="flex flex-col gap-2">
      {[
        { label: "Discovery", width: "40%", start: "0%", color: "intent" },
        { label: "Design", width: "30%", start: "25%", color: "execution" },
        { label: "Development", width: "50%", start: "40%", color: "validation" },
        { label: "Testing", width: "25%", start: "75%", color: "feedback" },
      ].map((bar) => (
        <div key={bar.label} className="flex items-center gap-2">
          <span className="w-16 text-right text-[9px] font-medium text-muted-foreground shrink-0">{bar.label}</span>
          <div className="relative h-5 flex-1 rounded bg-muted/40">
            <div
              className="absolute top-0.5 bottom-0.5 rounded"
              style={{
                left: bar.start,
                width: bar.width,
                background: `hsl(var(--${bar.color}) / 0.6)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
    {/* Date markers */}
    <div className="flex justify-between text-[8px] text-muted-foreground/50 px-[4.5rem]">
      <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span>
    </div>
    <div className="mt-1 grid grid-cols-2 gap-2">
      {[
        { label: "On Track", value: "3", icon: CheckCircle2, color: "validation" },
        { label: "At Risk", value: "1", icon: AlertTriangle, color: "feedback" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-2 rounded-lg border border-border bg-card/80 p-2">
          <s.icon className="h-3 w-3" style={{ color: `hsl(var(--${s.color}))` }} />
          <div>
            <div className="text-xs font-bold text-foreground">{s.value}</div>
            <div className="text-[8px] text-muted-foreground">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AgilePreview = () => (
  <div className="flex flex-col gap-3 p-4">
    <div className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1">Agile Metrics</div>
    {/* Burndown mini chart */}
    <div className="rounded-lg border border-border bg-card/80 p-3">
      <div className="mb-2 flex justify-between text-[9px]">
        <span className="font-bold text-foreground">Burn Down</span>
        <span className="text-muted-foreground">Sprint 24</span>
      </div>
      <svg viewBox="0 0 200 60" className="w-full h-12">
        <line x1="0" y1="0" x2="200" y2="55" stroke="hsl(var(--muted-foreground) / 0.2)" strokeWidth="1" strokeDasharray="4" />
        <polyline
          points="0,5 30,12 60,18 90,22 120,30 150,38 180,48 200,52"
          fill="none"
          stroke="hsl(var(--intent))"
          strokeWidth="2"
        />
        <polyline
          points="0,5 30,8 60,20 90,28 120,32 150,45 180,50 200,55"
          fill="none"
          stroke="hsl(var(--validation) / 0.4)"
          strokeWidth="1.5"
          strokeDasharray="3"
        />
      </svg>
    </div>
    {/* KPI cards */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Velocity", value: "42", icon: TrendingUp, color: "intent" },
        { label: "Cycle Time", value: "3.2d", icon: Timer, color: "execution" },
        { label: "WIP", value: "6", icon: ArrowUpDown, color: "feedback" },
      ].map((kpi) => (
        <div key={kpi.label} className="rounded-lg border border-border bg-card/80 p-2 text-center">
          <kpi.icon className="mx-auto mb-1 h-3 w-3" style={{ color: `hsl(var(--${kpi.color}))` }} />
          <div className="text-sm font-bold text-foreground">{kpi.value}</div>
          <div className="text-[8px] text-muted-foreground">{kpi.label}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── View data ── */
const VIEWS: MontyView[] = [
  {
    id: "organization",
    icon: Network,
    color: "intent",
    title: "Organization View",
    subtitle: "Seamless Project Switching",
    description:
      "A 360-degree view of organizational projects, allowing you to gauge the health of Initiatives, Epics, Branches, Projects, and Stories relevant to your clearance level and position in the organizational hierarchy. Gain a comprehensive understanding of various projects or cross-functional projects within a branch, the status of branches within an epic, or the status of epics within initiatives — all within a single interface.",
    previewWidgets: <OrgPreview />,
  },
  {
    id: "scrum",
    icon: LayoutDashboard,
    color: "execution",
    title: "Scrum View",
    subtitle: "Sprint-Centric Management",
    description:
      "A dedicated view for Scrum masters and agile teams, offering real-time sprint boards, backlog management, and ceremony tracking. Visualize your sprint progress, manage story points, and track team velocity across sprints — all with intelligent insights powered by StoryCraft AI.",
    previewWidgets: <ScrumPreview />,
  },
  {
    id: "timeline",
    icon: Clock,
    color: "validation",
    title: "Time Line View",
    subtitle: "Temporal Project Intelligence",
    description:
      "A Gantt-style timeline providing temporal awareness across your entire project portfolio. Track milestones, dependencies, and critical paths with intelligent alerts for schedule risks. Understand how time flows through your organization — from initiative deadlines down to individual story completion.",
    previewWidgets: <TimelinePreview />,
  },
  {
    id: "agile",
    icon: Kanban,
    color: "feedback",
    title: "Agile View",
    subtitle: "Metrics-Driven Delivery",
    description:
      "A comprehensive agile dashboard with burn-down charts, velocity tracking, cycle time analysis, and WIP limits. Monitor team health, predict sprint outcomes, and surface bottlenecks before they impact delivery — all driven by ML-aided insights.",
    previewWidgets: <AgilePreview />,
  },
];

const MontyViews = () => {
  const [activeId, setActiveId] = useState(VIEWS[0].id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const activeView = VIEWS.find((v) => v.id === activeId)!;

  return (
    <section ref={ref} className="relative overflow-hidden py-12 lg:py-16">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Monty's Views
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Monty's Views
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed md:text-lg">
            Powerful tools providing multi-dimensional views for project management. Each view offers a unique vantage point, empowering users to gain insights into project status, health, and progress based on roles and responsibilities within the organization.
          </p>
        </motion.div>

        {/* Content: Left accordion + Right preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.2fr] lg:gap-10"
        >
          {/* Left — Accordion list */}
          <div className="flex flex-col">
            {VIEWS.map((view) => {
              const isActive = view.id === activeId;
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveId(view.id)}
                  className={`group relative text-left transition-all duration-300 ${
                    isActive ? "py-6" : "py-4"
                  }`}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full transition-all duration-300"
                    style={{
                      background: isActive ? `hsl(var(--${view.color}))` : "transparent",
                    }}
                  />

                  <div className="pl-5">
                    {/* Title row */}
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className="h-5 w-5 transition-colors duration-300"
                        style={{
                          color: isActive ? `hsl(var(--${view.color}))` : "hsl(var(--muted-foreground) / 0.5)",
                        }}
                      />
                      <span
                        className={`text-base font-bold transition-colors duration-300 ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                        style={isActive ? { color: `hsl(var(--${view.color}))` } : {}}
                      >
                        {view.title}
                      </span>
                      <ChevronRight
                        className={`ml-auto h-4 w-4 transition-all duration-300 ${
                          isActive ? "rotate-90 opacity-100" : "opacity-0 group-hover:opacity-50"
                        }`}
                        style={isActive ? { color: `hsl(var(--${view.color}))` } : {}}
                      />
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <h3 className="mt-2 text-lg font-bold text-foreground">{view.subtitle}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {view.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom border */}
                  {!isActive && <div className="absolute bottom-0 left-5 right-0 h-px bg-border" />}
                </button>
              );
            })}
          </div>

          {/* Right — Preview card */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeView.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm"
                style={{
                  boxShadow: `0 8px 40px -12px hsl(var(--${activeView.color}) / 0.2)`,
                }}
              >
                {/* Title bar */}
                <div
                  className="flex items-center gap-2 border-b border-border px-4 py-2.5"
                  style={{ background: `hsl(var(--${activeView.color}) / 0.06)` }}
                >
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-feedback/40" />
                    <div className="h-2.5 w-2.5 rounded-full bg-validation/40" />
                  </div>
                  <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {activeView.title}
                  </span>
                </div>

                {/* Preview content */}
                {activeView.previewWidgets}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MontyViews;
