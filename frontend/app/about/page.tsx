"use client";

import { motion } from "framer-motion";
import { AboutHero } from "@/components/sections/aboutHero";
import { AboutCards } from "@/components/sections/aboutCards";
import { FounderQuote } from "@/components/sections/founderQuote";

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-invert max-w-none">
              <AboutCards />
              <FounderQuote />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
