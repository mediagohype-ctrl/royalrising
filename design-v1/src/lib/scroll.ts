"use client";
import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  lenis = l;
};

export function scrollToTarget(target: string | number | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.8, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

export const lockScroll = () => {
  lenis?.stop();
  document.documentElement.classList.add("is-locked");
};
export const unlockScroll = () => {
  lenis?.start();
  document.documentElement.classList.remove("is-locked");
};
