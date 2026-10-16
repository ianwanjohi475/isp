import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/sora";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SNET Networks — Fast, Stable & Reliable Internet",
    template: "%s · SNET Networks",
  },
  description:
    "Affordable hotspot Wi-Fi from KSh 10, monthly home & business internet and Smart TV binding. SNET Networks — fast, stable, reliable network.",
  keywords: ["SNET Networks", "hotspot", "Wi-Fi", "internet provider", "ISP Kenya", "TV binding", "home internet"],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "SNET Networks — Fast, Stable & Reliable Internet",
    description: "Hotspot Wi-Fi from KSh 10 · Monthly plans from KSh 1,500 · Smart TV binding KSh 499.",
  },
};

export const viewport: Viewport = {
  themeColor: "#040b1f",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
