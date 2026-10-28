import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";

// Geometric sans in the Futura family
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.royalrising.in"),
  title: "Royal Rising | Architecture · Interior · Construction",
  description:
    "Royal Rising designs and builds sculpted homes, palaces and sacred spaces: Twin Palace with Mandir, Futuristic Home & Mandir, Organic Residence, Villa 145 and the H-Shaped Mansion.",
  openGraph: {
    title: "Royal Rising",
    description: "Architecture · Interior · Construction",
    images: ["/images/fh-day.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f0e7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      {/* Browser extensions (e.g. ColorZilla) inject attributes on <body> before hydration */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
