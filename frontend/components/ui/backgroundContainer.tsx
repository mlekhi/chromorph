'use client';

import { useTheme } from '../providers/ThemeProvider';

export function BackgroundContainer({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div 
        className="fixed inset-0 transition-colors duration-300"
        style={{
          background: theme === 'dark' 
            ? 'radial-gradient(circle at top center, #1a1a1a 0%, #000000 100%)' 
            : 'radial-gradient(circle at top center, #ffffff 0%, #f0f0f0 100%)'
        }}
      />

      {/* Noise texture */}
      <div 
        className="fixed inset-0 opacity-20"
        style={{
          backgroundImage: 'url("/noise.png")',
          backgroundRepeat: 'repeat',
          mixBlendMode: theme === 'dark' ? 'overlay' : 'multiply'
        }}
      />

      {/* Content */}
      <div className="relative">{children}</div>
    </div>
  );
}
