"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
  { label: "HOME", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "EDUCATION", href: "#education" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      // Background blur trigger
      setIsScrolled(window.scrollY > 50);

      const sections = navLinks.map(link => link.href.substring(1)).filter(Boolean);
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Highlight the section if its top has crossed the middle of the screen
          if (rect.top <= window.innerHeight * 0.5) {
            current = section;
          }
        }
      }
      
      // Default to home if at the very top
      if (window.scrollY < 100) {
        current = "";
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out px-6 md:px-12 py-8",
        isScrolled 
          ? "bg-brand-black/90 backdrop-blur-xl py-5 border-b border-white/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
          : "bg-gradient-to-b from-brand-black/80 via-brand-black/30 to-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold tracking-tighter text-white drop-shadow-md">
          SA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1) || (activeSection === "" && link.href === "#");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={clsx(
                  "group relative flex flex-col items-center justify-center text-[10px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 py-2",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                <span>{link.label}</span>
                {/* Subtle line indicator */}
                <div className={clsx(
                  "absolute bottom-0 h-[1px] bg-white transition-all duration-500 ease-out",
                  isActive ? "w-full opacity-50" : "w-0 opacity-100 group-hover:w-full"
                )}></div>
              </Link>
            );
          })}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 ml-4 border border-white/5 rounded-full hover:bg-white/5 hover:border-white/10 transition-all duration-500 text-white/50 hover:text-white z-50"
          >
            {mobileMenuOpen ? <X size={16} strokeWidth={1.5} /> : <Menu size={16} strokeWidth={1} />}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 z-50 text-white drop-shadow-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
        </button>
      </div>

      {/* Full Screen Overlay Menu */}
      <div
        className={clsx(
          "fixed inset-0 bg-brand-black/95 backdrop-blur-2xl z-40 flex flex-col justify-center items-center gap-8 transition-all duration-500",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{ transitionDelay: `${i * 50}ms` }}
            className={clsx(
              "text-3xl font-display font-medium tracking-[0.1em] text-white/90 hover:text-white transition-all duration-500",
              mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
