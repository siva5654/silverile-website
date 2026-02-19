import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Mail, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  company: z.string().trim().max(100, "Company name too long").optional(),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message too long"),
});

type ContactForm = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sending, setSending] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", company: "", message: "" });
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    }, 1200);
  };

  return (
    <section id="contact" ref={ref} className="relative py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-2 items-start">
          {/* Left — CTA copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-3 inline-block rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contact Us
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-foreground">Let's </span>
              <span className="text-primary">Schedule</span>
              <span className="text-foreground"> a Meeting</span>
            </h2>
            <p className="mt-4 text-base text-muted-foreground lg:text-lg leading-relaxed">
              See how Silverile can transform your project management workflow. Book a personalized demo with our team and discover the power of agentic PM.
            </p>

            <div className="mt-8 space-y-5">
              {[
                { icon: Calendar, title: "Schedule a Demo", desc: "30-minute walkthrough tailored to your team's needs" },
                { icon: MessageSquare, title: "Talk to Our Team", desc: "Get answers to your questions from our product experts" },
                { icon: Mail, title: "Quick Response", desc: "We respond to all inquiries within 24 hours" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="rounded-xl bg-[hsl(var(--intent)/0.08)] p-2.5">
                    <item.icon className="h-5 w-5 text-[hsl(var(--intent))]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-8 space-y-5"
              style={{ boxShadow: "0 8px 40px -16px hsl(var(--intent) / 0.1)" }}
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                  Name <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  maxLength={100}
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  maxLength={255}
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium text-foreground">
                  Company
                </label>
                <Input
                  id="contact-company"
                  placeholder="Your company name"
                  value={form.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  maxLength={100}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                  Message <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell us about your project management needs or request a demo..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  maxLength={2000}
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full bg-[hsl(var(--intent))] text-primary-foreground hover:bg-[hsl(var(--intent)/0.9)]"
              >
                {sending ? "Sending..." : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                Or email us directly at{" "}
                <a href="mailto:contact@silverile.com" className="text-[hsl(var(--intent))] hover:underline">
                  contact@silverile.com
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
