import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import {
  User, Mail, Lock, Building2, Check, ArrowRight, Eye, EyeOff,
  Sparkles, Shield, Zap, Phone, IdCard, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

/* ─── Schema ─── */
const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "Too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Too long"),
  phone: z.string().trim().max(20, "Too long").optional(),
  company: z.string().trim().max(100, "Too long").optional(),
  userId: z.string().trim().min(3, "Min 3 characters").max(30, "Too long").regex(/^[a-zA-Z0-9_.-]+$/, "Only letters, numbers, dots, hyphens, underscores"),
  password: z.string().min(8, "Min 8 characters").max(128, "Too long"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

/* ─── Plan data (matching Pricing section) ─── */
type Feature = { label: string; sub?: string[] };
type BillingCycle = "monthly" | "yearly";

interface PlanData {
  id: string;
  name: string;
  subtitle: string;
  icon: typeof Zap;
  color: string;
  features: Feature[];
  cta: Record<BillingCycle, string>;
  highlighted: boolean;
}

const plans: PlanData[] = [
  {
    id: "free",
    name: "Silverile - Free plan",
    subtitle: "(Ag)ile for All, Time gAIned",
    icon: Zap,
    color: "execution",
    features: [
      { label: "Agentic Project management" },
      { label: "StoryCraft-AI", sub: ["Generate Stories from Text", "Generate Stories from Images"] },
      { label: "Monty's Views", sub: ["Organization View", "Scrum View", "Kanban View", "Timeline View"] },
      { label: "Release Management" },
      { label: "Time Management" },
      { label: "Silverile Virtual Huddle" },
      { label: "5,000 AI tokens per user per month" },
      { label: "10 Projects" },
      { label: "200 Stories per Project" },
    ],
    cta: { monthly: "Free for 10 Users", yearly: "Free for 10 Users" },
    highlighted: false,
  },
  {
    id: "professional",
    name: "Silverile - Professional",
    subtitle: "(Ag)ile for All, Time gAIned",
    icon: Sparkles,
    color: "intent",
    features: [
      { label: "Agentic Project management" },
      { label: "StoryCraft-AI", sub: ["Generate Stories from Text", "Generate Stories from Images"] },
      { label: "Monty's Views", sub: ["Agile View", "Organization View", "Scrum View", "Kanban View", "Timeline View"] },
      { label: "Release Management" },
      { label: "Time Management" },
      { label: "Compendium - Your document repository" },
      { label: "Silverile Virtual Huddle" },
      { label: "20,000 AI tokens per user per month" },
      { label: "Unlimited Projects" },
      { label: "Unlimited Stories" },
    ],
    cta: { monthly: "$7.00 per User per Month", yearly: "$75.00 per User per Year" },
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    subtitle: "For more than 500 Users",
    icon: Building2,
    color: "validation",
    features: [
      { label: "Everything in Professional" },
      { label: "Dedicated Account Manager" },
      { label: "Custom Integrations & API Access" },
      { label: "Advanced Analytics & Reporting" },
      { label: "Priority 24/7 Support with SLA" },
      { label: "SSO & Advanced Security" },
      { label: "Custom AI token limits" },
      { label: "On-premise deployment options" },
    ],
    cta: { monthly: "Contact Us", yearly: "Contact Us" },
    highlighted: false,
  },
];

/* ─── Component ─── */
const RegisterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    firstName: "", lastName: "", email: "", phone: "", company: "", userId: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const activePlan = plans.find((p) => p.id === selectedPlan)!;
  const otherPlans = plans.filter((p) => p.id !== selectedPlan);

  const handleChange = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof RegisterForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ firstName: "", lastName: "", email: "", phone: "", company: "", userId: "", password: "", confirmPassword: "" });
      toast({ title: "Account created!", description: `Welcome to ${activePlan.name}.` });
    }, 1500);
  };

  return (
    <section id="register" ref={ref} className="relative py-12 lg:py-16">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="mb-3 inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Get Started
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-foreground">Create Your </span>
            <span className="text-primary">Account</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground lg:text-lg max-w-2xl mx-auto">
            Choose your plan and start managing projects with the power of agentic AI.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex rounded-full border border-border bg-card/80 p-1 backdrop-blur-sm">
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="relative rounded-full px-5 py-2 text-sm font-medium transition-all"
                style={{
                  background: billing === b ? "hsl(var(--primary))" : "transparent",
                  color: billing === b ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {b === "monthly" ? "Monthly" : "Yearly"}
                {b === "yearly" && (
                  <span className="ml-1.5 text-[10px] font-bold" style={{ color: billing === b ? "hsl(var(--primary-foreground))" : "hsl(var(--validation))" }}>
                    Save ~11%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-2 items-start">
          {/* ─── Plan Card — Left ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {/* Plan Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between rounded-xl border border-border bg-card/80 backdrop-blur-sm px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/50"
              >
                <div className="flex items-center gap-2">
                  <activePlan.icon className="h-4 w-4" style={{ color: `hsl(var(--${activePlan.color}))` }} />
                  <span>{activePlan.name}</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 z-20 mt-1 rounded-xl border border-border bg-card shadow-lg backdrop-blur-xl overflow-hidden"
                  >
                    {plans.map((plan) => {
                      const Icon = plan.icon;
                      const isActive = plan.id === selectedPlan;
                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => { setSelectedPlan(plan.id); setDropdownOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-secondary/50 text-left"
                          style={{ background: isActive ? `hsl(var(--${plan.color}) / 0.08)` : undefined }}
                        >
                          <Icon className="h-4 w-4 shrink-0" style={{ color: `hsl(var(--${plan.color}))` }} />
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{plan.name}</p>
                            <p className="text-[11px] text-muted-foreground">{plan.cta[billing]}</p>
                          </div>
                          {isActive && <Check className="h-4 w-4 shrink-0" style={{ color: `hsl(var(--${plan.color}))` }} />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Stacked cards effect */}
            <div className="relative" style={{ perspective: "1200px" }}>
              {/* Background cards (other plans stacked behind) */}
              {otherPlans.map((plan, i) => {
                const Icon = plan.icon;
                return (
                  <motion.div
                    key={plan.id}
                    className="absolute inset-x-0 top-0 rounded-2xl border-2 backdrop-blur-sm overflow-hidden"
                    animate={{
                      y: (i + 1) * 14,
                      scale: 1 - (i + 1) * 0.04,
                      opacity: 0.6 - i * 0.2,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                      zIndex: -i - 1,
                      height: "100%",
                      borderColor: `hsl(var(--${plan.color}) / 0.25)`,
                      background: `linear-gradient(135deg, hsl(var(--card) / 0.9), hsl(var(--${plan.color}) / 0.05))`,
                    }}
                  >
                    {/* Mini header peek */}
                    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2 px-4">
                      <Icon className="h-3.5 w-3.5" style={{ color: `hsl(var(--${plan.color}) / 0.6)` }} />
                      <span className="text-xs font-medium" style={{ color: `hsl(var(--${plan.color}) / 0.5)` }}>
                        {plan.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Active plan card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlan}
                  initial={{ opacity: 0, rotateY: -8, x: -40, scale: 0.95 }}
                  animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateY: 8, x: 40, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
                  className="relative rounded-2xl border bg-card/80 backdrop-blur-sm p-8"
                  style={{
                    borderColor: `hsl(var(--${activePlan.color}) / 0.3)`,
                    boxShadow: `0 8px 40px -12px hsl(var(--${activePlan.color}) / 0.25)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  {activePlan.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full px-4 py-1 text-xs font-bold text-primary-foreground" style={{ background: `hsl(var(--${activePlan.color}))` }}>
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon + Name */}
                  <div className="mb-6">
                    <div className="mb-4 inline-flex rounded-xl p-2.5" style={{ background: `hsl(var(--${activePlan.color}) / 0.06)` }}>
                      <activePlan.icon className="h-5 w-5" style={{ color: `hsl(var(--${activePlan.color}))` }} />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{activePlan.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{activePlan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-border">
                    <span className="text-3xl font-extrabold" style={{ color: `hsl(var(--${activePlan.color}))` }}>
                      {activePlan.cta[billing]}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {activePlan.features.map((f, fi) => (
                      <motion.li
                        key={f.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: fi * 0.03, duration: 0.25 }}
                      >
                        <div className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: `hsl(var(--${activePlan.color}))` }} />
                          <span className="font-medium">{f.label}</span>
                        </div>
                        {f.sub && (
                          <ul className="ml-9 mt-1 space-y-1">
                            {f.sub.map((s) => (
                              <li key={s} className="text-xs text-muted-foreground">{s}</li>
                            ))}
                          </ul>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ─── Form — Right ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4"
              style={{ boxShadow: "0 8px 40px -16px hsl(var(--intent) / 0.1)" }}
            >
              <h3 className="text-lg font-bold text-foreground mb-1">Sign Up</h3>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">First Name <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input placeholder="First" value={form.firstName} onChange={(e) => handleChange("firstName", e.target.value)} maxLength={50} style={{ paddingLeft: "2.25rem" }} />
                  </div>
                  {errors.firstName && <p className="mt-0.5 text-[10px] text-destructive">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">Last Name <span className="text-destructive">*</span></label>
                  <Input placeholder="Last" value={form.lastName} onChange={(e) => handleChange("lastName", e.target.value)} maxLength={50} />
                  {errors.lastName && <p className="mt-0.5 text-[10px] text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Work Email <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} maxLength={255} style={{ paddingLeft: "2.25rem" }} />
                </div>
                {errors.email && <p className="mt-0.5 text-[10px] text-destructive">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} maxLength={20} style={{ paddingLeft: "2.25rem" }} />
                </div>
                {errors.phone && <p className="mt-0.5 text-[10px] text-destructive">{errors.phone}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Your company" value={form.company} onChange={(e) => handleChange("company", e.target.value)} maxLength={100} style={{ paddingLeft: "2.25rem" }} />
                </div>
              </div>

              {/* User ID */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">User ID <span className="text-destructive">*</span></label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="your.username" value={form.userId} onChange={(e) => handleChange("userId", e.target.value)} maxLength={30} style={{ paddingLeft: "2.25rem" }} />
                </div>
                {errors.userId && <p className="mt-0.5 text-[10px] text-destructive">{errors.userId}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Password <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder="Min 8 characters" value={form.password} onChange={(e) => handleChange("password", e.target.value)} maxLength={128} style={{ paddingLeft: "2.25rem", paddingRight: "2.5rem" }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-0.5 text-[10px] text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Confirm Password <span className="text-destructive">*</span></label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input type={showConfirm ? "text" : "password"} placeholder="Re-enter password" value={form.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} maxLength={128} style={{ paddingLeft: "2.25rem", paddingRight: "2.5rem" }} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-0.5 text-[10px] text-destructive">{errors.confirmPassword}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={submitting || selectedPlan === "enterprise"}
                className="w-full"
                style={{
                  background: `hsl(var(--${activePlan.color}))`,
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                {submitting ? "Creating Account..." : selectedPlan === "enterprise" ? "Contact Us Instead" : (
                  <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>
                )}
              </Button>

              <p className="text-center text-[10px] text-muted-foreground">
                Already have an account?{" "}
                <a href="#" className="font-medium text-primary hover:underline">Sign In</a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
