"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useInView } from "framer-motion";
import {
  ArrowDownRight,
  Zap,
  Wrench,
  Droplets,
  Ruler,
  Compass,
  HardHat,
} from "lucide-react";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export function HeroSection({ settings }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  // 1. PHYSICAL SPRING SYSTEM
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Custom springs for heavy architectural momentum
  const springConfig = { damping: 40, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Dynamic rotation for the central "Blueprint Orbit"
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;

      const x = (e.clientX - centerX) / 25;
      const y = (e.clientY - centerY) / 25;

      mouseX.set(x);
      mouseY.set(y);
      rotateX.set(-y * 0.8);
      rotateY.set(x * 0.8);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY]);

  const architecturalIcons = [
    { Icon: Zap, label: "ELECTRIC", pos: "top-[5%] left-[10%]" },
    { Icon: Wrench, label: "HARDWARE", pos: "bottom-[15%] left-[5%]" },
    { Icon: Droplets, label: "SANITARY", pos: "top-[20%] right-[10%]" },
    // { Icon: Ruler, label: "04", pos: "bottom-[10%] right-[5%]" },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen bg-parchment overflow-hidden flex items-center justify-center p-6 md:p-12"
    >
      {/* 2. PROCEDURAL BLUEPRINT LAYER (The "Canvas") */}
      <div className="absolute inset-0 grid-texture opacity-[0.08] pointer-events-none" />

      {/* Dynamic Grid Axis */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
      >
        <div className="w-full h-px bg-forest-d/40" />
        <div className="h-full w-px bg-forest-d/40 absolute" />
      </motion.div>

      {/* 3. THE KINETIC CORE (Central Orbit) */}
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-20 flex flex-col items-center justify-center text-center gap-12"
      >
        {/* Technical Eyebrow */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.4em" } : {}}
          transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          className="label-sm text-forest uppercase"
        >
          Architectural Procurement
        </motion.div>

        {/* The "Impact" Typo - Large, Responsive, Engineered */}
        <div className="relative group cursor-default">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-[12vw] lg:text-[10vw] font-fraunces font-bold text-ink leading-none tracking-tighter"
          >
            MY<span className="text-forest font-light italic">CHOICE.</span>
          </motion.h1>

          {/* Reactive Decorative Ring */}
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            className="absolute -inset-10 border border-forest/10 rounded-full pointer-events-none hidden md:block"
          />
        </div>

        {/* Action Group with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-6"
        >
          <a
            href="#products"
            className="group relative flex items-center gap-12 bg-ink text-parchment px-10 py-6 label overflow-hidden active:scale-[0.96] transition-transform duration-200"
          >
            <span className="relative z-10">Access Inventory</span>
            <ArrowDownRight className="relative z-10 group-hover:rotate-[-45deg] transition-transform duration-500" />
            <div className="absolute inset-0 bg-forest translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>

          <a
            href="#workers"
            className="flex items-center gap-4 border-b border-ink/20 py-2 label text-ink hover:text-forest hover:border-forest transition-all duration-300"
          >
            Request Worker
          </a>
        </motion.div>
      </motion.div>

      {/* 4. TECHNICAL ANNOTATIONS (The "Stunning" Peripheral Details) */}

      {/* Floating Blueprint Nodes */}
      {architecturalIcons.map((node, i) => (
        <motion.div
          key={i}
          style={{ x: smoothX, y: smoothY }}
          className={`absolute ${node.pos} hidden lg:flex flex-col items-center gap-3 opacity-10 hover:opacity-100 transition-opacity duration-700 pointer-events-none lg:pointer-events-auto`}
        >
          <div className="p-5 border border-ink/10 rounded-sm bg-white/40 backdrop-blur-sm">
            <node.Icon size={28} strokeWidth={1} className="text-forest" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="label-sm text-[8px] text-muted">
              SECTOR_{node.label}
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-forest/40 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* Corner Technical Strip */}
      <div className="absolute top-10 left-10 hidden xl:flex flex-col gap-1 opacity-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-[1px] bg-ink"
            style={{ opacity: 1 - i * 0.2 }}
          />
        ))}
        {/* <span className="label-sm text-[8px] mt-2">DRAFTING_MODE: ENABLED</span> */}
      </div>

      {/* Bottom Interface Bar */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 inset-x-12 flex items-end justify-between border-t border-ink/5 pt-6"
      >
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="label-sm text-forest/60">ESTD</span>
            <span className="font-fraunces font-bold text-xl">2001</span>
          </div>
          <div className="flex flex-col">
            <span className="label-sm text-forest/60">LOC</span>
            <span className="font-fraunces font-bold text-xl">MUMBAI</span>
          </div>
        </div>

        {/* Kinetic Scroll Indicator */}
        <div
          className="flex flex-col items-center gap-2 group cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="label-sm text-muted group-hover:text-ink transition-colors">
            DRAG_DOWN
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-8 bg-forest"
          />
        </div>

        <div className="hidden md:flex gap-12 text-right">
          <div className="flex flex-col">
            <span className="label-sm text-forest/60">AUTH</span>
            <span className="font-fraunces font-bold text-xl">VERIFIED</span>
          </div>
        </div>
      </motion.div>

      {/* Decorative Blueprint Corner (The "Stunner" Detail) */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-5">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-ink stroke-[0.5]"
        >
          <circle cx="100" cy="0" r="40" />
          <circle cx="100" cy="0" r="60" />
          <circle cx="100" cy="0" r="80" />
          <line x1="100" y1="0" x2="0" y2="100" />
        </svg>
      </div>
    </section>
  );
}
