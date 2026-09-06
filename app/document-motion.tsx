'use client';

import { useEffect, useRef } from 'react';

/** Enhance the printed document; the complete page stays readable without JS. */
export default function DocumentMotion() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = progress.current?.closest('main');
    if (!root) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const printing = matchMedia('print');
    const animations = new Set<Animation>();
    const visible = new Set<HTMLElement>();
    const links = Array.from(
      root.querySelectorAll<HTMLAnchorElement>(
        '.case-outline nav a, .resume-index a, .hiring-page .resume-jump-links a',
      ),
    );
    const chapters = links
      .map((link) => ({
        link,
        section: document.getElementById(link.hash.slice(1)),
      }))
      .filter((item) => item.section);
    let frame = 0;

    const reveals = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          reveals.unobserve(entry.target);
          if (reduced.matches || printing.matches) return;
          const animation = entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(28px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            {
              duration: 780,
              delay: Math.min(index, 3) * 65,
              easing: 'cubic-bezier(.16,1,.3,1)',
              fill: 'backwards',
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.06 },
    );

    root
      .querySelectorAll(
        '.document-heading > *, .impact-strip > div, .case-narrative section, .case-flow, .case-product > h2, .experience-explorer, .related-work > *, .resume-content > h2, .resume-job > div, .resume-job > p, .resume-job > ul, .consulting-service > div, .consulting-process li, .consulting-contact, .candidate-facts > div',
      )
      .forEach((element) => reveals.observe(element));

    const visibility = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;
        element.dataset.inView = String(entry.isIntersecting);
        if (entry.isIntersecting) visible.add(element);
        else visible.delete(element);
      });
      schedule();
    });
    root
      .querySelectorAll<HTMLElement>(
        '.field-instrument, .archive-cover, .resume-job, .case-flow',
      )
      .forEach((element) => visibility.observe(element));

    function draw() {
      frame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      progress.current?.style.setProperty(
        'transform',
        `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`,
      );
      const active = chapters.findLast(
        ({ section }) =>
          section!.getBoundingClientRect().top <
          Math.min(150, innerHeight * 0.25),
      );
      for (const { link } of chapters) {
        if (link === active?.link)
          link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
      for (const element of visible) {
        const rect = element.getBoundingClientRect();
        const position = Math.min(
          1,
          Math.max(
            0,
            (innerHeight * 0.65 - rect.top) / Math.max(rect.height, 1),
          ),
        );
        element.style.setProperty('--entry-progress', String(position));
        if (!reduced.matches) {
          const drift = Math.min(
            1,
            Math.max(
              -1,
              (innerHeight / 2 - rect.top - rect.height / 2) / innerHeight,
            ),
          );
          element.style.setProperty('--paper-shift', `${drift * 22}px`);
          element.style.setProperty('--scroll-tilt', `${drift * 5}deg`);
        }
      }
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function finishMotion() {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      for (const element of visible) {
        element.style.removeProperty('--paper-shift');
        element.style.removeProperty('--scroll-tilt');
      }
      schedule();
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    addEventListener('beforeprint', finishMotion);
    reduced.addEventListener('change', finishMotion);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      reveals.disconnect();
      visibility.disconnect();
      animations.forEach((animation) => animation.cancel());
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      removeEventListener('beforeprint', finishMotion);
      reduced.removeEventListener('change', finishMotion);
    };
  }, []);

  return (
    <div
      className="document-reading-progress"
      ref={progress}
      aria-hidden="true"
    />
  );
}
