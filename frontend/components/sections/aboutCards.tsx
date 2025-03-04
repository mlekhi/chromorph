'use client';

import Image from 'next/image';

export function AboutCards() {
  return (
    <div className="space-y-24">
      {/* The Problem */}
      <div>
        <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">The Problem</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          3D design tools are complex and inaccessible to most designers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black p-8 rounded-lg shadow-lg border border-[var(--card-border)]">
            <p className="text-lg text-white">
              Creating 3D experiences requires specialized knowledge in modeling software, game engines, or complex JavaScript libraries. This creates a barrier that prevents many designers from exploring the potential of 3D in their work.
            </p>
          </div>
          <div className="relative h-[200px] rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)]">
            <Image
              src="/images/complex-tools.jpg"
              alt="Complex 3D modeling interface"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* The Solution */}
      <div>
        <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">The Solution</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Convert your SVGs into 3D models with one click.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)]">
            <Image
              src="/images/svg-to-3d.jpg"
              alt="SVG to 3D conversion process"
              fill
              className="object-cover"
            />
          </div>
          <div className="bg-black p-8 rounded-lg shadow-lg border border-[var(--card-border)]">
            <p className="text-lg text-white">
              Chromorph takes a different approach. Instead of requiring designers to learn complex 3D tools, we start with what they already know: SVG files. By converting these familiar 2D assets into 3D models, we're creating a bridge between traditional design workflows and the world of 3D.
            </p>
          </div>
        </div>
      </div>

      {/* The Vision */}
      <div>
        <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">The Vision</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Making 3D design accessible to everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black p-8 rounded-lg shadow-lg border border-[var(--card-border)]">
            <p className="text-lg text-white">
              We believe that 3D design shouldn't be limited to specialists. Just as tools like Figma democratized UI design, we're working to make 3D design accessible to everyone. Our goal is to help designers create more engaging, immersive experiences without the steep learning curve traditionally associated with 3D design.
            </p>
          </div>
          <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg border border-[var(--card-border)]">
            <Image
              src="/images/accessible-design.jpg"
              alt="Accessible 3D design interface"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div>
        <h2 className="text-4xl font-bold mb-6 text-[var(--text-primary)]">Get Started</h2>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Transform your designs today.
        </p>
        <div className="bg-black p-8 rounded-lg shadow-lg border border-[var(--card-border)]">
          <p className="text-lg mb-6 text-white">
            Ready to bring your designs to life? Start by converting your first SVG to 3D. We're here to help you create more engaging, immersive experiences.
          </p>
          <a 
            href="/converter" 
            className="inline-block bg-white text-black px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Try Chromorph →
          </a>
        </div>
      </div>
    </div>
  );
} 