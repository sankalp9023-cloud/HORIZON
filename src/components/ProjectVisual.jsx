import React from 'react';
import { Terminal, Layers, Network, Palette } from 'lucide-react';

export default function ProjectVisual({ type, title, imageSrc }) {
  if (type === 'cover-image' && imageSrc) {
    return (
      <div className="w-full aspect-[4/5] rounded-xl border border-zinc-800 dark:border-[#1c1e28] bg-zinc-950 dark:bg-[#0c0d12] overflow-hidden shadow-xs">
        <img src={imageSrc} alt={`${title} project cover`} className="w-full h-full object-contain" />
      </div>
    );
  }

  if (type === 'code-stream') {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-zinc-950 dark:bg-[#0c0d12] rounded-xl border border-zinc-800 dark:border-[#1c1e28] p-5 font-mono text-xs overflow-hidden flex flex-col justify-between group-hover:border-zinc-700 dark:group-hover:border-[#2b2e3e] transition-colors shadow-xs">
        {/* Top Window Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 dark:border-[#181a24]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="ml-2 text-[11px] text-zinc-400">chronos-engine.rs</span>
          </div>
          <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900/50">
            zero-copy stream
          </span>
        </div>

        {/* Code / Architecture Simulation */}
        <div className="py-4 space-y-2 text-zinc-400 text-[11px]">
          <div className="flex gap-2">
            <span className="text-zinc-600 select-none">01</span>
            <span className="text-purple-400">pub struct</span>
            <span className="text-zinc-200">TimeSeriesEngine</span>
            <span className="text-zinc-500">&lt;T: EventPayload&gt;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 select-none">02</span>
            <span className="text-zinc-500 pl-4">// In-memory ring buffer with SIMD compaction</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 select-none">03</span>
            <span className="text-indigo-400 pl-4">let</span>
            <span className="text-zinc-300">snapshot</span>
            <span className="text-zinc-500">=</span>
            <span className="text-amber-400/90">engine.commit_barrier()</span>
            <span className="text-zinc-500">.await?;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-zinc-600 select-none">04</span>
            <span className="text-zinc-500 pl-4">log_metrics!(throughput:</span>
            <span className="text-emerald-400">1.42e6_ops</span>
            <span className="text-zinc-500">);</span>
          </div>
        </div>

        {/* Live Status Metric Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-800 dark:border-[#181a24] text-[10px]">
          <span className="flex items-center text-emerald-400">
            SYNCED WITH L1
          </span>
          <span className="text-zinc-400">p99: 2.8ms</span>
        </div>
      </div>
    );
  }

  if (type === 'spatial-grid') {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-zinc-950 dark:bg-[#0c0d12] rounded-xl border border-zinc-800 dark:border-[#1c1e28] p-5 overflow-hidden flex flex-col justify-between group-hover:border-zinc-700 dark:group-hover:border-[#2b2e3e] transition-colors shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 dark:border-[#181a24] font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>aura-viewplane.canvas</span>
          </div>
          <span className="text-[10px] text-zinc-400">60 FPS • FLUID</span>
        </div>

        {/* Spatial UI Wireframe Mockup */}
        <div className="relative my-auto py-2 flex items-center justify-center">
          <div className="w-48 h-28 rounded-lg border border-[#2b2e3e] bg-[#141620]/80 p-3 relative shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-16 h-2 rounded bg-zinc-700"></div>
              <div className="w-4 h-4 rounded-full border border-purple-400/40 bg-purple-500/10"></div>
            </div>
            <div className="space-y-1.5">
              <div className="w-32 h-1.5 rounded bg-zinc-800"></div>
              <div className="w-24 h-1.5 rounded bg-zinc-800"></div>
            </div>
            <div className="w-full h-1 bg-[#1f2230] rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-purple-500/60 rounded-full"></div>
            </div>
          </div>
          <div className="absolute w-44 h-24 rounded-lg border border-zinc-800/60 bg-zinc-900/30 -z-10 translate-x-4 -translate-y-2 pointer-events-none"></div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 dark:border-[#181a24] font-mono text-[10px] text-zinc-400">
          <span>Viewport: 3840×2160</span>
          <span className="text-purple-400/90">Gaze Adaptive</span>
        </div>
      </div>
    );
  }

  if (type === 'node-network') {
    return (
      <div className="relative w-full h-full min-h-[220px] bg-zinc-950 dark:bg-[#0c0d12] rounded-xl border border-zinc-800 dark:border-[#1c1e28] p-5 overflow-hidden flex flex-col justify-between group-hover:border-zinc-700 dark:group-hover:border-[#2b2e3e] transition-colors font-mono text-xs shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 dark:border-[#181a24]">
          <div className="flex items-center gap-2 text-zinc-300">
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>vektor-graph</span>
          </div>
          <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-900/50">
            100% On-Device
          </span>
        </div>

        {/* Vector Nodes Visual Graph */}
        <div className="my-auto py-3 flex items-center justify-center">
          <svg className="w-56 h-28" viewBox="0 0 200 100" fill="none">
            <line x1="40" y1="50" x2="100" y2="25" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="40" y1="50" x2="100" y2="75" stroke="#334155" strokeWidth="1.5" />
            <line x1="100" y1="25" x2="160" y2="50" stroke="#475569" strokeWidth="1.5" />
            <line x1="100" y1="75" x2="160" y2="50" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 2" />
            
            <circle cx="40" cy="50" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="100" cy="25" r="6" fill="#0f172a" stroke="#818cf8" strokeWidth="1.5" />
            <circle cx="100" cy="75" r="7" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="160" cy="50" r="9" fill="#0f172a" stroke="#60a5fa" strokeWidth="1.5" />
            
            <text x="35" y="53" fill="#e0f2fe" fontSize="8" fontFamily="monospace">Q</text>
            <text x="96" y="28" fill="#e0f2fe" fontSize="7" fontFamily="monospace">v1</text>
            <text x="96" y="78" fill="#e0f2fe" fontSize="7" fontFamily="monospace">v2</text>
            <text x="155" y="53" fill="#e0f2fe" fontSize="8" fontFamily="monospace">R</text>
          </svg>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 dark:border-[#181a24] text-[10px] text-zinc-400">
          <span>Embedding Dim: 768</span>
          <span className="text-zinc-300">Cosine Sim: 0.941</span>
        </div>
      </div>
    );
  }

  // Fallback: generative-art
  return (
    <div className="relative w-full h-full min-h-[220px] bg-zinc-950 dark:bg-[#0c0d12] rounded-xl border border-zinc-800 dark:border-[#1c1e28] p-5 overflow-hidden flex flex-col justify-between group-hover:border-zinc-700 dark:group-hover:border-[#2b2e3e] transition-colors font-mono text-xs shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800 dark:border-[#181a24]">
        <div className="flex items-center gap-2 text-zinc-300">
          <Palette className="w-3.5 h-3.5 text-violet-400" />
          <span>atelier-scales.svg</span>
        </div>
        <span className="text-[10px] text-zinc-400">3.2 kB gzipped</span>
      </div>

      <div className="my-auto py-2 flex items-center justify-center">
        <div className="flex items-end gap-1.5 h-20">
          <div className="w-3 bg-zinc-800 rounded-t h-4"></div>
          <div className="w-3 bg-zinc-700 rounded-t h-7"></div>
          <div className="w-3 bg-zinc-600 rounded-t h-12"></div>
          <div className="w-3 bg-violet-500/70 rounded-t h-16"></div>
          <div className="w-3 bg-indigo-400/90 rounded-t h-20"></div>
          <div className="w-3 bg-purple-300 rounded-t h-14"></div>
          <div className="w-3 bg-zinc-700 rounded-t h-8"></div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-zinc-800 dark:border-[#181a24] text-[10px] text-zinc-400">
        <span>Golden Ratio Modular Scale</span>
        <span className="text-violet-400">1.618</span>
      </div>
    </div>
  );
}

