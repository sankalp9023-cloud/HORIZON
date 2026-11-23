import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['work', 'building', 'about', 'curiosity', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }

      if (window.scrollY < 180) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Building', href: '#building', id: 'building' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Curiosity', href: '#curiosity', id: 'curiosity' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    const sectionId = href.replace('#', '');
    window.dispatchEvent(new CustomEvent('horizon:request-section', { detail: { id: sectionId } }));
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fbfbfd]/85 dark:bg-[#09090b]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-[#1f2128]/80 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Name — HORIZON */}
        <a
          href="#"
          className="group flex items-center gap-2.5 text-lg font-medium tracking-wider text-zinc-900 dark:text-[#f4f4f5] hover:opacity-90 transition-opacity"
        >
          {/* Horizon Icon Mark */}
          <span className="relative flex items-center justify-center w-5 h-5 rounded-full border border-zinc-300 dark:border-zinc-700/80 group-hover:border-zinc-500 transition-colors">
            <span className="w-2.5 h-[1.5px] bg-indigo-600 dark:bg-indigo-400"></span>
          </span>
          <span className="font-mono tracking-widest text-sm font-bold uppercase">HORIZON</span>
        </a>

        {/* Desktop Navigation Links & Theme Toggle */}
        <div className="hidden md:flex items-center gap-7">
          <nav className="flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative py-1 tracking-wide transition-colors duration-150 ${
                    isActive
                      ? 'text-zinc-950 dark:text-white font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-[#9ca3af] dark:hover:text-[#f4f4f5]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="w-[1px] h-4 bg-zinc-200 dark:bg-zinc-800" />

          {/* Sun / Moon Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile Header Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle className="scale-90" />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-zinc-600 hover:text-zinc-950 dark:text-[#9ca3af] dark:hover:text-[#f4f4f5] p-2 focus:outline-none cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fbfbfd]/98 dark:bg-[#0d0e12]/98 backdrop-blur-xl border-b border-zinc-200 dark:border-[#20222a] px-6 py-6 transition-all duration-200 shadow-xl">
          <div className="flex flex-col gap-3 text-base">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-zinc-600 hover:text-zinc-950 dark:text-[#9ca3af] dark:hover:text-[#f4f4f5] font-medium py-2.5 border-b border-zinc-100 dark:border-[#1a1c24] flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
