'use client';

import { useEffect, useRef } from 'react';

export default function ScrollExperience() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.getElementById('profile');
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    const animations = new Set<Animation>();
    const activeBanners = new Set<HTMLElement>();
    let frame = 0;
    let tilted: HTMLElement | null = null;
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveals.unobserve(entry.target);
          if (reduced.matches) continue;
          const animation = entry.target.animate(
            [
              {
                opacity: 0,
                transform: 'perspective(1200px) translateY(48px) rotateX(4deg)',
                filter: 'blur(3px)',
              },
              {
                opacity: 1,
                transform: 'perspective(1200px) translateY(0) rotateX(0)',
                filter: 'blur(0)',
              },
            ],
            { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)' },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        }
      },
      { threshold: 0.08 },
    );
    root
      .querySelectorAll(
        '.profile-introduction > div, .player-card, .impact-strip > div, .profile-section-heading, .chapter-banner, .chapter-story, .chapter-metric, .experience-explorer, .expertise-grid > section, .toolkit-group, .career-entry, .connect-section',
      )
      .forEach((element) => reveals.observe(element));
    const bannerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const banner = entry.target as HTMLElement;
        if (entry.isIntersecting) activeBanners.add(banner);
        else activeBanners.delete(banner);
      });
      schedule();
    });
    root
      .querySelectorAll<HTMLElement>('.chapter-banner')
      .forEach((element) => bannerObserver.observe(element));

    function draw() {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty(
        'transform',
        `scaleX(${total > 0 ? window.scrollY / total : 0})`,
      );
      if (reduced.matches) return;
      for (const banner of activeBanners) {
        const rect = banner.getBoundingClientRect();
        const position =
          (window.innerHeight / 2 - rect.top - rect.height / 2) /
          window.innerHeight;
        banner.style.setProperty(
          '--banner-shift',
          `${Math.max(-30, Math.min(30, position * 65))}px`,
        );
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function resetTilt() {
      if (tilted) {
        tilted.style.removeProperty('--tilt-x');
        tilted.style.removeProperty('--tilt-y');
        tilted.style.removeProperty('--pointer-x');
        tilted.style.removeProperty('--pointer-y');
        tilted = null;
      }
    }
    function move(event: PointerEvent) {
      if (reduced.matches || !fine.matches) return;
      const target = (event.target as HTMLElement).closest<HTMLElement>(
        '.chapter-banner, .player-card, .explorer-image',
      );
      if (target !== tilted) resetTilt();
      if (!target) return;
      tilted = target;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      target.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
      target.style.setProperty('--tilt-y', `${(x - 0.5) * 9}deg`);
      target.style.setProperty('--pointer-x', `${x * 100}%`);
      target.style.setProperty('--pointer-y', `${y * 100}%`);
    }
    function motionChange() {
      if (reduced.matches) {
        animations.forEach((animation) => animation.cancel());
        animations.clear();
        resetTilt();
        root!
          .querySelectorAll<HTMLElement>('.chapter-banner')
          .forEach((element) => element.style.removeProperty('--banner-shift'));
      }
      schedule();
    }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    root.addEventListener('pointermove', move, { passive: true });
    root.addEventListener('pointerleave', resetTilt);
    reduced.addEventListener('change', motionChange);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      reveals.disconnect();
      bannerObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
      resetTilt();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      root.removeEventListener('pointermove', move);
      root.removeEventListener('pointerleave', resetTilt);
      reduced.removeEventListener('change', motionChange);
    };
  }, []);
  return <div className="reading-progress" ref={progress} aria-hidden="true" />;
}
