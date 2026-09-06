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
    const activeInstruments = new Set<HTMLElement>();
    let frame = 0;
    let tilted: HTMLElement | null = null;
    const reveals = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveals.unobserve(entry.target);
          entry.target.setAttribute('data-in-view', 'true');
          if (entry.target.matches('.field-instrument')) continue;
          if (reduced.matches) continue;
          const animation = entry.target.animate(
            [
              {
                opacity: 0,
                transform: 'translateY(28px)',
              },
              {
                opacity: 1,
                transform: 'translateY(0)',
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
        '.profile-introduction > div, .player-card, .impact-strip > div, .profile-section-heading, .career-heading, .field-instrument, .career-scope-item, .experience-explorer, .expertise-grid > section, .toolkit-group, .career-entry, .connect-section',
      )
      .forEach((element) => reveals.observe(element));
    const instrumentObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const instrument = entry.target as HTMLElement;
        if (entry.isIntersecting) activeInstruments.add(instrument);
        else activeInstruments.delete(instrument);
      });
      schedule();
    });
    root
      .querySelectorAll<HTMLElement>('.field-instrument')
      .forEach((element) => instrumentObserver.observe(element));

    function draw() {
      frame = 0;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      progress.current?.style.setProperty(
        'transform',
        `scaleX(${total > 0 ? window.scrollY / total : 0})`,
      );
      if (reduced.matches) return;
      for (const instrument of activeInstruments) {
        const rect = instrument.getBoundingClientRect();
        const position =
          (window.innerHeight / 2 - rect.top - rect.height / 2) /
          window.innerHeight;
        instrument.style.setProperty(
          '--paper-shift',
          `${Math.max(-8, Math.min(8, position * 18))}px`,
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
        '.player-card, .explorer-image',
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
          .querySelectorAll<HTMLElement>('.field-instrument')
          .forEach((element) => element.style.removeProperty('--paper-shift'));
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
      instrumentObserver.disconnect();
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
