import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OutputItem {
  icon: LucideIcon;
  label: string;
}

interface Metric {
  label: string;
  value: string;
  status: "ok" | "warn" | "error";
}

interface OutputCardProps {
  inputId: string;
  title: string;
  color: string;
  hoveredInput: string | null;
  items: OutputItem[];
  tags?: string[];
  metrics?: Metric[];
}

const STATUS_COLORS: Record<string, string> = {
  ok: "var(--validation)",
  warn: "var(--feedback)",
  error: "var(--destructive)",
};

const OutputCard = ({ inputId, title, color, hoveredInput, items, tags, metrics }: OutputCardProps) => {
  const isHighlighted = hoveredInput === inputId;
  const isDimmed = hoveredInput !== null && hoveredInput !== inputId;

  return (
    <motion.div
      animate={{
        opacity: isDimmed ? 0.35 : 1,
        scale: isHighlighted ? 1.02 : 1,
      }}
      transition={{ duration: 0.3 }}
      className="relative rounded-xl border border-border bg-card/80 p-4 backdrop-blur-sm"
      style={{
        borderColor: isHighlighted ? `hsl(var(--${color}) / 0.5)` : undefined,
        boxShadow: isHighlighted ? `0 0 30px -8px hsl(var(--${color}) / 0.25)` : "none",
      }}
    >
      <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: `hsl(var(--${color}))` }}>
        {title}
      </div>

      {/* Metrics row (for code output) */}
      {metrics && (
        <div className="mb-2 flex flex-wrap gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-md border border-border bg-muted/40 px-2 py-1 text-[10px]"
            >
              <span className="text-muted-foreground">{m.label}: </span>
              <span className="font-bold" style={{ color: `hsl(${STATUS_COLORS[m.status]})` }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Items */}
      <div className="flex flex-col gap-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-1.5">
              <Icon className="h-3 w-3 shrink-0" style={{ color: `hsl(var(--${color}) / 0.7)` }} />
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Tags */}
      {tags && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold"
              style={{
                background: `hsl(var(--validation) / 0.12)`,
                color: `hsl(var(--validation))`,
              }}
            >
              <CheckCircle2 className="h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OutputCard;
