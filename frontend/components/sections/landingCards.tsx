'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const features = [
  {
    title: "Instant Conversion",
    description: "Transform SVGs into stunning Chrome 3D models and text effects in seconds. Perfect for logos, typography, and icons.",
    image: "/features/instant-conversion.gif"
  },
  {
    title: "Chrome Ready",
    description: "Create eye-catching Chrome text effects and 3D typography that shines in Chrome's viewer. Ideal for headings and displays.",
    image: "/features/chrome-ready.gif"
  },
  {
    title: "Preserve Quality",
    description: "Keep the perfect curves and sharp edges from your SVG. Every detail becomes a polished Chrome surface.",
    image: "/features/quality.gif"
  }
];

const LandingCards = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left card - wider */}
          <motion.div
            key={features[0].title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative lg:col-span-5 lg:h-[calc(100vh-24rem)] min-h-[600px]"
          >
            <div className="relative bg-black rounded-2xl p-[1px] overflow-hidden group h-full">
              {/* Chrome border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100/10 via-white/[0.15] to-gray-100/10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine"></div>
              </div>
              <div className="relative bg-black rounded-2xl p-8 h-full flex flex-col">
                <div className="aspect-video relative mb-8 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
                  <Image
                    src={features[0].image}
                    alt={features[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold text-gray-100 mb-4">
                    {features[0].title}
                  </h3>
                  <p className="text-lg text-gray-400">
                    {features[0].description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right cards - stacked */}
          <div className="lg:col-span-7 grid grid-rows-2 gap-8 lg:h-[calc(100vh-24rem)] min-h-[600px]">
            {features.slice(1).map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative h-full"
              >
                <div className="relative bg-black rounded-2xl p-[1px] overflow-hidden group h-full">
                  {/* Chrome border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100/10 via-white/[0.15] to-gray-100/10">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shine"></div>
                  </div>
                  <div className="relative bg-black rounded-2xl p-6 h-full">
                    <div className="flex flex-col md:flex-row gap-6 items-center h-full">
                      <div className="w-full md:w-1/2 aspect-video relative rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10" />
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <h3 className="text-2xl font-semibold text-gray-100 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCards;
