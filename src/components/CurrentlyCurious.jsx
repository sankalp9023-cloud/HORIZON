import React, { useRef, lazy, Suspense } from 'react';
import { curiosities } from '../data/curiosities';
import CuriosityCard from './CuriosityCard';
import { Compass } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Lazy-load the Galaxy canvas so it doesn't block the section chunk
const GalaxyBackground = lazy(() => import('./GalaxyBackground'));

export default function CurrentlyCurious() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Scroll-linked values for the galaxy background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Galaxy fades in as section enters, fades out as it exits
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.75, 1],
    [0, shouldReduceMotion ? 0 : 0.55, shouldReduceMotion ? 0 : 0.55, 0]
  );

  // Subtle vertical parallax: canvas drifts upward as user scrolls down
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['4%', '-4%']
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 sm:px-8 scroll-mt-20 overflow-hidden"
    >
      {/* ── Galaxy Background (scroll-linked, lazy) ─────────────────── */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: bgOpacity, y: bgY }}
      >
        <Suspense fallback={null}>
          <GalaxyBackground />
        </Suspense>
      </motion.div>

      {/* ── Content (stays above the background) ─────────────────────── */}
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#1c1e28]"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#f4f4f5] tracking-tight">
              Currently Curious About
            </h2>
            <p className="text-sm text-[#9ca3af] mt-2 max-w-xl">
              A curated collection of subjects, physical paradoxes, and frontier
              questions under active contemplation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-[#111216]/90 backdrop-blur-sm border border-[#20222a] px-3.5 py-2 rounded-xl">
            <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Exploratory questions — not claims of expertise</span>
          </div>
        </motion.div>

        {/* Curated Collection Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {curiosities.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <CuriosityCard curiosity={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
