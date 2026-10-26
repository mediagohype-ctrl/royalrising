"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { contact } from "@/lib/data";
import { lockScroll, unlockScroll } from "@/lib/scroll";

const types = ["Private villa", "Mansion / estate", "Residential building", "Temple / mandir", "Interior", "Other"];

/** Slide-in enquiry panel, opened by any "Let's Talk" / "Let's Connect" button. */
export default function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(types[0]);
  const panel = useRef<HTMLElement>(null);
  const [mailOpened, setMailOpened] = useState(false);

  useEffect(() => {
    const show = () => { setMailOpened(false); setOpen(true); };
    window.addEventListener("rr:contact", show);
    return () => window.removeEventListener("rr:contact", show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    lockScroll();
    panel.current?.scrollTo(0, 0);
    panel.current?.querySelector<HTMLButtonElement>(".drawer__close")?.focus({ preventScroll: true });
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key !== "Tab") return;
      const elements = Array.from(panel.current?.querySelectorAll<HTMLElement>('button, a[href], input:not([type="radio"]), input[type="radio"]:checked, textarea') ?? []);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first?.focus();
      }
    };
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      unlockScroll();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open]);

  // No backend yet: hand the enquiry to the visitor's mail app, pre-filled.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Project enquiry: ${type}`;
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone") || "-"}\nProject: ${type}\n\n${f.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setMailOpened(true);
  };

  return (
    <div className={`drawer${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="drawer__backdrop" onClick={() => setOpen(false)} />
      <aside ref={panel} className="drawer__panel" data-lenis-prevent role="dialog" aria-modal="true" aria-label="Start a project">
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
            Continue in email <span aria-hidden>↗</span>
          </button>
          <p className="para" role="status">
            {mailOpened ? "Your email app should open with your enquiry. Send it there to complete your request. If nothing opens, email us at " + contact.email + "." : "Opens your email app with your project details ready to send."}
          </p>
        </form>
        <a className="drawer__mail" href={`mailto:${contact.email}`} tabIndex={open ? 0 : -1}>
          {contact.email}
        </a>
      </aside>
    </div>
  );
}
