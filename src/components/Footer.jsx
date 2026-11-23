import React from 'react';
import { footerData } from '../data/contact';
import { ArrowUp } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1a1c24] py-20 px-6 sm:px-8">
      {/* ── Centred HORIZON brand + scroll-to-top ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 mb-14"
      >
        {/* Horizon icon mark */}
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full border border-zinc-700/70"
          aria-hidden="true"
        >
          <span className="w-4 h-[1.5px] bg-indigo-400 block" />
        </span>

        {/* HORIZON wordmark */}
        <div className="text-center">
          <span className="font-mono text-2xl font-bold tracking-[0.25em] text-[#f4f4f5] uppercase">
            {footerData.brand}
          </span>
          <p className="text-sm font-light text-zinc-500 mt-1 tracking-wide">
            {footerData.tagline}
          </p>
        </div>

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white bg-[#111216] hover:bg-[#1c1d27] border border-[#222432] hover:border-indigo-500/40 px-5 py-2.5 rounded-full transition-all duration-200"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          <span>Back to top</span>
        </button>
      </motion.div>

      {/* ── Copyright row (minimal, no technical labels) ──────────────── */}
      <div className="max-w-6xl mx-auto pt-8 border-t border-[#14161f] flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-zinc-600">
        <p>{footerData.copyright}</p>
      </div>
    </footer>
  );
}
