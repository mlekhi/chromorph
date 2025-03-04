'use client';

import { motion } from 'framer-motion';

export function FounderQuote() {
  return (
    <div className="pt-12 border-t border-[var(--card-border)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg italic text-center text-[var(--text-primary)]">
          "I built Chromorph to bridge the gap between 2D and 3D design, making it as simple as converting an SVG to a PNG. Some call it obsession, we call it precision."
        </p>
        <p className="text-right text-[var(--text-secondary)] mt-4">
          - <a 
              href="https://github.com/mlekhi" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Maya
            </a>
        </p>
      </motion.div>
    </div>
  );
} 