import React from 'react';
import { personalData } from '../data/personal';
import {
  Binary,
  BookOpen,
  Compass,
  Cpu,
  Sparkles,
  Brain,
  Eye,
  Heart,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export default function BeyondTheWork() {
  const getHobbyIcon = (title) => {
    switch (title) {
      case 'Programming':
        return <Binary className="w-4 h-4 text-indigo-400" />;
      case 'Reading Books':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'Exploring New Ideas':
        return <Compass className="w-4 h-4 text-amber-400" />;
      case 'Hardware & Machines':
        return <Cpu className="w-4 h-4 text-emerald-400" />;
      case 'Learning Technology':
      default:
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="beyond" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-[#1c1e28]">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
          <span>03</span>
          <span className="text-zinc-700">/</span>
          <span>Perspective</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-[#f4f4f5] tracking-tight">
          {personalData.heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Introduction & Philosophical Context */}
        <div className="lg:col-span-5 space-y-6">
          <blockquote className="text-xl sm:text-2xl font-light text-[#f4f4f5] leading-relaxed border-l-2 border-indigo-500/60 pl-6 my-2">
            "{personalData.intro}"
          </blockquote>

          <p className="text-sm text-[#9ca3af] leading-relaxed">
            {personalData.philosophy}
          </p>

          <div className="pt-4">
            <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">
              Cognitive Profile & Modes of Thought
            </span>
            <div className="flex flex-wrap gap-2">
              {personalData.traits.map((trait) => (
                <div
                  key={trait.label}
                  className="group relative px-3 py-1.5 rounded-lg bg-[#111217] hover:bg-[#181922] border border-[#20222e] transition-colors"
                >
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                    {trait.label}
                  </span>
                  {/* Subtle contextual tooltip on hover */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-md bg-[#191b24] text-[11px] font-sans text-zinc-300 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-[#2b2e3e] shadow-xl z-20">
                    {trait.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Discrete Pursuits & Crafts */}
        <div className="lg:col-span-7">
          <span className="block text-xs font-mono text-zinc-500 uppercase tracking-widest mb-4">
            Continuous Pursuits & Hobbies
          </span>

          <div className="space-y-3">
            {personalData.hobbies.map((hobby) => (
              <div
                key={hobby.title}
                className="group p-4 sm:p-5 rounded-xl bg-[#0f1015] hover:bg-[#13151c] border border-[#1f212a] hover:border-[#2b2f3d] transition-all duration-200 flex items-start gap-4"
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
