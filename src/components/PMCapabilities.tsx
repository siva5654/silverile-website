import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Wand2,
  AlertTriangle,
  BarChart3,
  Workflow,
  Bug,
  Globe,
  Zap,
  ArrowRight,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: Wand2,
    title: "StoryCraft-AI",
    subtitle: "Intent → Structured Work in Seconds",
    color: "intent",
    tagline: "Turn rough ideas into structured, acceptance-ready user stories",
    bullets: [
      "Schema-validated output (not AI fluff)",
      "Acceptance criteria included",
      "Test-case ready",
      "Human-in-the-loop verification",
    ],
    differentiator: "Why it matters",
    silverile: "Reduces story drafting time by 80% while improving clarity across teams.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Detection",
    subtitle: "Know Before It Breaks",
    color: "feedback",
    tagline: "Silverile continuously analyzes velocity, scope drift, dependencies, and blocker patterns.",
    bullets: [
      "Sprint slippage early signals",
      "Dependency bottleneck detection",
      "Confidence scoring",
      "Alerting before failure, not after",
    ],
    differentiator: "Why it matters",
    silverile: "Prevents surprise misses. Protects delivery commitments.",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboards",
    subtitle: "Insights That Drive Action",
    color: "execution",
    tagline: "Not just charts — decision intelligence.",
    bullets: [
      "Predict sprint outcomes",
      "Forecast release readiness",
      "Trend defect density",
      "Signal priority misalignment",
    ],
    differentiator: "Why it matters",
    silverile: "Executives see reality. Teams see what to fix next.",
  },
  {
    icon: Workflow,
    title: "Workflow AI",
    subtitle: "Your Sprint Runs Itself",
    color: "validation",
    tagline: "Silverile acts as an agentic PM assistant.",
    bullets: [
      "Auto-suggest task sequencing",
      "Surface blocked stories",
      "Recommend priority shifts",
      "Highlight stalled work",
    ],
    differentiator: "Why it matters",
    silverile: "Removes coordination tax without removing human control.",
  },
  {
    icon: Bug,
    title: "Defect Intelligence",
    subtitle: "Quality Patterns, Not Just Bug Lists",
    color: "destructive",
    tagline: "Move from reactive bug tracking to systemic quality analysis.",
    bullets: [
      "Detect recurring defect clusters",
      "Link bugs to story patterns",
      "Identify risky modules",
      "Predict regression risk",
    ],
    differentiator: "Why it matters",
    silverile: "Improves quality before production — not after escalation.",
  },
];

const CapabilityCard = ({
  cap,
  index,
  isInView,
  isRevealed,
}: {
  cap: (typeof CAPABILITIES)[0];
  index: number;
  isInView: boolean;
  isRevealed: boolean;
}) => {
  const Icon = cap.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-sm transition-all duration-300"
      style={{
        minHeight: 340,
        borderColor: isRevealed ? `hsl(var(--${cap.color}) / 0.5)` : undefined,
        boxShadow: isRevealed ? `0 0 30px -8px hsl(var(--${cap.color}) / 0.25)` : "none",
      }}
    >
      {/* Default State */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex h-full flex-col items-center justify-center p-6 text-center"
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: `hsl(var(--${cap.color}) / 0.12)` }}
            >
              <Icon className="h-6 w-6" style={{ color: `hsl(var(--${cap.color}))` }} />
            </div>
            <h3 className="text-base font-bold text-foreground">{cap.title}</h3>
            <p
              className="mt-1 text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: `hsl(var(--${cap.color}) / 0.7)` }}
            >
              {cap.subtitle}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed State */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col justify-start gap-3 overflow-y-auto p-4"
            style={{
              background: `linear-gradient(135deg, hsl(var(--${cap.color}) / 0.12), hsl(var(--${cap.color}) / 0.05))`,
              borderColor: `hsl(var(--${cap.color}) / 0.3)`,
              boxShadow: `0 0 30px -8px hsl(var(--${cap.color}) / 0.2)`,
            }}
          >
            <div className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 shrink-0" style={{ color: `hsl(var(--${cap.color}))` }} />
              <span className="text-sm font-bold text-foreground">{cap.title}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">{cap.tagline}</p>
            <ul className="flex flex-col gap-1.5">
              {cap.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[11px] text-muted-foreground sm:text-xs">
                  <Zap
                    className="mt-0.5 h-3 w-3 shrink-0"
                    style={{ color: `hsl(var(--${cap.color}) / 0.6)` }}
                  />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto rounded-lg border border-border/50 bg-background/60 p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                <ArrowRight className="h-2.5 w-2.5" />
                {cap.differentiator}
              </div>
              <p
                className="mt-1 text-[11px] font-semibold leading-relaxed"
                style={{ color: `hsl(var(--${cap.color}))` }}
              >
                {cap.silverile}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PMCapabilities = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // Track how many cards have been revealed so far (0 = none, 5 = all)
  const [revealedCount, setRevealedCount] = useState(0);
  const isPaused = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = (current: number) => {
    const totalCards = CAPABILITIES.length;
    if (current < totalCards) {
      // Reveal next card after 2s
      timeoutRef.current = setTimeout(() => {
        if (isPaused.current) return;
        const next = current + 1;
        setRevealedCount(next);
        scheduleNext(next);
      }, 2000);
    } else {
      // All cards revealed — hold for 5s, then reset
      timeoutRef.current = setTimeout(() => {
        if (isPaused.current) return;
        setRevealedCount(0);
        // Small gap before restarting
        timeoutRef.current = setTimeout(() => {
          if (isPaused.current) return;
          setRevealedCount(1);
          scheduleNext(1);
        }, 500);
      }, 5000);
    }
  };

  useEffect(() => {
    if (!isInView) return;
    // Show all cards in default state for 2s before starting animation
    timeoutRef.current = setTimeout(() => {
      setRevealedCount(1);
      scheduleNext(1);
    }, 2000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  const handleHover = () => {
    isPaused.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleUnhover = () => {
    isPaused.current = false;
    // Resume from current state
    scheduleNext(revealedCount);
  };

  return (
    <section ref={ref} className="relative overflow-hidden py-10 lg:py-14">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">

        {/* Cards Grid */}
        <div
          className="mx-auto grid max-w-7xl gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          onMouseEnter={handleHover}
          onMouseLeave={handleUnhover}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} cap={cap} index={i} isInView={isInView} isRevealed={i < revealedCount} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PMCapabilities;
