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
import heroVideo from "@/assets/hero-video.mp4";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero headline */}
      <section className="relative overflow-hidden pt-20 pb-4 lg:pt-24">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center py-12 sm:py-16 md:py-24"
          >
            <h2 className="text-base font-light tracking-[0.2em] text-muted-foreground sm:text-lg md:text-xl lg:text-2xl">
              <span className="text-foreground font-medium">Your</span> <span className="font-semibold text-foreground">"Agentic Co-Project Manager"</span>
            </h2>
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
