import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://suhaib-abid.pages.dev'),
  title: {
    default: "Suhaib Abid — Developer, Cybersecurity & Designer",
    template: "%s | Suhaib Abid"
  },
  description: "Suhaib Abid is a full-stack developer, AI student, and designer based in Pakistan. Specializing in high-performance web applications, UI/UX, and secure systems.",
  keywords: ["Suhaib Abid", "Full-stack Developer", "Cybersecurity", "UI/UX Designer", "AI Student", "React Developer", "Next.js", "Pakistan"],
  authors: [{ name: "Suhaib Abid" }],
  creator: "Suhaib Abid",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://suhaib-abid.pages.dev/",
    title: "Suhaib Abid — Developer, Cybersecurity & Designer",
    description: "Full-stack developer, AI student, and designer specializing in high-performance web applications and secure systems.",
    siteName: "Suhaib Abid Portfolio",
    images: [
      {
        url: "/hero.png", // Using the hero image as default OG image
        width: 1200,
        height: 630,
        alt: "Suhaib Abid Portfolio",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suhaib Abid — Developer, Cybersecurity & Designer",
    description: "Full-stack developer, AI student, and designer specializing in high-performance web applications and secure systems.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-white selection:text-brand-black overflow-x-hidden antialiased flex flex-col">
        {/* Film Grain Texture Overlay (SVG Noise) */}
        <svg className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] mix-blend-screen w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
