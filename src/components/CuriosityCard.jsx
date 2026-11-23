import React from 'react';
import { ExternalLink, Calendar, BookOpen, Compass } from 'lucide-react';

export default function CuriosityCard({ curiosity }) {
  return (
    <article className="group rounded-2xl bg-[#0f1015] hover:bg-[#12131a] border border-[#1f212a] hover:border-[#2f3342] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative">
      <div>
        {/* Top Meta: Category & Date */}
        <div className="flex items-center justify-between text-xs font-mono mb-4">
          <span className="px-2.5 py-1 rounded-md bg-[#161720] text-zinc-300 border border-[#222432] text-[11px]">
            {curiosity.category}
          </span>
          <span className="text-zinc-500 text-[11px] flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {curiosity.dateAdded}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#f4f4f5] group-hover:text-white transition-colors tracking-tight mb-3">
          {curiosity.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed mb-5">
          {curiosity.shortDescription}
        </p>

        {/* Key Thesis / Question */}
        {curiosity.keyQuestion && (
          <div className="p-3.5 rounded-xl bg-[#090a0d] border border-[#171922] mb-5 text-xs font-mono">
            <span className="text-[10px] uppercase text-zinc-500 tracking-wider block mb-1 flex items-center gap-1.5">
              <Compass className="w-3 h-3 text-indigo-400" />
              Foundational Question
            </span>
            <p className="text-zinc-300 text-[11px] italic leading-normal">
              "{curiosity.keyQuestion}"
            </p>
          </div>
        )}
      </div>

      {/* Reading Note & Resource Link */}
      <div className="pt-4 border-t border-[#181a24] space-y-3">
        {curiosity.readingNote && (
          <p className="text-xs font-mono text-zinc-400">
            <span className="text-zinc-600">Note: </span>
            {curiosity.readingNote}
          </p>
        )}

        {curiosity.resource && (
          <div className="pt-1">
            <a
              href={curiosity.resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="truncate max-w-[260px]">{curiosity.resource.title}</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
