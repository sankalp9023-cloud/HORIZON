import React from 'react';
import { currentlyBuilding } from '../data/building';
import { Clock, Target } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function CurrentlyBuilding() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <section id="building" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header — Clean, natural, no numbered labels */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12 pb-6 border-b border-[#1c1e28]"
      >
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f4f4f5] tracking-tight">
          Currently Building
        </h2>
        <p className="text-sm text-[#9ca3af] mt-2 max-w-xl">
          Active experiments, upcoming systems, and hardware prototypes in active formulation.
        </p>
      </motion.div>

      {/* Building Grid with Staggered Scroll Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {currentlyBuilding.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="group rounded-2xl bg-[#0f1015] border border-[#1f212a] hover:border-[#2f3342] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
          >
            {/* Top Status & Timestamp */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-950/40 text-indigo-300 border border-indigo-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  {item.status}
                </span>
                <span className="text-zinc-500 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.updated}
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-[#181a24] h-1 rounded-full overflow-hidden mb-6">
                <div
                  className="bg-indigo-500/80 h-full rounded-full transition-all duration-500 group-hover:bg-indigo-400"
                  style={{ width: `${item.progressPercent}%` }}
                />
              </div>

              {/* Project Title & Tagline */}
              <h3 className="text-lg font-semibold text-[#f4f4f5] group-hover:text-white transition-colors tracking-tight mb-1">
                {item.name}
              </h3>
              <p className="text-xs font-mono text-zinc-400 mb-3">
                {item.tagline}
              </p>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-6">
                {item.description}
              </p>
            </div>

            {/* Target Direction Box & Specs */}
            <div className="pt-4 border-t border-[#181a24] space-y-4">
              <div className="p-3 rounded-xl bg-[#090a0d] border border-[#171922] text-xs font-mono">
                <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase tracking-wider mb-1">
                  <Target className="w-3 h-3 text-indigo-400" />
                  <span>Direction & Goal</span>
                </div>
                <p className="text-zinc-300 leading-normal text-[11px]">
                  {item.direction}
                </p>
              </div>

              {/* Specs & Hardware Attributes */}
              {item.specs && (
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  {item.specs.map((s, idx) => (
                    <div key={idx} className="bg-[#12131a] px-2 py-1 rounded border border-[#1b1d28]">
                      <span className="text-zinc-500 block">{s.key}</span>
                      <span className="text-zinc-300 font-medium">{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.technologies.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#15161f] text-zinc-400 border border-[#20222f]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
