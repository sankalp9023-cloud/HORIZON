import React, { useState } from 'react';
import { projects, projectCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Work() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category?.trim() === selectedCategory?.trim());

  const featuredProject = selectedCategory === 'All'
    ? filteredProjects.find((p) => p.featured)
    : null;

  const standardProjects = selectedCategory === 'All'
    ? filteredProjects.filter((p) => !p.featured)
    : filteredProjects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <section id="work" className="py-24 px-6 sm:px-8 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-zinc-200 dark:border-[#1c1e28]"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-zinc-950 dark:text-[#f4f4f5] tracking-tight">
            Work
          </h2>
          <p className="text-sm text-zinc-600 dark:text-[#9ca3af] mt-2 max-w-xl">
            Software, computational architectures, and interface systems built with focus and care.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          Prototyped & engineered by Sam
        </div>
      </motion.div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {projectCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-zinc-950 text-white font-semibold dark:bg-[#f4f4f5] dark:text-zinc-950 shadow-xs'
                  : 'bg-white hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 border border-zinc-200/90 dark:bg-[#111216] dark:hover:bg-[#181920] dark:text-zinc-400 dark:hover:text-zinc-200 dark:border-[#1f212a]'
              }`}
              aria-pressed={isActive}
            >
              <span>{cat}</span>
              {isActive && (
                <span className="ml-1.5 inline-block w-1 h-1 rounded-full bg-indigo-400 dark:bg-indigo-600 align-middle"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Animated Content Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          className="space-y-8"
        >
          {filteredProjects.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="py-16 text-center rounded-2xl bg-white dark:bg-[#0f1015] border border-zinc-200 dark:border-[#1f212a]"
            >
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-mono mb-3">
                No projects currently cataloged under this category.
              </p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-4 py-1.5 rounded-full text-xs font-mono bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300 dark:bg-[#161720] dark:hover:bg-[#1f212d] dark:text-zinc-300 dark:hover:text-white dark:border-[#272a38] transition-colors"
              >
                View all projects
              </button>
            </motion.div>
          ) : (
            <>
              {/* Featured Project */}
              {featuredProject && (
                <motion.div variants={itemVariants} className="w-full">
                  <ProjectCard project={featuredProject} />
                </motion.div>
              )}

              {/* Grid of Standard Projects */}
              {standardProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standardProjects.map((project) => (
                    <motion.div key={project.id} variants={itemVariants}>
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
