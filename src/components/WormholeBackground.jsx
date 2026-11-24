import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function WormholeBackground({ opacity = 1, focalPointX = 0.5 }) {
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
    let tick = 0;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const RING_COUNT = isMobile ? 18 : 30;
    const PARTICLE_COUNT = isMobile ? 50 : 130;

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 0.42 + 0.08,
      speed: (Math.random() * 0.004 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
      size: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      drift: (Math.random() - 0.5) * 0.0008,
    }));

    const drawFrame = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w * (window.innerWidth < 768 ? 0.5 : focalPointX);
      const cy = h * 0.5;
      const baseRadius = Math.min(w, h) * 0.38;
      const dark = isDarkRef.current;

      const rot = shouldReduceMotion ? 0 : tick * 0.0004;
      const zoomPulse = shouldReduceMotion ? 1 : 1 + Math.sin(tick * 0.012) * 0.012;

      // 1. Deep ambient glow
      const voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.55);
      if (dark) {
        voidGrad.addColorStop(0, 'rgba(30,27,75,0.22)');
        voidGrad.addColorStop(0.4, 'rgba(14,13,45,0.12)');
        voidGrad.addColorStop(1, 'rgba(9,9,11,0)');
      } else {
        voidGrad.addColorStop(0, 'rgba(99,102,241,0.08)');
        voidGrad.addColorStop(0.5, 'rgba(165,180,252,0.03)');
        voidGrad.addColorStop(1, 'rgba(251,251,253,0)');
      }
      ctx.fillStyle = voidGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // 2. Tunnel rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      for (let i = RING_COUNT; i >= 0; i--) {
        const t = i / RING_COUNT;
        const radius = baseRadius * zoomPulse * Math.pow(t, 0.68);
        const alphaRing = (t * 0.55 + 0.04) * (dark ? 1 : 0.65);
        const lineW = t * 2.0 + 0.4;

        let r, g, b;
        if (dark) {
          r = Math.round(80 + 175 * (1 - t));
          g = Math.round(80 + 151 * (1 - t));
          b = Math.round(200 + 55 * (1 - t));
        } else {
          r = Math.round(79 + 50 * (1 - t));
          g = Math.round(70 + 60 * (1 - t));
          b = Math.round(229 + 20 * (1 - t));
        }

        ctx.strokeStyle = `rgba(${r},${g},${b},${alphaRing})`;
        ctx.lineWidth = lineW;
        ctx.shadowColor = `rgba(${r},${g},${b},${dark ? 0.35 : 0.15})`;
        ctx.shadowBlur = t < 0.3 ? 8 : 2;

        ctx.beginPath();
        ctx.save();
        ctx.scale(1, 0.55 + 0.45 * t);
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.restore();
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      ctx.restore();

      // 3. Central luminous opening
      const mouthRadius = baseRadius * zoomPulse * 0.09;
      const mouthGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, mouthRadius * 5.5);
      if (dark) {
        mouthGrad.addColorStop(0, 'rgba(255,255,255,0.80)');
        mouthGrad.addColorStop(0.08, 'rgba(224,231,255,0.60)');
        mouthGrad.addColorStop(0.22, 'rgba(165,180,252,0.28)');
        mouthGrad.addColorStop(0.55, 'rgba(99,102,241,0.08)');
        mouthGrad.addColorStop(1, 'rgba(9,9,11,0)');
      } else {
        mouthGrad.addColorStop(0, 'rgba(99,102,241,0.45)');
        mouthGrad.addColorStop(0.25, 'rgba(129,140,248,0.20)');
        mouthGrad.addColorStop(1, 'rgba(251,251,253,0)');
      }
      ctx.fillStyle = mouthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, mouthRadius * 5.5, 0, Math.PI * 2);
      ctx.fill();

      // 4. Shimmer particles
      particles.forEach((p) => {
        p.angle += p.speed;
        p.radius += p.drift;
        if (p.radius > 0.5 || p.radius < 0.04) p.drift *= -1;

        const orbR = baseRadius * zoomPulse * p.radius * 0.6;
        const px = cx + Math.cos(p.angle + rot * 1.6) * orbR;
        const py = cy + Math.sin(p.angle + rot * 1.6) * orbR * 0.55;

        ctx.fillStyle = dark
          ? `rgba(199,210,254,${p.alpha})`
          : `rgba(79,70,229,${p.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!shouldReduceMotion) tick++;
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
  }, [focalPointX, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Theme-adaptive masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fbfbfd]/80 via-[#fbfbfd]/30 to-[#fbfbfd]/85 dark:from-[#09090b]/80 dark:via-[#09090b]/30 dark:to-[#09090b]/85 pointer-events-none transition-colors duration-250" />
    </div>
  );
}
