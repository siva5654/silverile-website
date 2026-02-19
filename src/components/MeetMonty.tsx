import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Zap, Brain, Shield } from "lucide-react";
import montyWave from "@/assets/monty-wave.png";

const CAPABILITIES = [
  {
    icon: Brain,
    title: "StoryCraft AI",
    desc: "Transforms ideas into structured user stories with acceptance criteria and test cases.",
  },
  {
    icon: Zap,
    title: "Real-Time Orchestration",
    desc: "Coordinates sprints, assignments, and workflows autonomously across your team.",
  },
  {
    icon: Shield,
    title: "Intent Verification",
    desc: "Validates that shipped code matches the original business intent and acceptance criteria.",
  },
  {
    icon: Sparkles,
    title: "Predictive Insights",
    desc: "Surfaces risks, bottlenecks, and delivery predictions before they impact your project.",
  },
];

const MeetMonty = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-sm"
            style={{
              boxShadow: "0 8px 60px -16px hsl(var(--intent) / 0.15)",
            }}
          >
            <div className="grid lg:grid-cols-[1fr_380px]">
              {/* Left — Text content */}
              <div className="relative z-10 p-8 sm:p-10 lg:p-14">
                <motion.span
                  initial={{ opacity: 0, y: -8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary"
                >
                  Meet Your AI Companion
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl"
                >
                  Say Hi to{" "}
                  <span className="text-primary">Monty</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  Monty is the intelligent orchestration interface that powers Silverile — the friendly face 
                  coordinating your entire SDLC. From idea to shipped code, Monty ensures nothing falls 
                  through the cracks.
                </motion.p>

                {/* Speech bubble */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="relative mt-6 inline-block max-w-md rounded-2xl border border-primary/15 bg-primary/5 px-5 py-3.5"
                >
                  <p className="text-sm font-medium italic text-foreground/80">
                    "I'll help you turn ambiguity into clarity, intent into implementation, and ideas into 
                    shipped software — all while keeping your team aligned."
                  </p>
                  {/* Arrow pointing right toward Monty — desktop */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden h-4 w-4 rotate-45 border-r border-t border-primary/15 bg-primary/5 lg:block" />
                </motion.div>
              </div>

              {/* Right — Monty filling the right side */}
              <div className="relative hidden lg:flex items-center justify-center overflow-visible min-h-[320px]">
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="relative z-20"
                >
                  <motion.img
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    src={montyWave}
                    alt="Monty waving hello"
                    className="h-[380px] w-auto object-contain drop-shadow-2xl"
                  />
                </motion.div>
                {/* Glow behind Monty */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, hsl(var(--intent) / 0.1), transparent 60%)",
                  }}
                />
              </div>
            </div>

            {/* Mobile Monty */}
            <div className="relative flex justify-center lg:hidden overflow-hidden pb-4">
              <motion.img
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                src={montyWave}
                alt="Monty waving hello"
                className="h-48 w-auto object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Monty's capabilities grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
                className="group rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <cap.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{cap.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{cap.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MeetMonty;
