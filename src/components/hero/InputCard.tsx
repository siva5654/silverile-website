import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface InputCardProps {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  hoveredInput: string | null;
  onHover: (id: string | null) => void;
  children: ReactNode;
}

const InputCard = ({ id, label, icon: Icon, color, hoveredInput, onHover, children }: InputCardProps) => {
  const isHighlighted = hoveredInput === id;
  const isDimmed = hoveredInput !== null && hoveredInput !== id;

  return (
    <motion.div
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isHighlighted ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl border border-border bg-card/80 p-4 backdrop-blur-sm transition-colors"
      style={{
        borderColor: isHighlighted ? `hsl(var(--${color}) / 0.5)` : undefined,
        boxShadow: isHighlighted ? `0 0 30px -8px hsl(var(--${color}) / 0.25)` : "none",
      }}
    >
      {/* Label */}
      <div className="mb-2 flex items-center gap-2">
        <div
          className="flex h-6 w-6 items-center justify-center rounded-md"
          style={{ background: `hsl(var(--${color}) / 0.15)` }}
        >
          <Icon className="h-3 w-3" style={{ color: `hsl(var(--${color}))` }} />
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ color: `hsl(var(--${color}))` }}
        >
          {label}
        </span>
      </div>
      {children}
    </motion.div>
  );
};

export default InputCard;
