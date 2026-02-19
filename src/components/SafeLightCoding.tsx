import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Lightbulb,
  EyeOff,
  ShieldCheck,
  HelpCircle,
  Users,
} from "lucide-react";

const PRINCIPLES = [
  {
    icon: Lightbulb,
    title: "Intent First",
    short: "Why before what",
    detail:
      "Every action begins with understanding. We never assume — we ask, clarify, and align before a single line is written.",
  },
  {
    icon: EyeOff,
    title: "Read-Only Default",
    short: "Propose, never impose",
    detail:
      "AI outputs are suggestions, not decisions. Nothing ships without human approval. You stay in control.",
  },
  {
    icon: ShieldCheck,
    title: "Deterministic Guards",
    short: "Proof over probability",
    detail:
      "Every output passes through schemas and contracts. If it can't be validated, it doesn't leave the system.",
  },
  {
    icon: HelpCircle,
    title: "Explicit Ambiguity",
    short: "Doubt is signal",
    detail:
      "We surface uncertainty instead of hiding it. \"I'm not sure\" is a first-class answer — not a failure.",
  },
  {
    icon: Users,
    title: "Human Ownership",
    short: "You decide, always",
    detail:
      "AI accelerates thinking, not accountability. Risk assessment, final calls, and ownership remain human.",
  },
];

const TENETS = [
  "AI should illuminate, not operate.",
  "Amplify judgment, never replace it.",
  "Ship with confidence, not just speed.",
  "Transparency is non-negotiable.",
];

const PrincipleCard = ({
  principle,
  index,
  isInView,
}: {
  principle: (typeof PRINCIPLES)[0];
  index: number;
  isInView: boolean;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = principle.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border"
      style={{ minHeight: 280 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Base layer */}
      <div className="flex h-full flex-col items-center justify-center p-7 text-center bg-card/80 backdrop-blur-sm">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/60">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">{principle.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{principle.short}</p>
      </div>

      {/* Flashlight-revealed layer */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl p-7 text-center transition-opacity duration-300"
        style={{
          background: "hsl(var(--intent))",
          opacity: isHovering ? 1 : 0,
          WebkitMaskImage: isHovering
            ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 40%, transparent 100%)`
            : "none",
          maskImage: isHovering
            ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 40%, transparent 100%)`
            : "none",
        }}
      >
        <Icon className="mb-4 h-6 w-6 text-primary-foreground/70" />
        <p className="text-base font-bold leading-relaxed text-primary-foreground">
          {principle.detail}
        </p>
      </div>

      {/* Cursor glow */}
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, hsl(var(--intent) / 0.15), transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
};

const SafeLightCoding = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-12 lg:py-16">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Philosophy header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6 max-w-3xl text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
            Our Philosophy
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Safe Light Coding
          </h2>
        </motion.div>

        {/* Manifesto tenets */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {TENETS.map((tenet, i) => (
              <span key={i} className="text-base font-medium text-muted-foreground md:text-lg">
                {tenet}
                {i < TENETS.length - 1 && (
                  <span className="ml-2 text-primary/40">·</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Principle cards with flashlight */}
        <div className="mx-auto grid max-w-6xl gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {PRINCIPLES.map((p, i) => (
            <PrincipleCard key={p.title} principle={p} index={i} isInView={isInView} />
          ))}
        </div>

        {/* Philosophy statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <blockquote className="relative rounded-2xl border border-border bg-card/60 backdrop-blur-sm px-8 py-8 md:px-12 md:py-10 text-center">
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background px-3 py-1"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                Manifesto
              </span>
            </div>
            <p className="text-lg font-medium leading-relaxed text-foreground md:text-xl">
              "We believe AI should help humans write software more{" "}
              <span className="text-primary font-bold">deliberately</span>, not write it for them.
              The gap between intent and implementation is where quality dies — our job is to{" "}
              <span className="text-primary font-bold">help you close that gap</span>."
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default SafeLightCoding;
