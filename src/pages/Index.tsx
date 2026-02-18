import Navbar from "@/components/Navbar";
import PMCapabilities from "@/components/PMCapabilities";
import HeroFlow from "@/components/HeroFlow";
import Extensions from "@/components/Extensions";
import MontyViews from "@/components/MontyViews";
import SafeLightCoding from "@/components/SafeLightCoding";
import Pricing from "@/components/Pricing";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import montySleeping from "@/assets/monty-sleeping.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero headline */}
      <section className="relative overflow-visible pt-20 pb-4 lg:pt-24">
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
              src={montySleeping}
              alt="Monty sleeping"
              className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 w-auto drop-shadow-lg"
            />
            <div className="relative mt-4">
              <h2 className="text-base font-light tracking-[0.2em] uppercase text-muted-foreground sm:text-lg md:text-xl lg:text-2xl">
                Your <span className="font-semibold text-foreground">"Agentic Co-Project Manager"</span>
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PM Capabilities (5 Cards) */}
      <PMCapabilities />

      {/* StoryCraft-AI Section */}
      <HeroFlow />

      {/* Extensions Section */}
      <Extensions />

      {/* Monty's Views */}
      <MontyViews />

      {/* Safe Light Coding */}
      <SafeLightCoding />

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
