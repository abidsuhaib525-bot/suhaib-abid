"use client";

import { useRef, useEffect } from "react";
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Cinematic Background Scroll Parallax
      gsap.fromTo(
        bgImageRef.current,
        { y: "-3%", scale: 1.02 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: "3%",
          scale: 1.02,
          ease: "none",
        }
      );

      gsap.fromTo(
        particlesRef.current,
        { y: "-6%", opacity: 0.1 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: "6%",
          opacity: 0.3,
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

      // 3. Cards Reveal with Tag Stagger
      const cards = gsap.utils.toArray(".skill-card");
      cards.forEach((card: any, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });

        tl.fromTo(
          card,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        const tags = card.querySelectorAll(".skill-tag");
        tl.fromTo(
          tags,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power2.out" },
          "-=0.5"
        );
      });

      // 4. Bottom Panel Reveal
      gsap.fromTo(
        ".strengths-panel",
        { y: 30, opacity: 0 },
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

      // 5. Core Strengths Item Reveal
      gsap.fromTo(
        ".strength-item",
        { y: 20, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".strengths-panel",
            start: "top 85%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#030303] flex items-center overflow-hidden py-32"
    >
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
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
        <div ref={particlesRef} className="absolute inset-[-10%] w-[120%] h-[120%] z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.05] via-transparent to-transparent bg-[length:50px_50px]" />

        {/* Common Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/70 to-transparent w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-90" />
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

        <div className="w-full lg:ml-20 flex flex-col gap-20 md:gap-24">
          
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
              <div className="w-24 h-[1px] bg-gradient-to-r from-white via-white/40 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.4)] mt-4"></div>
            </div>
            
            <p className="skills-reveal text-white/50 text-sm md:text-base leading-relaxed font-light mt-4 opacity-0">
              A blend of technical expertise, <br className="hidden sm:block" />
              creative thinking, and continuous learning <br className="hidden sm:block" />
              that powers everything I build.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 mt-4">
            {skillCategories.map((category, index) => (
              <div 
                key={index}
                className="skill-card relative w-full pt-8 group cursor-default opacity-0"
              >
                {/* Hexagon & Icon overlapping the top edge */}
                <div className="absolute top-[4px] left-1/2 -translate-x-1/2 z-20 group-hover:-translate-y-2 transition-transform duration-700 ease-out">
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    {/* Subtle Hexagon Border */}
                    <Hexagon className="absolute inset-0 w-full h-full text-white/20 group-hover:text-white/50 transition-colors duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.05)]" strokeWidth={1} />
                    
                    {/* Solid background mask */}
                    <div className="absolute inset-1 bg-[#030303] rounded-full z-[-1] shadow-[0_0_10px_#030303]"></div>
                    
                    {/* Main Icon (Reacts on hover) */}
                    <category.icon className="w-5 h-5 text-white/70 group-hover:text-white group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-500 z-10" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Main Glass Card (Obsidian Effect) */}
                <div className="relative w-full h-full rounded-3xl bg-white/[0.01] backdrop-blur-md border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] group-hover:-translate-y-2 group-hover:border-white/[0.08] group-hover:bg-white/[0.02] transition-all duration-700 ease-out flex flex-col items-center p-8 md:p-10 pt-14 overflow-hidden">
                  
                  {/* Subtle Background Glow on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent" />

                  {/* Inner Content */}
                  <div className="flex flex-col items-center text-center w-full mt-2 relative z-10 flex-grow">
                    
                    <h3 className="text-white text-[11px] md:text-xs font-mono tracking-[0.3em] uppercase mb-4 transition-transform duration-700 group-hover:translate-x-1">
                      {category.title}
                    </h3>
                    
                    <div className="w-6 h-[1px] bg-white/10 mb-6 group-hover:bg-white/40 group-hover:w-12 transition-all duration-700"></div>
                    
                    <p className="text-white/40 text-xs md:text-[13px] leading-relaxed font-light mb-12 max-w-[220px]">
                      {category.description}
                    </p>
                    
                    {/* Skills Pill Grid */}
                    <div className="flex flex-wrap justify-center gap-2.5 mt-auto">
                      {category.skills.map((skill, sIndex) => (
                        <span 
                          key={sIndex} 
                          className="skill-tag px-3 py-1.5 rounded-md bg-white/[0.015] border border-white/[0.04] text-[10px] text-white/40 tracking-wider transition-all duration-500 group-hover:text-white/70 group-hover:bg-white/[0.03] group-hover:border-white/[0.08]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Panel (Core Strengths) */}
          <div className="strengths-panel w-full mt-8 p-8 md:p-12 rounded-3xl border border-white/[0.04] bg-white/[0.01] backdrop-blur-md flex flex-col lg:flex-row gap-12 opacity-0 overflow-hidden relative group hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.01] to-transparent pointer-events-none" />
            
            {/* Left: Quote */}
            <div className="flex flex-col gap-6 lg:w-[35%] relative z-10 border-b lg:border-b-0 lg:border-r border-white/[0.05] pb-8 lg:pb-0 lg:pr-8">
              <span className="text-white/30 text-[9px] font-mono tracking-[0.4em] uppercase">
                // CORE STRENGTHS
              </span>
              <div className="relative">
                <span className="absolute -top-6 -left-4 text-white/10 font-serif text-6xl leading-none">"</span>
                <p className="text-white/80 text-lg md:text-xl font-medium leading-[1.4] tracking-tight group-hover:text-white transition-colors duration-700">
                  Skills are the tools, <br/> creativity is the weapon.
                </p>
              </div>
              <div className="mt-2 text-white/30 font-serif italic text-3xl tracking-tight -rotate-3 opacity-80 transition-colors duration-700">
                Suhaib Abid
              </div>
            </div>

            {/* Right: Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-10 gap-x-6 lg:w-[65%] relative z-10">
              {coreStrengths.map((item, index) => (
                <div 
                  key={index} 
                  className={`strength-item flex flex-col items-center text-center gap-4 px-2 xl:px-4 ${
                    index !== 0 ? 'xl:border-l xl:border-white/[0.05]' : ''
                  }`}
                >
                  <span className="text-white/20 font-mono text-[9px] tracking-widest w-full text-left sm:text-center xl:text-left pl-4 sm:pl-0 xl:pl-0 mb-[-10px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  
                  {/* Icon and Title */}
                  <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-3">
                    <item.icon className="w-7 h-7 text-white/60 group-hover:text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] shrink-0 transition-colors duration-700" strokeWidth={1.2} />
                    <span className="text-white/90 text-[13px] font-medium tracking-[0.05em] leading-tight">
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
