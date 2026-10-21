"use client";
import { useEffect, useState, type FormEvent } from "react";
import { contact } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll";

const types = ["Private villa", "Mansion / estate", "Residential building", "Temple / mandir", "Interior", "Other"];

/** Slide-in enquiry panel, opened by any "Let's Talk" / "Let's Connect" button. */
export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(types[0]);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("rr:contact", show);
    return () => window.removeEventListener("rr:contact", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      unlockScroll();
    };
  }, [open]);

  // No backend yet: hand the enquiry to the visitor's mail app, pre-filled.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Project enquiry: ${type}`;
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone") || "-"}\nProject: ${type}\n\n${f.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={`drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer__backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Start a project">
        <button className="drawer__close" onClick={() => setOpen(false)} aria-label="Close" tabIndex={open ? 0 : -1}>
          ✕
        </button>
        <h2 className="title">Let&apos;s Talk</h2>
        <p className="para">Tell us about your site and what you imagine. We reply to every enquiry personally.</p>
        <form onSubmit={submit}>
          <fieldset className="chips">
            <legend className="label">I&apos;m planning a</legend>
            {types.map((t) => (
              <label key={t} className={type === t ? "is-on" : ""}>
                <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} tabIndex={open ? 0 : -1} />
                {t}
              </label>
            ))}
          </fieldset>
          <label className="field">
            <input name="name" required placeholder=" " autoComplete="name" tabIndex={open ? 0 : -1} />
            <span>Your name</span>
          </label>
          <label className="field">
            <input name="email" type="email" required placeholder=" " autoComplete="email" tabIndex={open ? 0 : -1} />
            <span>Email</span>
          </label>
          <label className="field">
            <input name="phone" type="tel" placeholder=" " autoComplete="tel" tabIndex={open ? 0 : -1} />
            <span>Phone (optional)</span>
          </label>
          <label className="field">
            <textarea name="message" rows={3} required placeholder=" " tabIndex={open ? 0 : -1} />
            <span>Your project</span>
          </label>
          <button type="submit" className="pill pill--lg" tabIndex={open ? 0 : -1}>
            Send enquiry <span aria-hidden>↗</span>
          </button>
        </form>
        <a className="drawer__mail" href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
          {contact.email}
        </a>
      </aside>
    </div>
  );
}
