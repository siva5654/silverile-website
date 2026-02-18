import { motion } from "framer-motion";

interface FlowLinesProps {
  hoveredInput: string | null;
}

const LINES = [
  { inputId: "text", y: "18%", color: "var(--intent)" },
  { inputId: "image", y: "50%", color: "var(--execution)" },
  { inputId: "code", y: "82%", color: "var(--validation)" },
];

const FlowLines = ({ hoveredInput }: FlowLinesProps) => {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      <defs>
        {LINES.map((line) => (
          <linearGradient key={`g-${line.inputId}`} id={`grad-${line.inputId}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`hsl(${line.color})`} stopOpacity="0.6" />
            <stop offset="50%" stopColor={`hsl(var(--execution))`} stopOpacity="0.3" />
            <stop offset="100%" stopColor={`hsl(${line.color})`} stopOpacity="0.6" />
          </linearGradient>
        ))}
      </defs>
      {LINES.map((line, i) => {
        const isActive = hoveredInput === null || hoveredInput === line.inputId;
        return (
          <motion.line
            key={line.inputId}
            x1="22%"
            y1={line.y}
            x2="78%"
            y2={line.y}
            stroke={`url(#grad-${line.inputId})`}
            strokeWidth="1.5"
            strokeDasharray="6 6"
            animate={{ opacity: isActive ? 0.5 : 0.08 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}
    </svg>
  );
};

export default FlowLines;
