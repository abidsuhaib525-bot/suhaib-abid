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
  title: "Suhaib Abid — Developer, Cybersecurity & Designer",
  description: "Suhaib Abid — full-stack developer and designer based in Faisalabad, Pakistan. Working remotely worldwide on web design, full-stack development, UI/UX, branding, motion, and SEO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} style={{ colorScheme: 'dark' }}>
      <body className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-white selection:text-brand-black overflow-x-hidden antialiased flex flex-col">
        {/* Film Grain Texture Overlay */}
        <div className="fixed inset-0 z-[100] pointer-events-none opacity-5 mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />
        
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
