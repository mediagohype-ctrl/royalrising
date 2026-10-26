"use client";
import type { ImgKey } from "./data";

// Cross-component UI events: any button can open the contact drawer or the lightbox.
export const openContact = () => window.dispatchEvent(new Event("rr:contact"));
export const openLightbox = (keys: ImgKey[], index: number, source?: HTMLElement) =>
  window.dispatchEvent(new CustomEvent("rr:lightbox", { detail: { keys, index, source, sourceKey: keys[index] } }));
