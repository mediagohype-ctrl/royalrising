"use client";
import type { ImgKey } from "./data";

// Cross-component UI events: any button can open the contact drawer or the lightbox.
export const openContact = () => window.dispatchEvent(new Event("rr:contact"));
export const openLightbox = (keys: ImgKey[], index: number) =>
  window.dispatchEvent(new CustomEvent("rr:lightbox", { detail: { keys, index } }));
