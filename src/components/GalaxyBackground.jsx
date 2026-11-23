import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function GalaxyBackground({ opacity = 1 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = null;
    let running = false;
    let visible = true;
    let tabActive = !document.hidden;
    let angle = 0;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const W = () => canvas.width;
    const H = () => canvas.height;

    const BG_COUNT = isMobile ? 250 : 550;
    const bgStars = Array.from({ length: BG_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 0.6 + 0.2,
      a: Math.random() * 0.5 + 0.15,
    }));

    const SPIRAL_COUNT = isMobile ? 800 : 1800;
    const ARMS = 3;

    const spiralStars = Array.from({ length: SPIRAL_COUNT }, (_, i) => {
      const arm = i % ARMS;
      const t = Math.pow(Math.random(), 0.6);
      const baseAngle = (arm / ARMS) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.65;
      const twist = t * Math.PI * 2.4;

      return {
        t,
        a: baseAngle + twist + spread,
        r: Math.random() * 1.1 + 0.4,
        alpha: (1 - t * 0.5) * (Math.random() * 0.55 + 0.3),
      };
    });

    const drawFrame = () => {
      const w = W();
      const h = H();
      ctx.clearRect(0, 0, w, h);
      const dark = isDarkRef.current;

      // 1. Far star field
      bgStars.forEach((s) => {
        ctx.fillStyle = dark
          ? `rgba(244,244,245,${s.a})`
          : `rgba(99,102,241,${s.a * 0.5})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Galactic core radial glow
      const cx = w * 0.5;
      const cy = h * 0.5;
      const coreSize = Math.min(w, h) * 0.22;

      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize);
      if (dark) {
        coreGrad.addColorStop(0, 'rgba(224,231,255,0.28)');
        coreGrad.addColorStop(0.18, 'rgba(165,180,252,0.14)');
        coreGrad.addColorStop(0.45, 'rgba(99,102,241,0.06)');
        coreGrad.addColorStop(1, 'rgba(9,9,11,0)');
      } else {
        coreGrad.addColorStop(0, 'rgba(99,102,241,0.18)');
        coreGrad.addColorStop(0.3, 'rgba(129,140,248,0.08)');
        coreGrad.addColorStop(1, 'rgba(251,251,253,0)');
      }
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize, 0, Math.PI * 2);
      ctx.fill();

      // 3. Cosmic dust haze
      const dustSize = Math.min(w, h) * 0.46;
      const dustGrad = ctx.createRadialGradient(cx, cy, dustSize * 0.1, cx, cy, dustSize);
      if (dark) {
        dustGrad.addColorStop(0, 'rgba(79,70,229,0.08)');
        dustGrad.addColorStop(0.4, 'rgba(49,46,129,0.04)');
        dustGrad.addColorStop(1, 'rgba(9,9,11,0)');
      } else {
        dustGrad.addColorStop(0, 'rgba(99,102,241,0.05)');
        dustGrad.addColorStop(1, 'rgba(251,251,253,0)');
      }
      ctx.fillStyle = dustGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, dustSize, 0, Math.PI * 2);
      ctx.fill();

      // 4. Spiral arms
      const diskRadius = Math.min(w, h) * 0.44;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(1, 0.42);

      spiralStars.forEach((s) => {
        const radius = s.t * diskRadius;
        const x = Math.cos(s.a) * radius;
        const y = Math.sin(s.a) * radius;
        const col = dark
          ? `rgba(224,231,255,${s.alpha})`
          : `rgba(79,70,229,${s.alpha * 0.7})`;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // 5. Central bright core cap
      const capGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreSize * 0.35);
      if (dark) {
        capGrad.addColorStop(0, 'rgba(255,255,255,0.22)');
        capGrad.addColorStop(0.4, 'rgba(224,231,255,0.10)');
        capGrad.addColorStop(1, 'rgba(199,210,254,0)');
      } else {
        capGrad.addColorStop(0, 'rgba(99,102,241,0.22)');
        capGrad.addColorStop(1, 'rgba(251,251,253,0)');
      }
      ctx.fillStyle = capGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreSize * 0.35, 0, Math.PI * 2);
      ctx.fill();

      if (!shouldReduceMotion) {
        angle += 0.00028;
      }
    };

    const startLoop = () => {
      if (running || shouldReduceMotion) {
        if (shouldReduceMotion) drawFrame();
        return;
      }
      running = true;
      const loop = () => {
        if (!running) return;
        drawFrame();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    };

    const stopLoop = () => {
      running = false;
      if (raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        visible && tabActive ? startLoop() : stopLoop();
      },
      { threshold: 0.03, rootMargin: '120px 0px 120px 0px' }
    );
    observer.observe(container);

    const onVisibility = () => {
      tabActive = !document.hidden;
      tabActive && visible ? startLoop() : stopLoop();
    };
    document.addEventListener('visibilitychange', onVisibility);

    const onResize = () => {
      resize();
    };
    window.addEventListener('resize', onResize);

    if (visible && tabActive) startLoop();
    else drawFrame();

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Theme-adaptive masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfd]/80 via-transparent to-[#fbfbfd]/90 dark:from-[#09090b]/75 dark:via-transparent dark:to-[#09090b]/90 pointer-events-none transition-colors duration-250" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#fbfbfd]/60 via-transparent to-[#fbfbfd]/60 dark:from-[#09090b]/60 dark:via-transparent dark:to-[#09090b]/60 pointer-events-none transition-colors duration-250" />
    </div>
  );
}
