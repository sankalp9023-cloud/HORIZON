import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

export default function CuriosityCard({ curiosity }) {
  return (
    <article className="group rounded-2xl bg-[#0f1015] hover:bg-[#12131a] border border-[#1f212a] hover:border-[#2f3342] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          {curiosity.category}
        </span>
        <h3 className="text-lg font-semibold text-[#f4f4f5] group-hover:text-white transition-colors tracking-tight mt-2 mb-2">
          {curiosity.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed line-clamp-3">
          {curiosity.shortDescription}
        </p>
      </div>

      {curiosity.resource && (
        <a
          href={curiosity.resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex max-w-full items-center gap-1.5 border-t border-[#181a24] pt-4 text-xs font-mono text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{curiosity.resource.title}</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      )}
    </article>
  );
}
