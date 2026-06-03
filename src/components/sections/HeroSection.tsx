"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Wrench, Droplets, ArrowDownRight } from "lucide-react";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export function HeroSection({ settings }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Subtle mouse tracking for floating elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (e.clientX / innerWidth - 0.5) * 40,
        y: (e.clientY / innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const stats = [
    { num: settings?.stats?.yearsInBusiness ?? "15+", label: "Years" },
    { num: settings?.stats?.brandsStocked ?? "50+", label: "Brands" },
    { num: settings?.stats?.projectsSupplied ?? "500+", label: "Projects" },
  ];

  const floatingIcons = [
    {
      Icon: Zap,
      color: "var(--forest)",
      label: "Electric",
      position: "top-[15%] left-[5%] md:top-[20%] md:left-[10%]",
    },
    {
      Icon: Wrench,
      color: "var(--muted)",
      label: "Hardware",
      position: "bottom-[25%] left-[5%] md:bottom-[20%] md:left-[15%]",
    },
    {
      Icon: Droplets,
      color: "var(--ink)",
      label: "Sanitary",
      position: "top-[25%] right-[5%] md:top-[30%] md:right-[10%]",
    },
  ];

  return (
    <section
      id="home"
      // Added pt-28 to clear the fixed Navbar, using your bg-parchment
      className="relative w-full min-h-[100svh] bg-parchment flex flex-col overflow-hidden pt-28 pb-12"
    >
      {/* Decorative Blur matching your original vibe */}
      <div className="absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full bg-forest/10 blur-[100px] pointer-events-none" />

      {/* Interactive Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={item.label}
          className={`absolute ${item.position} hidden sm:flex flex-col items-center gap-2 opacity-30 hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none md:pointer-events-auto`}
          animate={{
            x: mousePosition.x * (i + 1),
            y: mousePosition.y * (i + 1) + Math.sin(Date.now() / 1000 + i) * 10,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
          <div className="p-4 rounded-full bg-white/50 backdrop-blur-md shadow-sm border border-border">
            <item.Icon size={32} color={item.color} strokeWidth={1.5} />
          </div>
          <span className="label-sm text-muted">{item.label}</span>
        </motion.div>
      ))}

      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Top Meta Strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border flex items-center justify-between py-4 mb-12 md:mb-20"
        >
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            {["Electrical", "Hardware", "Sanitary Ware"].map((s, i) => (
              <span key={s} className="flex items-center gap-3 shrink-0">
                {i > 0 && <span className="w-1 h-1 rounded-full bg-border" />}
                <span className="label-sm text-muted">{s}</span>
              </span>
            ))}
          </div>
          <span className="label-sm text-muted hidden md:block">
            {settings?.address?.split("\n").pop() ?? "Mumbai"}
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6 md:mb-8"
        >
          <div className="w-12 h-px bg-forest" />
          <span className="label text-forest">Exclusive Showroom</span>
        </motion.div>

        {/* Headline - Using your fluid .text-display and .font-fraunces */}
        <div className="mb-12 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-display font-fraunces text-ink font-bold"
          >
            MY
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-display font-fraunces italic text-forest"
          >
            CHOICE.
          </motion.h1>
        </div>

        {/* Actions - Using your .label class */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row flex-wrap gap-4 mb-auto"
        >
          <a
            href="#products"
            className="group flex items-center justify-between gap-4 bg-ink text-parchment px-8 py-4 label hover:bg-forest transition-all duration-300"
          >
            Browse Products
            <ArrowDownRight
              className="group-hover:rotate-[-45deg] transition-transform duration-300"
              size={18}
            />
          </a>
          <a
            href="#booking"
            className="flex items-center justify-center border border-border px-8 py-4 label text-ink hover:border-forest hover:text-forest transition-all duration-300"
          >
            Book 1:1 Session
          </a>
          <a
            href="#workers"
            className="flex items-center justify-center border border-border px-8 py-4 label text-ink hover:border-forest hover:text-forest transition-all duration-300"
          >
            Find a Worker
          </a>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-0 border-t border-border pt-8 mt-16 max-w-3xl"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col ${i > 0 ? "md:pl-8 md:border-l border-border" : "md:pr-8"}`}
            >
              <div className="font-fraunces text-4xl md:text-5xl font-bold text-ink mb-1 md:mb-2">
                {s.num}
              </div>
              <div className="label-sm text-muted">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
