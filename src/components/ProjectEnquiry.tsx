"use client";

import { openContact } from "@/lib/events";

export default function ProjectEnquiry() {
  return <button className="pill" onClick={openContact}>Let&apos;s talk <span aria-hidden>↗</span></button>;
}
