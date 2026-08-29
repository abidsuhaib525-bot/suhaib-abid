"use client";

import { useRef, useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodeXml, Lock, PenTool, BrainCircuit, Target, Rocket, ShieldCheck, Hexagon, Circle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "DEVELOPMENT",
    description: "Building robust, scalable and efficient web applications.",
    skills: ["Python", "JavaScript", "Java", "C++", "Node.js", "DSA"],
    icon: CodeXml
  },
  {
    title: "CYBERSECURITY",
    description: "Securing systems, protecting data and strengthening digital defenses.",
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "OWASP", "SIEM"],
    icon: Lock
  },
  {
    title: "DESIGN",
    description: "Crafting clean, modern and user-focused digital experiences.",
    skills: ["UI/UX", "Figma", "Photoshop", "Premiere Pro", "Canva"],
    icon: PenTool
  }
];

const coreStrengths = [
  { title: "Problem Solver", desc: "I break complex problems into simple, solvable steps.", icon: BrainCircuit },
  { title: "Detail Oriented", desc: "I focus on the details that make a big difference.", icon: Target },
  { title: "Fast Learner", desc: "I adapt quickly and love picking up new skills.", icon: Rocket },
  { title: "Reliable", desc: "I deliver quality work with consistency you can trust.", icon: ShieldCheck }
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Cinematic Background Scroll Parallax
      gsap.fromTo(
        bgImageRef.current,
        { y: "-5%", scale: 1.05 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: "5%",
          scale: 1.05,
          ease: "none",
        }
      );

      // 2. Header Reveal
      gsap.fromTo(
        ".skills-reveal",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power2.out",
        }
      );

      // 3. Cards Reveal
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      // 4. Bottom Panel Reveal
      gsap.fromTo(
        ".strengths-panel",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".strengths-panel",
            start: "top 90%",
          },
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        }
      );

    }, containerRef);

    // Mouse Parallax Effect for Background (Similar to Hero)
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      gsap.to(bgImageRef.current, { x: x * -15, y: y * -15, duration: 2.5, ease: "power2.out" });
      gsap.to(particlesRef.current, { x: x * -30, y: y * -30, duration: 2.5, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      ctx.revert();
    };
  }, []);

  // Mouse tracking for the premium card glass glow effect
  const handleCardMouseMove = (e: ReactMouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#030303] flex items-center overflow-hidden py-32"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        
        {/* Desktop Background with Parallax Ref */}
        <div ref={bgImageRef} className="hidden md:block absolute inset-[-5%] w-[110%] h-[110%]">
          <Image 
            src="/skill.png" 
            alt="Cinematic Space Floating Crystals" 
            fill 
            priority
            className="object-cover object-[70%_center] 2xl:object-[80%_center] opacity-90"
          />
        </div>

        {/* Mobile Background */}
        <div className="md:hidden absolute top-[5vh] right-0 w-[180vw] h-[180vw] opacity-80">
          <Image 
            src="/skill.png" 
            alt="Cinematic Space Floating Crystals Mobile" 
            fill 
            priority
            className="object-contain object-right"
          />
        </div>

        {/* Subtle Atmospheric Dust / Particles */}
        <div ref={particlesRef} className="absolute inset-[-10%] w-[120%] h-[120%] z-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent bg-[length:40px_40px] pointer-events-none" />

        {/* Common Gradients for transitions and text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/60 to-transparent w-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-80 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full h-full relative z-10 flex flex-col justify-center">
        
        {/* Vertical Editorial Indicator */}
        <div className="hidden lg:flex absolute left-6 lg:left-12 top-0 bottom-0 flex-col justify-between items-center py-20 opacity-30 pointer-events-none">
          <span className="text-[9px] tracking-[0.4em] font-mono text-white whitespace-nowrap rotate-[-90deg] origin-center">
            SEC 04 / SKILLS
          </span>
          <div className="w-[1px] h-32 bg-white/20"></div>
          <span className="text-[9px] tracking-[0.4em] font-mono text-white whitespace-nowrap rotate-[-90deg] origin-center">
            SCROLL TO EXPLORE
          </span>
        </div>

        <div className="w-full lg:ml-20 flex flex-col gap-24">
          
          {/* Header */}
          <div className="flex flex-col gap-5 max-w-xl">
            <div className="skills-reveal flex items-center gap-4 opacity-0">
              <span className="text-white/40 text-[9px] font-mono tracking-[0.4em] uppercase">
                // WHAT I DO BEST
              </span>
            </div>
            
            <div className="skills-reveal opacity-0">
              <h2 className="font-sans text-[60px] sm:text-[80px] md:text-[100px] font-bold tracking-tighter leading-[0.9] flex items-start text-white drop-shadow-lg">
                SKILLS
                <Circle className="w-4 h-4 md:w-6 md:h-6 text-white/20 mt-2 md:mt-4 ml-3" strokeWidth={1.5} />
              </h2>
              {/* Subtle Glowing Line under Title */}
              <div className="w-24 h-[1px] bg-gradient-to-r from-white via-white/50 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)] mt-4"></div>
            </div>
            
            <p className="skills-reveal text-white/60 text-sm md:text-base leading-relaxed font-light mt-4 opacity-0">
              A blend of technical expertise, <br className="hidden sm:block" />
              creative thinking, and continuous learning <br className="hidden sm:block" />
              that powers everything I build.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="skills-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-12 mt-12">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onMouseMove={(e) => handleCardMouseMove(e, index)}
                className="skill-card relative w-full pt-6 opacity-0 group cursor-default"
              >
                {/* Hexagon & Icon overlapping the top edge */}
                <div className="absolute top-[0px] left-1/2 -translate-x-1/2 z-20 group-hover:-translate-y-1 transition-transform duration-500">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    {/* Glowing Hexagon Border */}
                    <Hexagon className="absolute inset-0 w-full h-full text-white/30 group-hover:text-white/70 transition-colors duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" strokeWidth={1} />
                    
                    {/* Solid background mask to hide the straight card border behind the hexagon */}
                    <div className="absolute inset-1 bg-[#030303] rounded-full z-[-1] shadow-[0_0_15px_#030303]"></div>
                    
                    {/* Main Icon */}
                    <category.icon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-500 z-10" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Main Glass Card */}
                <div className="relative w-full h-full rounded-3xl bg-white/[0.02] backdrop-blur-[4px] border border-white/[0.06] group-hover:border-white/[0.15] group-hover:bg-white/[0.04] transition-all duration-500 flex flex-col items-center p-8 md:p-10 pt-14 overflow-hidden">
                  
                  {/* Dynamic Mouse Glow Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                       style={{
                         background: "radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.05), transparent 40%)"
                       }}
                  />

                  {/* Inner Content */}
                  <div className="flex flex-col items-center text-center w-full mt-2 relative z-10 flex-grow">
                    
                    <h3 className="text-white text-[11px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4 transition-colors duration-300">
                      {category.title}
                    </h3>
                    
                    <div className="w-8 h-[1px] bg-white/10 mb-6 group-hover:bg-white/30 transition-colors duration-300"></div>
                    
                    <p className="text-white/40 text-xs leading-relaxed font-light mb-10 h-[60px] max-w-[220px]">
                      {category.description}
                    </p>
                    
                    {/* Skills Pill Grid */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                      {category.skills.map((skill, sIndex) => (
                        <span 
                          key={sIndex} 
                          className="px-3 py-1.5 rounded-md bg-white/[0.02] border border-white/[0.05] text-[10px] text-white/50 tracking-wider transition-all duration-300 group-hover:border-white/15 group-hover:bg-white/[0.05] group-hover:text-white/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Explore Link */}
                    <div className="mt-auto flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                      <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-white">Explore</span>
                      <span className="text-white text-xs group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Panel (Core Strengths) */}
          <div className="strengths-panel w-full mt-16 p-8 md:p-12 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md flex flex-col lg:flex-row gap-12 opacity-0 overflow-hidden relative group hover:border-white/[0.15] transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none" />
            
            {/* Left: Quote */}
            <div className="flex flex-col gap-6 lg:w-[35%] relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-8">
              <span className="text-white/30 text-[9px] font-mono tracking-[0.4em] uppercase">
                // CORE STRENGTHS
              </span>
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-white/10 font-serif text-6xl leading-none">"</span>
                <p className="text-white/90 text-lg md:text-xl font-medium leading-[1.4] tracking-tight">
                  Skills are the tools, <br/> creativity is the weapon.
                </p>
              </div>
              <div className="mt-2 text-white/40 font-serif italic text-3xl tracking-tight -rotate-3 opacity-80 group-hover:text-white/60 transition-colors duration-500">
                Suhaib Abid
              </div>
            </div>

            {/* Right: Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-x-6 lg:w-[65%] relative z-10">
              {coreStrengths.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col items-center text-center gap-4 px-2 xl:px-4 ${
                    index !== 0 ? 'xl:border-l xl:border-white/10' : ''
                  }`}
                >
                  {/* Icon and Title */}
                  <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-3">
                    <item.icon className="w-8 h-8 text-white/80 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] shrink-0" strokeWidth={1.2} />
                    <span className="text-white text-[13px] font-medium tracking-[0.05em] leading-tight">
                      {item.title}
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-white/40 text-[11px] md:text-xs leading-relaxed font-light max-w-[200px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
