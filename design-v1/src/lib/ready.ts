"use client";
// Fires once the preloader has lifted, so intro animations play in view.
const EVENT = "rr:ready";

declare global {
  interface Window {
    __rrReady?: boolean;
  }
}

export function markReady() {
  if (window.__rrReady) return;
  window.__rrReady = true;
  window.dispatchEvent(new Event(EVENT));
}

export function onReady(cb: () => void) {
  if (window.__rrReady) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
