"use client";

import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue, useInView } from "framer-motion";
import { ArrowDownRight, Zap, Wrench, Droplets } from "lucide-react";
import type { SiteSettings } from "@/types";

interface Props {
  settings: SiteSettings | null;
}

export function HeroSection({ settings }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 25;
      const y = (e.clientY - innerHeight / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
      rotateX.set(-y * 0.8);
      rotateY.set(x * 0.8);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, rotateX, rotateY]);

  const sectors = [
    { Icon: Zap, label: "Electrical", pos: "top-[8%] left-[8%]" },
    { Icon: Wrench, label: "Hardware", pos: "bottom-[18%] left-[5%]" },
    { Icon: Droplets, label: "Sanitary Ware", pos: "top-[18%] right-[8%]" },
  ];

  const stats = [
    { value: settings?.stats?.yearsInBusiness ?? "25+", label: "Years" },
    { value: settings?.stats?.brandsStocked ?? "50+", label: "Brands" },
    { value: settings?.stats?.projectsSupplied ?? "500+", label: "Projects" },
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen bg-parchment overflow-hidden flex items-center justify-center p-6 md:p-12"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture opacity-[0.08] pointer-events-none" />

      {/* Dynamic axis lines */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15"
      >
        <div className="w-full h-px bg-forest/40" />
        <div className="h-full w-px bg-forest/40 absolute" />
      </motion.div>

      {/* Central content */}
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-20 flex flex-col items-center justify-center text-center gap-10"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "1em" }}
          animate={isInView ? { opacity: 1, letterSpacing: "0.35em" } : {}}
          transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
          className="label-sm text-forest uppercase"
        >
          Architectural Procurement
        </motion.div>

        {/* Headline */}
        <div className="relative group cursor-default">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="text-[13vw] lg:text-[10vw] font-fraunces font-bold text-ink leading-none tracking-tighter"
          >
            MY<span className="text-forest font-light italic">CHOICE.</span>
          </motion.h1>

          {/* Reactive ring */}
          <motion.div
            style={{ x: smoothX, y: smoothY }}
            className="absolute -inset-10 border border-forest/10 rounded-full pointer-events-none hidden md:block"
          />
        </div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-fraunces italic text-muted text-lg md:text-xl font-light"
        >
          Electric · Hardware · Sanitary Ware
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col md:flex-row items-center gap-4 md:gap-6"
        >
          <a
            href="#products"
            className="group relative flex items-center gap-10 bg-ink text-parchment px-8 py-5 label overflow-hidden"
            style={{
              transition: "transform 100ms cubic-bezier(0.23,1,0.32,1)",
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span className="relative z-10">Browse Products</span>
            <ArrowDownRight
              size={16}
              className="relative z-10 transition-transform duration-300 group-hover:rotate-[-45deg]"
            />
            {/* Hover fill — specific property */}
            <div
              className="absolute inset-0 bg-forest translate-y-full group-hover:translate-y-0 pointer-events-none"
              style={{
                transition: "transform 380ms cubic-bezier(0.23,1,0.32,1)",
              }}
            />
          </a>

          <a
            href="#workers"
            className="flex items-center gap-3 border-b border-ink/20 py-2 label text-ink"
            style={{ transition: "color 150ms, border-color 150ms" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#3D6B45";
              e.currentTarget.style.borderColor = "#3D6B45";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#1C2B1A";
              e.currentTarget.style.borderColor = "rgba(28,43,26,0.2)";
            }}
          >
            Find a Worker
          </a>
        </motion.div>
      </motion.div>

      {/* Floating sector nodes — desktop only */}
      {sectors.map((node, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
          style={{ x: smoothX, y: smoothY }}
          className={`absolute ${node.pos} hidden lg:flex flex-col items-center gap-3 opacity-10 hover:opacity-100 pointer-events-none lg:pointer-events-auto`}
          /* Specific opacity transition */
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.1")}
        >
          <div
            className="p-4 border border-ink/10 bg-white/40 backdrop-blur-sm"
            style={{ transition: "border-color 200ms, background 200ms" }}
          >
            <node.Icon size={24} strokeWidth={1} className="text-forest" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="label-sm text-[8px] text-muted tracking-widest">
              {node.label}
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-forest/40 to-transparent" />
          </div>
        </motion.div>
      ))}

      {/* Bottom bar */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-8 inset-x-8 md:inset-x-12 flex items-end justify-between border-t border-ink/8 pt-5"
      >
        {/* Stats */}
        <div className="flex gap-6 md:gap-10">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col">
              <span className="label-sm text-forest/60">
                {s.label.toUpperCase().slice(0, 4)}
              </span>
              <span className="font-fraunces font-bold text-lg md:text-xl leading-tight">
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span
            className="label-sm text-muted"
            style={{ transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1C2B1A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A7A")}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-7 bg-forest"
          />
        </div>

        {/* Location */}
        <div className="hidden md:flex flex-col text-right">
          <span className="label-sm text-forest/60">LOCATION</span>
          <span className="font-fraunces font-bold text-lg md:text-xl">
            {settings?.address?.split("\n").pop()?.split(",")[0] ?? "Mumbai"}
          </span>
        </div>
      </motion.div>

      {/* Blueprint corner SVG */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 pointer-events-none opacity-[0.04]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-ink stroke-[0.5]"
        >
          <circle cx="100" cy="0" r="40" />
          <circle cx="100" cy="0" r="70" />
          <circle cx="100" cy="0" r="100" />
          <line x1="60" y1="0" x2="100" y2="0" />
          <line x1="100" y1="40" x2="100" y2="0" />
        </svg>
      </div>
    </section>
  );
}
