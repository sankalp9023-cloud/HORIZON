import React, { useState, useEffect, useRef, Suspense } from 'react';

export default function ModularSection({
  id,
  minHeight = 'min-h-[500px]',
  Component,
  priority = false
}) {
  const [shouldLoad, setShouldLoad] = useState(priority);
  const sectionRef = useRef(null);

  useEffect(() => {
    // If already priority or loaded, no need to observe
    if (shouldLoad) return;

    // Check if the current URL hash requests this section directly
    if (window.location.hash === `#${id}`) {
      setShouldLoad(true);
      return;
    }

    const element = sectionRef.current;
    if (!element) return;

    // Trigger load when section is approaching within 450px of viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '450px 0px 450px 0px', threshold: 0 }
    );

    observer.observe(element);

    // Global event listener for instant navigation requests from Navbar
    const handleNavigationRequest = (e) => {
      if (e.detail?.id === id) {
        setShouldLoad(true);
      }
    };
    window.addEventListener('horizon:request-section', handleNavigationRequest);

    return () => {
      observer.disconnect();
      window.removeEventListener('horizon:request-section', handleNavigationRequest);
    };
  }, [id, shouldLoad]);

  return (
    <div ref={sectionRef} id={id} className={`w-full ${minHeight} scroll-mt-20 relative`}>
      {shouldLoad ? (
        <Suspense fallback={<SectionSkeleton minHeight={minHeight} />}>
          <Component />
        </Suspense>
      ) : (
        <SectionSkeleton minHeight={minHeight} />
      )}
    </div>
  );
}

function SectionSkeleton({ minHeight }) {
  return (
    <div
      className={`w-full ${minHeight} flex flex-col justify-center items-center py-24 px-6 sm:px-8 max-w-6xl mx-auto`}
      aria-hidden="true"
    >
      <div className="w-full h-8 bg-zinc-200/80 dark:bg-[#111216]/60 rounded-lg animate-pulse mb-6 max-w-sm" />
      <div className="w-full h-4 bg-zinc-200/60 dark:bg-[#111216]/40 rounded-md animate-pulse mb-12 max-w-lg" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="h-64 bg-zinc-100/80 dark:bg-[#0f1015]/60 border border-zinc-200 dark:border-[#1b1d26] rounded-2xl animate-pulse" />
        <div className="h-64 bg-zinc-100/80 dark:bg-[#0f1015]/60 border border-zinc-200 dark:border-[#1b1d26] rounded-2xl animate-pulse" />
        <div className="h-64 bg-zinc-100/80 dark:bg-[#0f1015]/60 border border-zinc-200 dark:border-[#1b1d26] rounded-2xl animate-pulse" />
      </div>
    </div>
  );
}
