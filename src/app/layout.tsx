import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { preload } from "react-dom";
import "./globals.css";
import { contact } from "@/lib/data";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Royal Rising",
  url: contact.websiteUrl,
  email: contact.email,
  logo: `${contact.websiteUrl}/icon.png`,
  sameAs: [contact.instagram, contact.facebook],
};

// Editorial serif headings paired with a quiet, readable sans.
// Keep font assets local so builds do not depend on Google Fonts URL parsing.
const sans = localFont({
  src: "./fonts/LibreFranklin.ttf",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-sans",
});
const display = localFont({
  src: "./fonts/CormorantGaramond.ttf",
  weight: "300 700",
  style: "normal",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.royalrising.in"),
  title: "Royal Rising | Architecture · Interior · Construction",
  description:
    "Royal Rising is an architecture, interior design and construction studio for private residences, estates and luxury interiors.",
  openGraph: {
    title: "Royal Rising",
    description: "Architecture · Interior · Construction",
    images: ["/images/projects/formal-living.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // The loading screen opens on the logo, so fetch it before anything else.
  preload("/images/logo-mark.webp", { as: "image", fetchPriority: "high" });
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      {/* Browser extensions (e.g. ColorZilla) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {children}
      </body>
    </html>
  );
}
