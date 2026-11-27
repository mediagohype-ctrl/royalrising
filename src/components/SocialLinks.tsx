import { contact } from "@/lib/data";

const icons = {
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
};

const links = [
  { key: "instagram", label: `Royal Rising on Instagram (${contact.instagramHandle})`, href: contact.instagram, external: true },
  { key: "facebook", label: "Royal Rising on Facebook", href: contact.facebook, external: true },
  { key: "mail", label: `Email ${contact.email}`, href: `mailto:${contact.email}`, external: false },
] as const;

/** Instagram, Facebook and email icons, shared by the footer, mobile menu and contact drawer. */
export default function SocialLinks({ className = "social", tabIndex, mail = true }: { className?: string; tabIndex?: number; mail?: boolean }) {
  return (
    <div className={className}>
      {links.filter((l) => mail || l.key !== "mail").map((l) => (
        <a key={l.key} href={l.href} aria-label={l.label} title={l.label} tabIndex={tabIndex}
          {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {icons[l.key]}
        </a>
      ))}
    </div>
  );
}
