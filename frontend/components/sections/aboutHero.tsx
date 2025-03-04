'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Category Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="relative px-4 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine"></div>
                <span className="relative z-10 text-[var(--text-primary)] text-sm font-medium">
                  About Chromorph
                </span>
              </div>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight max-w-4xl mx-auto">
            It's time to make 3D design accessible
          </h1>
        </motion.div>
      </div>
    </section>
  );
} 