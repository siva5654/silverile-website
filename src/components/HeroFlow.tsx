import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Image, Code, Brain, CheckCircle2,
  BookOpen, ListChecks, AlertTriangle, TestTube2,
  FileCheck, Layers, Zap, Cpu, Search,
  Sparkles, Shield, ChevronRight, GitCompare, Wand2,
  ArrowRight, Target
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ── Types ── */
interface OutputItem {
  icon: LucideIcon;
  text: string;
}

interface Metric {
  label: string;
  value: string;
  status: "ok" | "warn" | "error";
}

interface Transformation {
  id: string;
  color: string;
  number: string;
  tabLabel: string;
  input: {
    label: string;
    icon: LucideIcon;
    content: React.ReactNode;
  };
  process: string[];
  output: {
    label: string;
    items: OutputItem[];
    tags?: string[];
    metrics?: Metric[];
  };
}

const STATUS_COLORS: Record<string, string> = {
  ok: "var(--validation)",
  warn: "var(--feedback)",
  error: "var(--destructive)",
};

const TRANSFORMATIONS: Transformation[] = [
  {
    id: "text",
    color: "intent",
    number: "01",
    tabLabel: "Text to Story",
    input: {
      label: "Text to Story",
      icon: FileText,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
            <span className="inline-flex h-5 items-center rounded-md border border-border bg-muted/50 px-2 font-mono">SPRINT-24</span>
            <span>•</span>
            <span>Backlog Item</span>
          </div>
          <p className="font-mono text-xs leading-relaxed text-foreground/80 sm:text-sm">
            "Implement refund workflow — customer-initiated, auto-validate payment status, enforce 48hr SLA, notify via email + webhook."
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[9px] font-medium text-muted-foreground">Payments</span>
            <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[9px] font-medium text-muted-foreground">Priority: High</span>
            <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[9px] font-medium text-muted-foreground">Epic: Billing v2</span>
          </div>
        </div>
      ),
    },
    process: [
      "StoryCraft AI parsing business intent",
      "Cross-referencing sprint backlog & velocity",
      "Generating acceptance criteria & edge cases",
      "Linking dependencies across epics",
    ],
    output: {
      label: "Verified Requirement Artifact",
      items: [
        { icon: BookOpen, text: "User Story with scope & intent" },
        { icon: ListChecks, text: "Acceptance Criteria (7 defined)" },
        { icon: AlertTriangle, text: "Edge Cases (4 identified)" },
        { icon: TestTube2, text: "Test Scenarios (12 generated)" },
        { icon: Wand2, text: "Copilot Prompt (implementation-ready)" },
      ],
      tags: ["Intent-Verified", "Sprint-Aware", "Actionable"],
    },
  },
  {
    id: "image",
    color: "execution",
    number: "02",
    tabLabel: "UX to Story",
    input: {
      label: "UX to Story",
      icon: Image,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
            <span className="inline-flex h-5 items-center rounded-md border border-border bg-muted/50 px-2 font-mono">UX</span>
            <span>•</span>
            <span>Refund Flow Screen</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {/* Top bar */}
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1.5">
              <div className="h-2.5 w-3 rounded-sm bg-primary/30" />
              <div className="h-2 w-20 rounded bg-foreground/15" />
              <div className="ml-auto h-2 w-12 rounded bg-foreground/15" />
            </div>
            {/* 3-step flow */}
            <div className="flex gap-2">
              <div className="flex h-20 w-1/3 flex-col items-center justify-center rounded-lg border border-primary/25 bg-primary/5 gap-1.5">
                <div className="h-6 w-6 rounded-full border-2 border-primary/40 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-primary">1</span>
                </div>
                <span className="text-[9px] font-medium text-foreground/60">Select Order</span>
              </div>
              <div className="flex h-20 w-1/3 flex-col items-center justify-center rounded-lg border border-execution/25 bg-execution/5 gap-1.5">
                <Layers className="h-5 w-5 text-execution/60" />
                <span className="text-[9px] font-medium text-foreground/60">Choose Reason</span>
              </div>
              <div className="flex h-20 w-1/3 flex-col items-center justify-center rounded-lg border border-validation/25 bg-validation/5 gap-1.5">
                <CheckCircle2 className="h-5 w-5 text-validation/60" />
                <span className="text-[9px] font-medium text-foreground/60">Confirm</span>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex gap-2">
              <div className="h-8 flex-1 rounded-md border border-border bg-muted/60 flex items-center justify-center">
                <span className="text-[10px] font-medium text-muted-foreground">Cancel</span>
              </div>
              <div className="h-8 flex-1 rounded-md bg-primary flex items-center justify-center">
                <span className="text-[10px] font-semibold text-primary-foreground">Submit Refund</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    process: [
      "Extracting UI flow & state transitions",
      "Inferring API contracts from interactions",
      "Mapping to existing backlog stories",
      "Detecting missing validation & error states",
    ],
    output: {
      label: "Design-to-Requirement Intelligence",
      items: [
        { icon: FileCheck, text: "Functional Requirements (8 extracted)" },
        { icon: Cpu, text: "Backend Dependencies (3 flagged)" },
        { icon: Zap, text: "API Contracts (2 endpoints inferred)" },
        { icon: AlertTriangle, text: "Missing States (5 detected)" },
        { icon: Wand2, text: "Copilot Prompt (design-aligned)" },
      ],
      tags: ["Design-Verified", "SDLC-Linked"],
    },
  },
  {
    id: "code",
    color: "validation",
    number: "03",
    tabLabel: "Code to Story",
    input: {
      label: "Code to Story",
      icon: Code,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
            <span className="inline-flex h-5 items-center rounded-md border border-border bg-muted/50 px-2 font-mono">PR #847</span>
            <span>•</span>
            <span>feat/refund-workflow</span>
          </div>
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-foreground/80 sm:text-xs">
            <code>{`app.post('/refund', async (req, res) => {
  const { paymentId } = req.body;
  // TODO: input validation
  // TODO: error handling
  await stripe.refunds.create({
    payment_intent: paymentId
  });
  res.sendStatus(200);
});`}</code>
          </pre>
          <div className="mt-2 flex items-center gap-2 text-[9px] text-muted-foreground/50">
            <span className="text-validation">+47</span>
            <span className="text-destructive">-3</span>
            <span>•</span>
            <span>Linked to STORY-1024</span>
          </div>
        </div>
      ),
    },
    process: [
      "Reverse-engineering business intent from code",
      "Generating structured user stories from PRs",
      "Extracting acceptance criteria from behavior",
      "Building copilot prompts for fix & complete",
    ],
    output: {
      label: "Code-to-Story Intelligence",
      items: [
        { icon: BookOpen, text: "User Story (auto-generated from code)" },
        { icon: ListChecks, text: "Acceptance Criteria (5 inferred)" },
        { icon: TestTube2, text: "Unit Tests (6 generated)" },
        { icon: Layers, text: "Integration Tests (3 generated)" },
        { icon: Wand2, text: "Copilot Prompt (fix & complete)" },
      ],
      tags: ["Code-Derived", "Story-Ready"],
    },
  },
  {
    id: "relevance",
    color: "intent",
    number: "04",
    tabLabel: "Code Relevance",
    input: {
      label: "Code Relevance",
      icon: GitCompare,
      content: (
        <div className="rounded-xl border border-border bg-muted/30 p-5">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
            <span className="inline-flex h-5 items-center rounded-md border border-border bg-muted/50 px-2 font-mono">PR #847</span>
            <span className="mx-1">↔</span>
            <span className="inline-flex h-5 items-center rounded-md border border-intent/30 bg-intent-muted px-2 font-mono" style={{ color: "hsl(var(--intent))" }}>STORY-1024</span>
          </div>
          <div className="mb-3 rounded-lg border border-border bg-muted/40 p-3">
            <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed text-foreground/70 sm:text-[11px]">
              <code>{`app.post('/refund', async (req, res) => {
  const { paymentId } = req.body;
  await stripe.refunds.create({
    payment_intent: paymentId
  });
  res.sendStatus(200);
});`}</code>
            </pre>
          </div>
          <div className="rounded-lg border p-3" style={{ borderColor: "hsl(var(--intent) / 0.3)", background: "hsl(var(--intent) / 0.06)" }}>
            <div className="mb-1 text-[9px] font-bold uppercase tracking-wider" style={{ color: "hsl(var(--intent))" }}>Structured Story</div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              "As a customer, I can initiate a refund with auto-validation, 48hr SLA, and email + webhook notifications."
            </p>
            <div className="mt-2 flex gap-1.5">
              <span className="rounded-md px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: "hsl(var(--intent) / 0.12)", color: "hsl(var(--intent))" }}>7 Criteria</span>
              <span className="rounded-md px-1.5 py-0.5 text-[8px] font-semibold" style={{ background: "hsl(var(--intent) / 0.12)", color: "hsl(var(--intent))" }}>4 Edge Cases</span>
            </div>
          </div>
        </div>
      ),
    },
    process: [
      "Mapping code to story acceptance criteria",
      "Scoring intent-to-implementation alignment",
      "AST structural + LLM semantic analysis",
      "Generating story-paired test scripts",
    ],
    output: {
      label: "Story-Paired Verification",
      items: [
        { icon: GitCompare, text: "Intent Alignment Score: 91%" },
        { icon: Target, text: "Criteria Coverage: 5/7 matched" },
        { icon: Search, text: "Scope Creep Flags (2 detected)" },
        { icon: TestTube2, text: "Paired Unit Tests (9 generated)" },
        { icon: Wand2, text: "Copilot Prompt (story-aligned fix)" },
      ],
      metrics: [
        { label: "Alignment", value: "91%", status: "ok" },
        { label: "Matched", value: "5/7", status: "warn" },
        { label: "Gaps", value: "2", status: "error" },
      ],
      tags: ["Story-Paired", "Intent-Verified", "Actionable"],
    },
  },
];

/* ── Single Transformation Card ── */
const TransformationCard = ({ t }: { t: Transformation }) => {
  const activeColor = t.color;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-sm"
      style={{ boxShadow: `0 0 80px -20px hsl(var(--${activeColor}) / 0.18)` }}
    >
      <div className="h-1" style={{ background: `hsl(var(--${activeColor}))` }} />

      <div className="grid lg:grid-cols-[1fr_auto_1fr]">
        {/* INPUT */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-5 sm:p-6 lg:p-8"
        >
          <div className="mb-1 flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: `hsl(var(--${t.color}) / 0.15)` }}
            >
              <t.input.icon className="h-3.5 w-3.5" style={{ color: `hsl(var(--${t.color}))` }} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: `hsl(var(--${t.color}))` }}>
              Input
            </span>
          </div>
          <p className="mb-4 text-[11px] text-muted-foreground">What you provide</p>
          {t.input.content}
        </motion.div>

        {/* STORYCRAFT-AI CENTER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative flex flex-col items-center justify-center border-y border-border/40 px-6 py-8 lg:w-[200px] lg:border-x lg:border-y-0 lg:py-10"
        >
          {/* Radial glow background */}
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(circle at center, hsl(var(--${activeColor}) / 0.08), transparent 70%)` }}
          />

          {/* Animated orbital ring */}
          <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `hsl(var(--${activeColor}) / 0.2)` }}
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-dashed"
              style={{ borderColor: `hsl(var(--${activeColor}) / 0.12)` }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* Orbiting dots */}
            {[0, 120, 240].map((deg) => (
              <motion.div
                key={deg}
                className="absolute h-1.5 w-1.5 rounded-full"
                style={{
                  background: `hsl(var(--${activeColor}))`,
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 36}px - 3px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 36}px - 3px)`,
                }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: deg / 360 }}
              />
            ))}
            {/* Center icon */}
            <Sparkles className="h-5 w-5" style={{ color: `hsl(var(--${activeColor}))` }} />
          </div>

          {/* Label */}
          <span className="relative text-center text-sm font-extrabold tracking-[0.08em] text-foreground">
            StoryCraft-AI
          </span>

          {/* Flow arrows */}
          <div className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronRight className="h-4 w-4" style={{ color: `hsl(var(--${activeColor}) / 0.4)` }} />
            </motion.div>
          </div>
          <div className="absolute right-0 top-1/2 hidden translate-x-1/2 -translate-y-1/2 lg:block">
            <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronRight className="h-4 w-4" style={{ color: `hsl(var(--${activeColor}) / 0.4)` }} />
            </motion.div>
          </div>
        </motion.div>

        {/* OUTPUT */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-5 sm:p-6 lg:p-8"
        >
          <div className="mb-1 flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-md"
              style={{ background: `hsl(var(--${activeColor}) / 0.15)` }}
            >
              <Shield className="h-3.5 w-3.5" style={{ color: `hsl(var(--${activeColor}))` }} />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: `hsl(var(--${activeColor}))` }}>
              Output
            </span>
          </div>
          <p className="mb-4 text-[11px] text-muted-foreground">What Silverile produces</p>

          <div
            className="rounded-xl border p-4"
            style={{ borderColor: `hsl(var(--${activeColor}) / 0.25)` }}
          >
            <div className="mb-3 flex items-center gap-2">
              <span
                className="text-[11px] font-bold uppercase tracking-[0.08em] sm:text-xs"
                style={{ color: `hsl(var(--${activeColor}))` }}
              >
                {t.output.label}
              </span>
            </div>

            {/* Metrics */}
            {t.output.metrics && (
              <div className="mb-3 grid grid-cols-3 gap-1.5">
                {t.output.metrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-border bg-muted/30 px-2 py-2 text-center">
                    <div className="text-base font-bold sm:text-lg" style={{ color: `hsl(${STATUS_COLORS[m.status]})` }}>
                      {m.value}
                    </div>
                    <div className="text-[9px] text-muted-foreground">{m.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Items */}
            <div className="flex flex-col gap-2">
              {t.output.items.map((item, ii) => {
                const OIcon = item.icon;
                return (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: ii * 0.04 }}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                    style={{ background: `hsl(var(--${activeColor}) / 0.06)` }}
                  >
                    <OIcon className="h-3.5 w-3.5 shrink-0" style={{ color: `hsl(var(--${activeColor}) / 0.7)` }} />
                    <span className="text-[11px] text-muted-foreground sm:text-xs">{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Tags */}
            {t.output.tags && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {t.output.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold"
                    style={{
                      background: `hsl(var(--${activeColor}) / 0.1)`,
                      color: `hsl(var(--${activeColor}))`,
                    }}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ── Step Tabs ── */
const StepTabs = ({
  steps,
  active,
  onSelect,
}: {
  steps: Transformation[];
  active: number;
  onSelect: (i: number) => void;
}) => (
  <div className="flex flex-col items-center gap-4">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {steps.map((s, i) => {
        const Icon = s.input.icon;
        const isActive = i === active;
        const isPast = i < active;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(i)}
            className="group relative flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-xs"
            style={{
              borderColor: isActive
                ? `hsl(var(--${s.color}))`
                : isPast
                ? `hsl(var(--${s.color}) / 0.4)`
                : "hsl(var(--border))",
              background: isActive
                ? `hsl(var(--${s.color}) / 0.08)`
                : "transparent",
              boxShadow: isActive
                ? `0 0 20px -4px hsl(var(--${s.color}) / 0.25)`
                : "none",
              color: isActive
                ? `hsl(var(--${s.color}))`
                : isPast
                ? `hsl(var(--${s.color}) / 0.7)`
                : "hsl(var(--muted-foreground) / 0.6)",
            }}
          >
            <span className="font-mono text-[10px] opacity-60">{s.number}</span>
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{s.tabLabel}</span>
          </button>
        );
      })}
    </div>

    {/* Progress bar */}
    <div className="flex w-full max-w-xs items-center gap-0.5 rounded-full bg-muted/30 p-0.5">
      {steps.map((s, i) => (
        <motion.div
          key={s.id}
          className="h-1 flex-1 rounded-full"
          animate={{
            background: i <= active ? `hsl(var(--${s.color}))` : "hsl(var(--muted-foreground) / 0.1)",
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  </div>
);

/* ── Main Hero ── */
const HeroFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentT = TRANSFORMATIONS[activeStep];

  const goNext = () => setActiveStep((p) => Math.min(p + 1, TRANSFORMATIONS.length - 1));
  const goPrev = () => setActiveStep((p) => Math.max(p - 1, 0));

  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center lg:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Brain className="h-3.5 w-3.5 text-primary" />
            StoryCraft-AI : Intelligence Engine
          </div>
          <h2 className="mx-auto whitespace-nowrap text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl">
            <span className="inline-block rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 font-black text-primary shadow-sm">Build</span> what was <span className="text-primary font-black">intended</span>. <span className="inline-block rounded-xl border border-primary/30 bg-primary/10 px-3 py-1 font-black text-primary shadow-sm">Verify</span> what was <span className="text-primary font-black">built</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
            Text. Design. Code.{" "}
            <span className="font-semibold text-foreground">Silverile understands it all.</span>
          </p>
        </motion.div>

        {/* Step Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-10"
        >
          <StepTabs steps={TRANSFORMATIONS} active={activeStep} onSelect={setActiveStep} />
        </motion.div>

        {/* Card */}
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentT.id}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <TransformationCard t={currentT} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={activeStep === 0}
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="text-xs font-mono text-muted-foreground/50">
              {activeStep + 1} / {TRANSFORMATIONS.length}
            </span>

            <button
              onClick={goNext}
              disabled={activeStep === TRANSFORMATIONS.length - 1}
              className="flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              style={{
                borderColor: activeStep < TRANSFORMATIONS.length - 1
                  ? `hsl(var(--${TRANSFORMATIONS[Math.min(activeStep + 1, TRANSFORMATIONS.length - 1)].color}) / 0.4)`
                  : "hsl(var(--border))",
                color: activeStep < TRANSFORMATIONS.length - 1
                  ? `hsl(var(--${TRANSFORMATIONS[Math.min(activeStep + 1, TRANSFORMATIONS.length - 1)].color}))`
                  : "hsl(var(--muted-foreground))",
              }}
            >
              <span className="hidden sm:inline">Next</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center lg:mt-20"
        >
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
            Traditional tools{" "}
            <span className="font-semibold text-foreground">track what you build</span>. Silverile{" "}
            <span className="text-primary font-bold">
              verifies that what you ship matches what you intended
            </span>
            — closing the gap between requirements and reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroFlow;
