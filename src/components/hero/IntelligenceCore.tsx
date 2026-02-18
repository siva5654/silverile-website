import { motion } from "framer-motion";
import { Brain, Sparkles } from "lucide-react";

const CAPABILITIES = [
  "Context Understanding",
  "Requirement Structuring",
  "Code Validation",
  "Test Generation",
  "Alignment Scoring",
];

interface IntelligenceCoreProps {
  hoveredInput: string | null;
}

const IntelligenceCore = ({ hoveredInput }: IntelligenceCoreProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center py-4 lg:py-0">
      {/* Outer glow ring */}
      <motion.div
        className="absolute h-64 w-64 rounded-full sm:h-72 sm:w-72 lg:h-80 lg:w-80"
        style={{
          background: "radial-gradient(circle, hsl(var(--execution) / 0.12) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core container */}
      <div className="relative flex h-56 w-56 flex-col items-center justify-center rounded-full border border-border/50 bg-card/60 backdrop-blur-md sm:h-64 sm:w-64 lg:h-72 lg:w-72">
        {/* Inner ring */}
        <motion.div
          className="absolute inset-3 rounded-full border"
          style={{ borderColor: "hsl(var(--execution) / 0.2)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Brain icon */}
        <motion.div
          animate={{ scale: hoveredInput ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5 }}
          className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: "hsl(var(--execution) / 0.15)" }}
        >
          <Brain className="h-6 w-6 text-execution" />
        </motion.div>

        <span className="mb-3 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Silverile SDLC
          <br />
          Intelligence Engine
        </span>

        {/* Capability list */}
        <div className="flex flex-col items-center gap-0.5">
          {CAPABILITIES.map((cap, i) => (
            <motion.span
              key={cap}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-[10px] text-muted-foreground/80"
            >
              {cap}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Pulse dots around the core */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <motion.div
          key={deg}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            background: "hsl(var(--execution))",
            top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 140}px - 3px)`,
            left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 140}px - 3px)`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: deg / 360 }}
        />
      ))}
    </div>
  );
};

export default IntelligenceCore;
