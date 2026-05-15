/** Global Lenis instance — registered from SmoothScroll provider */
let lenisInstance = null;

export function registerLenis(instance) {
  lenisInstance = instance;
}

export function unregisterLenis() {
  lenisInstance = null;
}

export function getLenis() {
  return lenisInstance;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth-scroll to an element id, selector, or DOM node.
 * Uses Lenis when available; falls back to native scroll.
 */
export function scrollToTarget(target, options = {}) {
  if (typeof window === 'undefined') return;

  const { offset = -96, duration = 1.15, immediate = false } = options;

  let el = null;
  if (typeof target === 'string') {
    const id = target.replace(/^#/, '');
    el = document.getElementById(id) ?? document.querySelector(target.startsWith('#') || target.startsWith('.') ? target : `#${id}`);
  } else {
    el = target;
  }

  if (!el) return;

  if (lenisInstance && !prefersReducedMotion()) {
    lenisInstance.scrollTo(el, { offset, duration, immediate });
    return;
  }

  el.scrollIntoView({ behavior: immediate ? 'auto' : 'smooth', block: 'start' });
}
