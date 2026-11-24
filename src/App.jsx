import React, { lazy, useEffect, useState } from 'react';
import { LayoutGroup } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModularSection from './components/ModularSection';
import { currentlyBuilding } from './data/building';

// Dynamically imported modular sections
const LazyWork = lazy(() => import('./components/Work'));
const LazyCurrentlyBuilding = lazy(() => import('./components/CurrentlyBuilding'));
const LazyAbout = lazy(() => import('./components/About'));
const LazyCurrentlyCurious = lazy(() => import('./components/CurrentlyCurious'));
const LazyContact = lazy(() => import('./components/Contact'));
const LazyFooter = lazy(() => import('./components/Footer'));

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <LayoutGroup id="profile-nav-transition">
    <div className="relative isolate min-h-screen bg-[#fbfbfd] text-zinc-900 dark:bg-[#09090b] dark:text-[#f4f4f5] selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-white flex flex-col transition-colors duration-250">
      <svg className="ambient-geometry pointer-events-none fixed inset-0 z-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1">
          <circle cx="1250" cy="150" r="190" />
          <circle cx="1250" cy="150" r="150" strokeDasharray="3 10" />
          <circle cx="1250" cy="150" r="110" />
          <path d="M1110 150h280M1250 10v280M1151 51l198 198m0-198-198 198" opacity=".55" />
          <path d="m110 590 105-60 105 60v120l-105 60-105-60V590Z" />
          <path d="m145 610 70-40 70 40v80l-70 40-70-40v-80Z" strokeDasharray="4 8" />
          <path d="M0 360c190-95 300 95 490 0s300 95 490 0 300 95 460 0" opacity=".5" />
          <path d="M0 380c190-95 300 95 490 0s300 95 490 0 300 95 460 0" opacity=".3" />
        </g>
        <g fill="currentColor">
          <circle cx="1050" cy="630" r="2" /><circle cx="1080" cy="660" r="3" />
          <circle cx="1020" cy="690" r="1.5" /><circle cx="340" cy="170" r="2" />
          <circle cx="370" cy="200" r="1.5" /><circle cx="320" cy="225" r="2.5" />
        </g>
      </svg>
      {/* Fixed Navigation Bar with Theme Toggle */}
      <Navbar scrolled={scrolled} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Above-the-fold Critical Section: Hero (Loaded Immediately) */}
        <Hero scrolled={scrolled} />

        {/* Section 02: Work Module */}
        <ModularSection
          id="work"
          minHeight="min-h-[700px]"
          Component={LazyWork}
        />

        {/* Show this section only when verified active projects are available. */}
        {currentlyBuilding.length > 0 && (
          <ModularSection
            id="building"
            minHeight="min-h-[600px]"
            Component={LazyCurrentlyBuilding}
          />
        )}

        {/* Section 04: About Module */}
        <ModularSection
          id="about"
          minHeight="min-h-[650px]"
          Component={LazyAbout}
        />

        {/* Section 05: Currently Curious About Module */}
        <ModularSection
          id="curiosity"
          minHeight="min-h-[700px]"
          Component={LazyCurrentlyCurious}
        />

        {/* Section 06: Contact Module */}
        <ModularSection
          id="contact"
          minHeight="min-h-[500px]"
          Component={LazyContact}
        />
      </main>

      {/* Footer Module */}
      <ModularSection
        id="footer"
        minHeight="min-h-[220px]"
        Component={LazyFooter}
      />
    </div>
    </LayoutGroup>
  );
}
