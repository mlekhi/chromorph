'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Viewer() {
  const searchParams = useSearchParams();
  const modelUrl = searchParams.get('model');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modelUrl) return;

    // Here you would initialize your 3D viewer with the model
    // For now, we'll just show a placeholder
    console.log('Loading model:', modelUrl);
  }, [modelUrl]);

  if (!modelUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-primary)]">No model URL provided</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-[var(--text-primary)]">
            Your 3D Model
          </h1>
          <div 
            ref={containerRef}
            className="w-full aspect-square bg-black rounded-lg shadow-lg border border-[var(--card-border)]"
          >
            {/* 3D viewer will be initialized here */}
            <div className="w-full h-full flex items-center justify-center text-white">
              Loading 3D model...
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
} 