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
    <div className="silverile-landing min-h-screen bg-background">
      <Navbar />

      {/* Hero headline */}
      <section className="relative overflow-hidden pt-12 pb-2 lg:pt-14">
        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-center text-center py-8 sm:py-10 md:py-12"
          >
            <div className="w-20 sm:w-24 mx-auto mb-4">
              <video
                autoPlay
                muted
                playsInline
                className="w-full rounded-lg"
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            </div>
            <h2 className="text-2xl font-light tracking-wide text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
              Your{" "}
              <span className="font-bold text-primary">
                Agentic Co-Project Manager
              </span>
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 h-[2px] w-24 rounded-full bg-gradient-to-r from-intent via-execution to-validation sm:w-32"
            />
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
