import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CosmicHorizon() {
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

    let animationFrameId = null;
    let isRunning = false;
    let isVisible = true;
    let isTabActive = !document.hidden;

    let width = (canvas.width = container.clientWidth || window.innerWidth);
    let height = (canvas.height = container.clientHeight || 600);

    const isMobile = window.innerWidth < 768;
    const particleCount = shouldReduceMotion ? 0 : isMobile ? 70 : 180;

    let mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 };
    let tilt = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const coreRadius = isMobile ? 36 : 52;
    const diskRadius = isMobile ? 150 : 230;

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        const u = Math.random();
        this.radius = coreRadius * 1.08 + Math.pow(u, 2.2) * (diskRadius - coreRadius);
        this.angle = initial ? Math.random() * Math.PI * 2 : 0;
        this.speed = (Math.sqrt(coreRadius / this.radius) * 0.016 + 0.003) * (0.8 + Math.random() * 0.4);
        this.z = (Math.random() - 0.5) * 18;
        this.size = Math.random() * 1.4 + 0.6;
        this.baseAlpha = Math.random() * 0.6 + 0.25;
        this.alpha = this.baseAlpha;
      }

      update() {
        this.angle += this.speed;
        if (this.angle > Math.PI * 2) {
          this.angle -= Math.PI * 2;
        }
        const doppler = Math.sin(this.angle) * 0.22;
        this.alpha = Math.max(0.12, Math.min(0.85, this.baseAlpha + doppler));
      }

      draw(centerX, centerY, tiltX, tiltY, dark) {
        const diskTilt = 0.38 + tiltY * 0.14;
        const cosAngle = Math.cos(this.angle + tiltX * 0.45);
        const sinAngle = Math.sin(this.angle + tiltX * 0.45);

        const x = centerX + cosAngle * this.radius;
        const y = centerY + sinAngle * this.radius * diskTilt + this.z * (1 - diskTilt);

        // Hide particles eclipsed directly behind the event horizon
        if (sinAngle < 0) {
          const dist = Math.hypot(x - centerX, (y - centerY) / diskTilt);
          if (dist < coreRadius * 0.95) return;
        }

        const color = dark
          ? `rgba(224, 231, 255, ${this.alpha})`
          : `rgba(79, 70, 229, ${this.alpha * 0.8})`;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = Array.from({ length: particleCount }, () => new Particle());

    const handleResize = () => {
      if (!container) return;
      width = canvas.width = container.clientWidth || window.innerWidth;
      height = canvas.height = container.clientHeight || 600;
      if (!isRunning && isVisible && isTabActive && !shouldReduceMotion) {
        startLoop();
      }
    };

    const handleMouseMove = (e) => {
      if (!isVisible || !isTabActive) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.targetX = x;
      mouse.targetY = y;
      tilt.targetX = (x / width - 0.5) * 1.1;
      tilt.targetY = (y / height - 0.5) * 1.1;
    };

    const handleMouseLeave = () => {
      tilt.targetX = 0;
      tilt.targetY = 0;
    };

    const render = () => {
      if (!isRunning) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      tilt.x += (tilt.targetX - tilt.x) * 0.04;
      tilt.y += (tilt.targetY - tilt.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.48;
      const dark = isDarkRef.current;

      // 1. Outer Gravitational Lensing Glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        coreRadius * 0.7,
        centerX,
        centerY,
        diskRadius * 1.15
      );
      if (dark) {
        outerGlow.addColorStop(0, 'rgba(99, 102, 241, 0.11)');
        outerGlow.addColorStop(0.35, 'rgba(79, 70, 229, 0.04)');
        outerGlow.addColorStop(0.7, 'rgba(30, 27, 75, 0.015)');
        outerGlow.addColorStop(1, 'rgba(9, 9, 11, 0)');
      } else {
        outerGlow.addColorStop(0, 'rgba(99, 102, 241, 0.10)');
        outerGlow.addColorStop(0.4, 'rgba(129, 140, 248, 0.04)');
        outerGlow.addColorStop(1, 'rgba(251, 251, 253, 0)');
      }

      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, diskRadius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 2. Back particles
      for (let i = 0; i < particles.length; i++) {
        if (Math.sin(particles[i].angle) < 0) {
          particles[i].update();
          particles[i].draw(centerX, centerY, tilt.x, tilt.y, dark);
        }
      }

      // 3. Gravitational Photon Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 1.04, 0, Math.PI * 2);
      ctx.strokeStyle = dark ? 'rgba(165, 180, 252, 0.42)' : 'rgba(99, 102, 241, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = dark ? 'rgba(129, 140, 248, 0.5)' : 'rgba(99, 102, 241, 0.35)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Black Hole Event Horizon Singularity Void
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = dark ? '#070709' : '#14151f';
      ctx.fill();

      // 5. Front particles
      for (let i = 0; i < particles.length; i++) {
        if (Math.sin(particles[i].angle) >= 0) {
          particles[i].update();
          particles[i].draw(centerX, centerY, tilt.x, tilt.y, dark);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (isRunning || shouldReduceMotion) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (!isRunning) return;
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isTabActive) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05, rootMargin: '100px 0px 100px 0px' }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    if (isVisible && isTabActive && !shouldReduceMotion) {
      startLoop();
    } else {
      render();
      stopLoop();
    }

    return () => {
      stopLoop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-85 transition-opacity duration-700"
        aria-hidden="true"
      />
      {/* Dynamic theme fade masks */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#fbfbfd]/40 to-[#fbfbfd] dark:via-[#09090b]/40 dark:to-[#09090b] pointer-events-none transition-colors duration-250" />
    </div>
  );
}
