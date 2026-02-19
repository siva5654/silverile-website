import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, GitBranch } from "lucide-react";
import vscodeLogo from "@/assets/vscode-logo.svg";
import intellijLogo from "@/assets/intellij-logo.svg";
import SilerileLogo from "./SilerileLogo";

const EXTENSIONS = [
  {
    ide: "VS Code",
    logo: vscodeLogo,
    color: "intent",
    features: [
      {
        icon: BookOpen,
        title: "Code to Story",
        desc: "Automatically generate user stories and acceptance criteria from your codebase, keeping documentation in sync with implementation.",
      },
      {
        icon: GitBranch,
        title: "Code Relevance",
        desc: "Surface the most relevant code segments for any story or requirement, ensuring changes are made in the right context.",
      },
    ],
  },
  {
    ide: "IntelliJ",
    logo: intellijLogo,
    color: "execution",
    features: [
      {
        icon: BookOpen,
        title: "Code to Story",
        desc: "Transform Java, Kotlin, and JVM code into structured stories with traceability back to the source.",
      },
      {
        icon: GitBranch,
        title: "Code Relevance",
        desc: "Identify and rank code sections by relevance to any requirement, streamlining impact analysis across your project.",
      },
    ],
  },
];

const Extensions = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
              IDE Extensions
            </span>
            <h2 className="mt-4 flex items-center justify-center gap-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              <SilerileLogo className="h-9 sm:h-11 md:h-14 w-auto" />
              <span>in <span className="text-primary">Your Editor</span></span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Bring Code&nbsp;to&nbsp;Story and Code&nbsp;Relevance directly
              into VS&nbsp;Code and IntelliJ — no context-switching required.
            </p>
          </motion.div>

          {/* Extension cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {EXTENSIONS.map((ext, i) => (
              <motion.div
                key={ext.ide}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.12 }}
                className="group rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                style={{
                  boxShadow: `0 4px 40px -12px hsl(var(--${ext.color}) / 0.1)`,
                }}
              >
                {/* IDE header */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `hsl(var(--${ext.color}) / 0.12)` }}
                  >
                    <img src={ext.logo} alt={ext.ide} className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {ext.ide}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Silverile Extension
                    </p>
                  </div>
                </div>

                {/* Feature list */}
                <div className="space-y-4">
                  {ext.features.map((feat) => (
                    <div
                      key={feat.title}
                      className="rounded-xl border border-border/60 bg-background/50 p-4 transition-colors group-hover:border-border"
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <feat.icon
                          className="h-4 w-4"
                          style={{ color: `hsl(var(--${ext.color}))` }}
                        />
                        <span className="text-sm font-semibold text-foreground">
                          {feat.title}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {feat.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-5">
                <button
                    className="w-full rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10"
                  >
                    Get for {ext.ide}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Extensions;
