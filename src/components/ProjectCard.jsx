import React from 'react';
import { ExternalLink, ArrowUpRight, Calendar } from 'lucide-react';
import { GithubIcon } from './Icons';
import ProjectVisual from './ProjectVisual';

export default function ProjectCard({ project }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Live':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50">
            Live
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/40">
            In Progress
          </span>
        );
      case 'Coming Soon':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-100 text-zinc-600 border border-zinc-200/80 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700/50">
            Coming Soon
          </span>
        );
    }
  };

  // Featured Layout Variant
  if (project.featured) {
    return (
      <article className="group relative rounded-2xl bg-white dark:bg-[#0f1015] border border-zinc-200/90 dark:border-[#1f212a] hover:border-zinc-300 dark:hover:border-[#2f3342] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300 p-6 sm:p-8 overflow-hidden">
        {/* Subtle hover gradient glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Project Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {getStatusBadge(project.status)}
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.year}
                </span>
                <span className="text-xs font-mono text-zinc-300 dark:text-zinc-600">•</span>
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">{project.category}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-zinc-950 dark:text-[#f4f4f5] tracking-tight mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
                {project.name}
              </h3>
              
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-4">
                {project.subtitle}
              </p>

              <p className="text-sm text-zinc-600 dark:text-[#9ca3af] leading-relaxed mb-6 max-w-xl">
                {project.description}
              </p>

              {/* Metrics showcase */}
              {project.metrics && (
                <div className="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-xl bg-zinc-50 dark:bg-[#0a0b0e] border border-zinc-200/80 dark:border-[#1a1c24]">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="text-left">
                      <span className="block text-[10px] font-mono uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">
                        {m.label}
                      </span>
                      <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Technologies and Links */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/80 dark:bg-[#161720] dark:text-zinc-400 dark:border-[#222432]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-2">
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white bg-zinc-900 hover:bg-black dark:text-zinc-200 dark:hover:text-white dark:bg-[#1a1c26] dark:hover:bg-[#222534] border border-transparent dark:border-[#2b2e40] px-3.5 py-2 rounded-lg transition-colors shadow-xs"
                  >
                    <span>Live Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors py-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Project Visual Frame */}
          <div className="lg:col-span-5 h-full flex flex-col justify-center">
            <ProjectVisual
              type={project.visualType}
              title={project.name}
              status={project.status}
            imageSrc={project.imageSrc}
            />
          </div>
        </div>
      </article>
    );
  }

  // Standard Card Layout
  return (
    <article className="group relative rounded-2xl bg-white dark:bg-[#0f1015] border border-zinc-200/90 dark:border-[#1f212a] hover:border-zinc-300 dark:hover:border-[#2f3342] shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            {getStatusBadge(project.status)}
            <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">({project.year})</span>
          </div>
          <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate max-w-[140px]">
            {project.category}
          </span>
        </div>

        {/* Visual Frame */}
        <div className="mb-5">
          <ProjectVisual
            type={project.visualType}
            title={project.name}
            status={project.status}
          imageSrc={project.imageSrc}
          />
        </div>

        {/* Title and descriptions */}
        <h3 className="text-xl font-semibold text-zinc-950 dark:text-[#f4f4f5] tracking-tight mb-1 group-hover:text-black dark:group-hover:text-white transition-colors">
          {project.name}
        </h3>
        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">
          {project.subtitle}
        </p>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-[#9ca3af] leading-relaxed mb-6">
          {project.description}
        </p>
      </div>

      {/* Bottom Tech pills & Action Links */}
      <div className="pt-4 border-t border-zinc-100 dark:border-[#181a24] space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-100 text-zinc-600 border border-zinc-200/70 dark:bg-[#161720] dark:text-zinc-400 dark:border-[#222432]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            {project.links?.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white hover:underline transition-colors"
              >
                <span>Live Site</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Repo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}


