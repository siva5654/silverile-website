import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { User, Mail, Lock, Building2, Check, ArrowRight, Eye, EyeOff, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "Too long"),
  lastName: z.string().trim().min(1, "Last name is required").max(50, "Too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Too long"),
  company: z.string().trim().max(100, "Too long").optional(),
  password: z.string().min(8, "Min 8 characters").max(128, "Too long"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

const plans = [
  {
    id: "free",
    name: "Silverile - Free",
    tagline: "(Ag)ile for All – Time gAIned",
    price: "Free",
    priceSub: "for 10 Users",
    color: "intent",
    icon: Sparkles,
    features: [
      "Agentic Project Management",
      "StoryCraft-AI (Text & Images)",
      "Monty's Views (Org, Scrum, Kanban, Timeline)",
      "Release & Time Management",
      "Silverile Virtual Huddle",
      "5,000 AI tokens/user/month",
      "10 Projects · 200 Stories/Project",
    ],
  },
  {
    id: "professional",
    name: "Silverile - Professional",
    tagline: "(Ag)ile for All – Time gAIned",
    price: "$7.00",
    priceSub: "per User / Month",
    color: "execution",
    icon: Zap,
    popular: true,
    features: [
      "Everything in Free, plus:",
      "Agile View",
      "Compendium – Document Repository",
      "20,000 AI tokens/user/month",
      "Unlimited Projects",
      "Unlimited Stories",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For more than 500 Users",
    price: "Custom",
    priceSub: "Contact Us",
    color: "validation",
    icon: Shield,
    features: [
      "Everything in Professional, plus:",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantees",
    ],
  },
];

const RegisterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

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
      setForm({ firstName: "", lastName: "", email: "", company: "", password: "", confirmPassword: "" });
      toast({ title: "Account created!", description: `Welcome to Silverile ${selectedPlan === "free" ? "Free" : "Professional"} plan.` });
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
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl grid gap-8 lg:grid-cols-5 items-center">
          {/* Plans — Left (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 grid gap-4 sm:grid-cols-3 items-stretch"
          >
            {plans.map((plan, i) => {
              const isSelected = selectedPlan === plan.id;
              const Icon = plan.icon;
              return (
                <motion.button
                  key={plan.id}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className="relative rounded-2xl border text-left p-5 transition-all"
                  style={{
                    borderColor: isSelected ? `hsl(var(--${plan.color}))` : "hsl(var(--border))",
                    background: isSelected ? `hsl(var(--${plan.color}) / 0.04)` : "hsl(var(--card) / 0.8)",
                    boxShadow: isSelected ? `0 0 30px -10px hsl(var(--${plan.color}) / 0.25)` : "none",
                  }}
                >
                  {plan.popular && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        background: `hsl(var(--${plan.color}))`,
                        color: "hsl(var(--primary-foreground))",
                      }}
                    >
                      Popular
                    </span>
                  )}

                  {/* Check indicator */}
                  <div
                    className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full transition-all"
                    style={{
                      background: isSelected ? `hsl(var(--${plan.color}))` : "hsl(var(--muted))",
                      border: isSelected ? "none" : "1px solid hsl(var(--border))",
                    }}
                  >
                    {isSelected && <Check className="h-3 w-3" style={{ color: "hsl(var(--primary-foreground))" }} />}
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl mb-3"
                    style={{ background: `hsl(var(--${plan.color}) / 0.12)` }}
                  >
                    <Icon className="h-4 w-4" style={{ color: `hsl(var(--${plan.color}))` }} />
                  </div>

                  <h3 className="text-sm font-bold text-foreground">{plan.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{plan.tagline}</p>

                  <div className="mt-3 mb-3 border-t border-border" />

                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-extrabold" style={{ color: `hsl(var(--${plan.color}))` }}>
                      {plan.price === "Free" || plan.price === "Custom"
                        ? plan.price
                        : billing === "yearly"
                          ? "$5.60"
                          : plan.price}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{plan.priceSub}</span>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[11px] text-muted-foreground leading-tight">
                        <Check className="h-3 w-3 mt-0.5 shrink-0" style={{ color: `hsl(var(--${plan.color}))` }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Form — Right (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2"
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
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    First Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      placeholder="First"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      maxLength={50}
                      style={{ paddingLeft: "2.25rem" }}
                    />
                  </div>
                  {errors.firstName && <p className="mt-0.5 text-[10px] text-destructive">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-foreground">
                    Last Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    placeholder="Last"
                    value={form.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    maxLength={50}
                  />
                  {errors.lastName && <p className="mt-0.5 text-[10px] text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Work Email <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    maxLength={255}
                    style={{ paddingLeft: "2.25rem" }}
                  />
                </div>
                {errors.email && <p className="mt-0.5 text-[10px] text-destructive">{errors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">Company</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Your company"
                    value={form.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    maxLength={100}
                    style={{ paddingLeft: "2.25rem" }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min 8 characters"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    maxLength={128}
                    style={{ paddingLeft: "2.25rem", paddingRight: "2.5rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-0.5 text-[10px] text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-1 block text-xs font-medium text-foreground">
                  Confirm Password <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Re-enter password"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    maxLength={128}
                    style={{ paddingLeft: "2.25rem", paddingRight: "2.5rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-0.5 text-[10px] text-destructive">{errors.confirmPassword}</p>}
              </div>

              {/* Selected plan indicator */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPlan}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-border p-3 flex items-center gap-3"
                  style={{
                    background: `hsl(var(--${plans.find((p) => p.id === selectedPlan)!.color}) / 0.06)`,
                    borderColor: `hsl(var(--${plans.find((p) => p.id === selectedPlan)!.color}) / 0.3)`,
                  }}
                >
                  <Check className="h-4 w-4 shrink-0" style={{ color: `hsl(var(--${plans.find((p) => p.id === selectedPlan)!.color}))` }} />
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      {plans.find((p) => p.id === selectedPlan)!.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {plans.find((p) => p.id === selectedPlan)!.price === "Custom"
                        ? "Contact us for pricing"
                        : `${plans.find((p) => p.id === selectedPlan)!.price} ${plans.find((p) => p.id === selectedPlan)!.priceSub}`}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              <Button
                type="submit"
                size="lg"
                disabled={submitting || selectedPlan === "enterprise"}
                className="w-full"
                style={{
                  background: `hsl(var(--${plans.find((p) => p.id === selectedPlan)!.color}))`,
                  color: "hsl(var(--primary-foreground))",
                }}
              >
                {submitting ? "Creating Account..." : selectedPlan === "enterprise" ? "Contact Us Instead" : (
                  <>
                    Create Account <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="text-center text-[10px] text-muted-foreground">
                Already have an account?{" "}
                <a href="#" className="font-medium text-primary hover:underline">
                  Sign In
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
