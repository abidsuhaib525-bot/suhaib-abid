"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Mail, Phone, MapPin, Clock, ArrowRight, Zap, Send, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Inline SVG components for Social Brands
const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.296-.346-.105L7.472 14.18l-2.76-.86c-.6-.184-.613-.604.126-.893l10.75-4.143c.498-.194.94.116.786.937z"/>
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
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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
            start: "top 95%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
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
            start: "top 95%",
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
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
            start: "top 95%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.1
        }
      );
      
      // Reveal Bottom Extras
      gsap.fromTo(
        ".contact-extras",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".contact-extras",
            start: "top bottom",
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
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
                <a href="mailto:abidsuhaib525@gmail.com" className="text-sm text-white/80 hover:text-white transition-colors">abidsuhaib525@gmail.com</a>
              </div>
            </div>

            <div className="flex gap-6 items-start group">
              <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center shrink-0 z-10 group-hover:bg-white/[0.05] group-hover:border-white/30 transition-colors duration-500">
                <Phone className="w-4 h-4 text-white/60 group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="flex flex-col gap-1.5 pt-0.5">
                <span className="text-[9px] text-white/40 font-mono tracking-[0.2em] uppercase">Phone</span>
                <a href="https://wa.me/923497641385?text=Hi%20Suhaib%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  +92 349 7641385
                </a>
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
            <form 
              ref={formRef} 
              className="flex flex-col gap-5 relative"
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus('submitting');
                
                try {
                  const formData = new FormData(e.currentTarget);
                  const res = await fetch("https://formsubmit.co/ajax/abidsuhaib525@gmail.com", {
                    method: "POST",
                    body: formData
                  });
                  
                  const result = await res.json();
                  if (result.success) {
                    setFormStatus('success');
                    formRef.current?.reset();
                    setTimeout(() => setFormStatus('idle'), 5000);
                  } else {
                    setFormStatus('error');
                    setTimeout(() => setFormStatus('idle'), 5000);
                  }
                } catch (error) {
                  setFormStatus('error');
                  setTimeout(() => setFormStatus('idle'), 5000);
                }
              }}
            >
              {/* FormSubmit Config */}
              <input type="hidden" name="_subject" value="New Message from Portfolio!" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="flex flex-col md:flex-row gap-5">
                <div className="form-element flex-1 flex flex-col gap-2">
                  <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">YOUR NAME</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Your full name"
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                  />
                </div>
                <div className="form-element flex-1 flex flex-col gap-2">
                  <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">YOUR EMAIL</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    placeholder="Your email address"
                    className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                  />
                </div>
              </div>

              <div className="form-element flex flex-col gap-2">
                <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">SUBJECT</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="How can I help you?"
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300"
                />
              </div>

              <div className="form-element flex flex-col gap-2">
                <label className="text-[9px] text-white/40 font-mono tracking-widest uppercase ml-1">YOUR MESSAGE</label>
                <textarea 
                  rows={5}
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="w-full bg-[#050505]/50 border border-white/10 rounded-xl px-5 py-4 text-sm text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={formStatus === 'submitting' || formStatus === 'success'}
                className="form-element group relative w-full mt-4 p-1 rounded-xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 border border-white/10 overflow-hidden hover:border-white/30 transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Glowing flare inside button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-white/20 blur-[15px] rounded-full group-hover:bg-white/40 transition-colors duration-500"></div>

                <div className="relative w-full bg-[#030303] rounded-lg px-6 py-4 flex items-center justify-center gap-6">
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/[0.02] group-hover:bg-white group-hover:text-black transition-colors duration-500">
                    {formStatus === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/80 group-hover:text-white transition-colors duration-500">
                    {formStatus === 'submitting' ? 'SENDING...' : formStatus === 'success' ? 'SENT!' : 'SEND MESSAGE'}
                  </span>
                </div>
              </button>

              {/* In-UI Notification Toast */}
              {formStatus === 'success' && (
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md flex items-center gap-3 transition-all duration-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-100 font-medium tracking-wide">Message sent successfully!</span>
                </div>
              )}
              {formStatus === 'error' && (
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md flex items-center gap-3 transition-all duration-300">
                  <span className="text-xs text-red-100 font-medium tracking-wide">Error sending message. Please try again.</span>
                </div>
              )}

            </form>
          </div>

          {/* Socials & Reply Info */}
          <div className="contact-extras flex flex-col sm:flex-row items-center justify-between gap-6 px-2">
            
            <div className="flex flex-col gap-4">
              <span className="text-[9px] text-white/40 font-mono tracking-[0.3em] uppercase">LET'S CONNECT ON</span>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: GithubIcon, link: "https://github.com/abidsuhaib525-bot", title: "GitHub" },
                  { icon: InstagramIcon, link: "https://www.instagram.com/suhaib_abid_525/", title: "Instagram" },
                  { icon: FacebookIcon, link: "https://www.facebook.com/profile.php?id=61550974691249", title: "Facebook" },
                  { icon: TelegramIcon, link: "https://t.me/Suhaib_525", title: "Telegram" },
                  { icon: DiscordIcon, link: "https://discord.com/users/suhaib___525", title: "Discord" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    title={social.title}
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
