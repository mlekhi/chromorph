"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from './chromorphLogoSmall';
// import { FaInstagram, FaTwitter } from "react-icons/fa";

const MenuBar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full fixed top-0 left-0 z-50 py-3"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Navigation Menu */}
        <div className="bg-black px-4 py-2 rounded-lg shadow flex items-center space-x-4 text-white text-sm">
          <Link href="/converter">
            <p className="hover:text-gray-300 transition-colors">Chrome Converter</p>
          </Link>
          <Link href="/about">
            <p className="hover:text-gray-300 transition-colors">About</p>
          </Link>
          <Link href="/contact">
            <p className="hover:text-gray-300 transition-colors">Contact</p>
          </Link>
          {/* <FaInstagram className="text-gray-400 hover:text-gray-500 transition-colors" />
          <FaTwitter className="text-gray-400 hover:text-gray-500 transition-colors" /> */}
        </div>

        {/* Right: Call-to-Action */}
        <Link href="/converter">
          <div className="bg-black px-4 py-2 rounded-lg shadow text-white text-sm hover:bg-gray-900 transition flex items-center">
            Try Now →
          </div>
        </Link>
      </div>
    </motion.nav>
  );
};

export default MenuBar;
