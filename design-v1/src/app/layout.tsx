import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Cinzel } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const sans = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-sans" });
const roman = Cinzel({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-roman" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.royalrising.in"),
  title: "Royal Rising | Architecture · Interior · Construction",
  description:
    "Royal Rising designs and builds sculpted homes, palaces and sacred spaces: Twin Palace with Mandir, Futuristic Home & Mandir, Organic Residence, Villa 145 and the H-Shaped Mansion.",
  openGraph: {
    title: "Royal Rising",
    description: "Architecture · Interior · Construction",
    images: ["/images/fh-night.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${roman.variable}`}>
      {/* Browser extensions (e.g. ColorZilla) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
