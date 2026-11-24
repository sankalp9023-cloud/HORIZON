import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import CosmicHorizon from './CosmicHorizon';

export default function Hero({ scrolled }) {
  const shouldReduceMotion = useReducedMotion();

  const handleHeroActionClick = (sectionId) => {
    window.dispatchEvent(new CustomEvent('horizon:request-section', { detail: { id: sectionId } }));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: shouldReduceMotion ? 0 : custom * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    })
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Interactive Cosmic Visual Background */}
      <CosmicHorizon />

      {/* Profile portrait and name transition into the navbar brand as the page scrolls. */}
      <div className="relative z-10 flex min-h-[250px] flex-col items-center pt-2">
        {!scrolled && (
          <>
            <motion.img
              layoutId="profile-avatar"
              src="/profile-org.jpeg"
              alt="Sam"
              transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 32 }}
              className="h-32 w-32 rounded-full border-2 border-indigo-400/70 object-cover object-center shadow-[0_0_36px_rgba(99,102,241,0.25)] ring-4 ring-white/70 dark:ring-[#111216]/70"
            />
            <motion.h2
              layoutId="profile-name"
              transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 320, damping: 32 }}
              className="mt-4 text-center text-2xl font-semibold tracking-tight text-zinc-900 dark:text-[#f4f4f5] sm:text-3xl"
            >
              Sankalp singh 
            </motion.h2>
          </>
        )}
      </div>

      {/* Main Hero Content */}
      <div className="my-auto py-12 max-w-3xl z-10">
        <motion.h1
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-zinc-950 dark:text-[#f4f4f5] leading-[1.06] mb-8"
        >
          Beyond what <br className="hidden sm:inline" />
          <span className="text-zinc-500 dark:text-zinc-400 italic font-serif font-normal">we know.</span>
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-lg sm:text-xl text-zinc-600 dark:text-[#9ca3af] font-light leading-relaxed max-w-2xl mb-10"
        >
          A personal digital space by Sam exploring products, systems, and foundational questions at the boundary of what we understand.
        </motion.p>

        {/* Action Buttons — Clean, minimal, high-contrast */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <a
            href="#work"
            onClick={() => handleHeroActionClick('work')}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-[#f4f4f5] dark:hover:bg-white dark:text-zinc-950 text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm cursor-pointer"
          >
            <span>Explore Work</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>

          <a
            href="#curiosity"
            onClick={() => handleHeroActionClick('curiosity')}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/90 hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 border border-zinc-200 dark:bg-[#121318]/90 dark:hover:bg-[#1a1b24] dark:text-[#9ca3af] dark:hover:text-[#f4f4f5] dark:border-[#222430] text-sm font-medium transition-all duration-200 backdrop-blur-sm shadow-xs cursor-pointer"
          >
            <Compass className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Curated Inquiries</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom Horizon Line & Meta Row */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        custom={4}
        className="pt-8 border-t border-zinc-200 dark:border-[#1a1c24] flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs font-mono z-10"
      >
        <div className="flex items-center gap-6">
          <div>
            <span className="block text-zinc-400 dark:text-zinc-500 uppercase text-[10px] tracking-widest mb-1">Perspective</span>
            <span className="text-zinc-700 dark:text-[#a1a1aa]">Software • Physical Systems • Theoretical Inquiries</span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-[1.5px] bg-indigo-600 dark:bg-indigo-400"></span>
            <span className="text-zinc-700 dark:text-[#a1a1aa]">A boundary to explore, not a destination</span>
          </div>

          <a
            href="#work"
            onClick={() => handleHeroActionClick('work')}
            className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors flex items-center gap-1.5"
            aria-label="Scroll to Work"
          >
            <span>Scroll</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
