"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, ArrowRight, Zap, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Inline SVG components for Social Brands
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(".contact-bg", {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal Left Content
      gsap.fromTo(
        ".contact-reveal",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Reveal Right Form Panel
      gsap.fromTo(
        ".contact-form-panel",
        { x: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".contact-form-panel",
            start: "top 80%",
          },
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );

      // Reveal Form Elements
      gsap.fromTo(
        ".form-element",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".contact-form-panel",
            start: "top 70%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
        }
      );
      
      // Reveal Bottom Extras
      gsap.fromTo(
        ".contact-extras",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".contact-extras",
            start: "top 95%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#030303] py-32 overflow-hidden flex items-center"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="contact-bg absolute inset-[-10%] w-[120%] h-[120%]">
          <Image 
            src="/contact.png" 
            alt="Cinematic Space Surface" 
            fill 
            priority
            className="object-cover object-center opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-90" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full h-full flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* LEFT COLUMN - INFO */}
        <div className="w-full lg:w-[45%] flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col gap-4">
            <span className="contact-reveal text-white/40 text-[9px] font-mono tracking-[0.4em] uppercase">
              // GET IN TOUCH
            </span>
            
            <h2 className="contact-reveal font-sans text-[60px] md:text-[80px] font-bold tracking-tighter leading-[0.9] flex flex-col">
              <span className="text-white">LET'S</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/60 to-white/10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                CONNECT
              </span>
            </h2>
            
            {/* Subtle Glowing Line */}
            <div className="contact-reveal flex items-center w-full max-w-sm mt-2">
              <div className="h-[1px] w-full bg-gradient-to-r from-white/40 to-transparent"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_#fff] ml-[-50%]"></div>
            </div>

            <p className="contact-reveal text-white/50 text-sm leading-relaxed font-light mt-4 max-w-md">
              Have a project in mind, a question, or just want to say hi? I'm always open to new opportunities and collaborations.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="contact-reveal flex flex-col relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gradient-to-b before:from-white/10 before:via-white/5 before:to-transparent gap-8 mt-4">
            
            <div className="flex gap-6 items-start group">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 z-10 group-hover:bg-white/[0.05] group-hover:border-white/30 transition-colors duration-500">
                <Mail className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-[9px] text-white/40 font-mono tracking-[0.2em] uppercase">Email</span>
                <a href="mailto:suhaibabid52@gmail.com" className="text-sm text-white/80 hover:text-white transition-colors">suhaibabid52@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 z-10 group-hover:bg-white/[0.05] group-hover:border-white/30 transition-colors duration-500">
                <Phone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-[9px] text-white/40 font-mono tracking-[0.2em] uppercase">Phone</span>
                <span className="text-sm text-white/80">+92 316 5181745</span>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 z-10 group-hover:bg-white/[0.05] group-hover:border-white/30 transition-colors duration-500">
                <MapPin className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-[9px] text-white/40 font-mono tracking-[0.2em] uppercase">Location</span>
                <span className="text-sm text-white/80">Pakistan</span>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 z-10 group-hover:bg-white/[0.05] group-hover:border-white/30 transition-colors duration-500">
                <Clock className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-[9px] text-white/40 font-mono tracking-[0.2em] uppercase">Availability</span>
                <span className="text-sm text-white/80">Open for new opportunities</span>
              </div>
            </div>

          </div>

          {/* Quote Box */}
          <div className="contact-reveal mt-4 p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-md flex items-center justify-between gap-4 group hover:bg-white/[0.02] hover:border-white/[0.08] transition-colors duration-500">
            <div className="flex gap-4 items-center">
              <span className="font-serif text-5xl text-white/10 leading-none h-8">"</span>
              <p className="text-white/50 text-xs leading-relaxed max-w-[200px]">
                Great things happen when we build together.
              </p>
            </div>
            <div className="font-serif text-3xl text-white/40 italic tracking-tight -rotate-2 opacity-80 group-hover:text-white/60 transition-colors duration-500">
              Suhaib
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN - FORM */}
        <div className="w-full lg:w-[55%] flex flex-col gap-6">
          
          <div className="contact-form-panel w-full p-8 md:p-10 rounded-3xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* Form Header */}
            <div className="form-element flex items-center gap-4 mb-10">
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/60"></div>
              </div>
              <span className="text-[10px] text-white font-mono tracking-[0.3em] uppercase">SEND A MESSAGE</span>
              <div className="flex-grow h-[1px] bg-gradient-to-r from-white/10 to-transparent ml-4 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-white shadow-[0_0_10px_#fff]"></div>
              </div>
            </div>

            {/* Form */}
            <form ref={formRef} className="flex flex-col gap-5">
              
              <div className="flex flex-col md:flex-row gap-5">
                <div className="form-element flex-1 flex flex-col gap-2">
                  <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">YOUR NAME</label>
                  <input 
                    type="text" 
                    placeholder="Your full name"
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                  />
                </div>
                <div className="form-element flex-1 flex flex-col gap-2">
                  <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">YOUR EMAIL</label>
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="form-element flex flex-col gap-2">
                <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">SUBJECT</label>
                <input 
                  type="text" 
                  placeholder="How can I help you?"
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                />
              </div>

              <div className="form-element flex flex-col gap-2">
                <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">YOUR MESSAGE</label>
                <textarea 
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                className="form-element group relative w-full mt-4 p-1 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/10 overflow-hidden hover:border-white/30 transition-colors duration-500"
              >
                {/* Glowing flare inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-white/20 blur-[15px] rounded-full group-hover:bg-white/40 transition-colors duration-500"></div>

                <div className="relative w-full bg-[#030303] rounded-lg px-6 py-4 flex items-center justify-center gap-6">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-colors duration-500">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors duration-500">
                    SEND MESSAGE
                  </span>
                </div>
              </button>

            </form>
          </div>

          {/* Socials & Reply Info */}
          <div className="contact-extras flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
            
            <div className="flex flex-col gap-4">
              <span className="text-[9px] text-white/40 font-mono tracking-[0.3em] uppercase">LET'S CONNECT ON</span>
              <div className="flex gap-3">
                {[
                  { icon: GithubIcon, link: "https://github.com/suhaib-abid" },
                  { icon: LinkedinIcon, link: "#" },
                  { icon: TwitterIcon, link: "#" },
                  { icon: InstagramIcon, link: "#" },
                  { icon: Mail, link: "mailto:suhaibabid52@gmail.com" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300 group"
                  >
                    <social.icon className="w-4 h-4 text-white/50 group-hover:text-black transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <div className="w-8 h-8 rounded-full border border-white/10 bg-white/[0.05] flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white/80" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/50 font-light">I usually reply within</span>
                <span className="text-xs text-white font-medium flex items-center gap-2">
                  24 hours <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse"></div>
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
