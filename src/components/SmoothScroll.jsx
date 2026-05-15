import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { registerLenis, unregisterLenis, prefersReducedMotion } from '@/lib/smooth-scroll';

/**
 * App-wide smooth scroll (Lenis) — pairs with framer-motion scroll animations.
 * Respects prefers-reduced-motion.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      infinite: false,
    });

    registerLenis(lenis);
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const id = hash.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      lenis.scrollTo(`#${id}`, { offset: -96, duration: 1.1 });
    };
    document.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleClick);
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      lenis.destroy();
      unregisterLenis();
    };
  }, []);

  return children;
}
