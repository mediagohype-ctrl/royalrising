"use client";
// Fires once the preloader has lifted, so intro animations play in view.
const EVENT = "rr:ready";
const PRELOADER_SEEN = "rr:preloader-seen";

export function hasSeenPreloader() {
  if (typeof window === "undefined") return false;
  if (window.__rrReady) return true;
  try {
    return window.sessionStorage.getItem(PRELOADER_SEEN) === "1";
  } catch {
    return false;
  }
}

declare global {
  interface Window {
    __rrReady?: boolean;
  }
}

export function markReady() {
  try {
    window.sessionStorage.setItem(PRELOADER_SEEN, "1");
  } catch {
    // The in-memory flag still handles navigation if storage is unavailable.
  }
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
