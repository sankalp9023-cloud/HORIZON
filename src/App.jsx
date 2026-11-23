import React, { lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModularSection from './components/ModularSection';

// Dynamically imported modular sections
const LazyWork = lazy(() => import('./components/Work'));
const LazyCurrentlyBuilding = lazy(() => import('./components/CurrentlyBuilding'));
const LazyAbout = lazy(() => import('./components/About'));
const LazyCurrentlyCurious = lazy(() => import('./components/CurrentlyCurious'));
const LazyContact = lazy(() => import('./components/Contact'));
const LazyFooter = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-zinc-900 dark:bg-[#09090b] dark:text-[#f4f4f5] selection:bg-indigo-500/20 selection:text-indigo-900 dark:selection:text-white flex flex-col transition-colors duration-250">
      {/* Fixed Navigation Bar with Theme Toggle */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Above-the-fold Critical Section: Hero (Loaded Immediately) */}
        <Hero />

        {/* Section 02: Work Module */}
        <ModularSection
          id="work"
          minHeight="min-h-[700px]"
          Component={LazyWork}
        />

        {/* Section 03: Currently Building Module */}
        <ModularSection
          id="building"
          minHeight="min-h-[600px]"
          Component={LazyCurrentlyBuilding}
        />

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
  );
}
