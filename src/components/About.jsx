import React, { useRef, lazy, Suspense } from 'react';
import { personalData } from '../data/personal';
import { Binary, BookOpen, Compass, Cpu, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

// Lazy-load the Wormhole canvas so it doesn't block the section chunk
const WormholeBackground = lazy(() => import('./WormholeBackground'));

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  // Scroll-linked values for the wormhole background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Wormhole fades in as section approaches, fades out as it leaves
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.72, 1],
    [0, shouldReduceMotion ? 0 : 0.5, shouldReduceMotion ? 0 : 0.5, 0]
  );

  // Subtle parallax: wormhole drifts upward as user scrolls through
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['5%', '-5%']
  );

  const getHobbyIcon = (title) => {
    switch (title) {
      case 'Systems & Software':   return <Binary   className="w-4 h-4 text-indigo-400" />;
      case 'Reading & Research':   return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'Synthesizing Concepts':return <Compass  className="w-4 h-4 text-amber-400"  />;
      case 'Hardware & Machines':  return <Cpu      className="w-4 h-4 text-emerald-400"/>;
      default:                     return <Sparkles className="w-4 h-4 text-cyan-400"   />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
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
      {/* ── Wormhole Background (scroll-linked, lazy) ─────────────────── */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ opacity: bgOpacity, y: bgY }}
      >
        <Suspense fallback={null}>
          <WormholeBackground />
        </Suspense>
      </motion.div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-12 pb-6 border-b border-[#1c1e28]"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#f4f4f5] tracking-tight">
            {personalData.heading}
          </h2>
          <p className="text-sm text-[#9ca3af] mt-2">{personalData.subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Introduction */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <blockquote className="text-xl sm:text-2xl font-light text-[#f4f4f5] leading-relaxed border-l-2 border-indigo-500/60 pl-6 my-2">
              "{personalData.intro}"
            </blockquote>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              {personalData.body}
            </p>

            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed border-t border-[#1c1e28] pt-4">
              {personalData.philosophy}
            </p>

            <div className="pt-2">
              <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
                Cognitive Patterns & Thinking Modes
              </span>
              <div className="flex flex-wrap gap-2">
                {personalData.traits.map((trait) => (
                  <div
                    key={trait.label}
                    className="group relative px-3 py-1.5 rounded-lg bg-[#111217]/90 backdrop-blur-sm hover:bg-[#181922] border border-[#20222e] transition-colors"
                  >
                    <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                      {trait.label}
                    </span>
                    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-md bg-[#191b24] text-[11px] font-sans text-zinc-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#2b2e3e] shadow-xl z-20">
                      {trait.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pursuits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-7"
          >
            <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
              Pursuits & Continuous Exploration
            </span>

            <div className="space-y-3">
              {personalData.hobbies.map((hobby) => (
                <motion.div
                  key={hobby.title}
                  variants={itemVariants}
                  className="group p-4 sm:p-5 rounded-xl bg-[#0f1015]/90 backdrop-blur-sm hover:bg-[#13151c] border border-[#1f212a] hover:border-[#2b2f3d] transition-all duration-200 flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-lg bg-[#161720] border border-[#222432] group-hover:border-zinc-700 transition-colors shrink-0">
                    {getHobbyIcon(hobby.title)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#f4f4f5] group-hover:text-white transition-colors">
                        {hobby.title}
                      </h4>
                      <span className="text-[11px] font-mono text-zinc-500 hidden sm:inline">
                        {hobby.tagline}
                      </span>
                    </div>
                    <p className="text-xs text-[#9ca3af] mt-1 leading-normal">
                      {hobby.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
