'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const HomeHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}

      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          {/* Category Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <div className="relative px-4 py-1 rounded-lg bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--text-primary-rgb),0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine"></div>
                <span className="relative z-10 text-[var(--text-primary)] text-sm font-medium">
                  3D Model Conversion Tool
                </span>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
          >
            Transform SVGs into Chrome 3D in{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--text-secondary)] to-[var(--text-primary)]">Seconds</span>
              <span className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(var(--text-primary-rgb),0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine bg-clip-text text-transparent">
                Seconds
              </span>
              <span className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(var(--text-primary-rgb),0.1)_20%,rgba(var(--text-primary-rgb),0.2)_40%,rgba(var(--text-primary-rgb),0.1)_60%,transparent_100%)] bg-[length:200%_100%] animate-shimmer bg-clip-text text-transparent">
                Seconds
              </span>
              <span className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,rgba(var(--text-primary-rgb),0.05)_20%,rgba(var(--text-primary-rgb),0.1)_40%,rgba(var(--text-primary-rgb),0.05)_60%,transparent_100%)] bg-[length:150%_100%] animate-shimmer-delayed bg-clip-text text-transparent">
                Seconds
              </span>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm md:text-base text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Turn your <span className="text-[var(--text-primary)] font-medium">existing SVGs</span> into stunning <span className="text-[var(--text-primary)] font-medium">Chrome 3D models</span> instantly. No 3D expertise required — just upload and transform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/get-started"
              className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Convert Your SVG
            </Link>
            <Link 
              href="/learn-more"
              className="px-4 py-2 text-[var(--text-primary)] rounded-lg font-semibold border border-[var(--card-border)] hover:border-[var(--text-secondary)] transition-all duration-300"
            >
              See How It Works
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;