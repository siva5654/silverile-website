import Navbar from "@/components/Navbar";
import PMCapabilities from "@/components/PMCapabilities";
import HeroFlow from "@/components/HeroFlow";
import SafeLightCoding from "@/components/SafeLightCoding";
import MontyViews from "@/components/MontyViews";
import MeetMonty from "@/components/MeetMonty";
import Pricing from "@/components/Pricing";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import silverileHeroLogo from "@/assets/silverile-logo-hero.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero headline */}
      <section className="relative overflow-hidden pt-20 pb-4 lg:pt-24">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center"
          >
            <img
              src={silverileHeroLogo}
              alt="Silverile.AI"
              className="h-16 w-auto sm:h-20 md:h-24 lg:h-28 xl:h-32"
            />
            <h2 className="mt-4 text-base font-light tracking-[0.2em] uppercase text-muted-foreground sm:text-lg md:text-xl lg:text-2xl">
              Your <span className="font-semibold text-foreground">"Agentic Co-Project Manager"</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* PM Capabilities */}
      <PMCapabilities />

      {/* Input → Output Intelligence */}
      <HeroFlow />

      {/* Philosophy */}
      <SafeLightCoding />

      {/* Meet Monty */}
      <MeetMonty />

      {/* Monty's Views */}
      <MontyViews />

      {/* Pricing */}
      <Pricing />

      {/* Contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
