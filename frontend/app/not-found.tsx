"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold mb-4 text-[var(--text-primary)]"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl mb-6 text-[var(--text-secondary)]"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link 
          href="/"
          className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
}
