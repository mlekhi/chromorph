"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HomeHero from "@/components/sections/homeHero";
import LandingCards from "@/components/sections/landingCards";
const features = [
  {
    title: "Instant 3D Chrome Effects",
    description: "Transform your flat SVGs into ultra-realistic, high-gloss chrome designs in seconds.",
    icon: "🎨",
  },
  {
    title: "Zero Learning Curve",
    description: "No 3D modeling experience? No problem. Get professional-grade effects instantly.",
    icon: "🚀",
  },
  {
    title: "Customize with Precision",
    description: "Control lighting, reflections, and textures to create exactly the look you want.",
    icon: "⚙️",
  },
  {
    title: "Effortless Export",
    description: "Download high-resolution images or vector files optimized for any project.",
    icon: "📦",
  },
];

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center px-8 py-16">
        <HomeHero />
        <LandingCards />
    </div>
  );
};

export default Landing;
