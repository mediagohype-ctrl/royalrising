import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
    "Royal Rising brings architecture, interior design and construction together to create thoughtful homes and considered living spaces.",
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
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      {/* Browser extensions (e.g. ColorZilla) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
