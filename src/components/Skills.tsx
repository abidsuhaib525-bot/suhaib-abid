"use client";

import { useRef, useEffect, MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Software Engineering",
    description: "Core logic, algorithms, and object-oriented programming for scalable systems.",
    skills: ["C++", "C#", "Java", "Object-Oriented Design", "System Architecture"]
  },
  {
    title: "Artificial Intelligence",
    description: "Data processing, machine learning models, and analytical programming.",
    skills: ["Python", "Machine Learning", "Data Structures", "Neural Networks", "Data Analysis"]
  },
  {
    title: "Web Architecture",
    description: "Building fast, responsive, and cinematic user interfaces for the modern web.",
    skills: ["HTML5 / CSS3", "React.js", "Next.js", "Tailwind CSS", "Bootstrap", "GSAP"]
  }
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade-in for the skill cards
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse tracking for the premium card glow effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, index: number) => {
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
      className="relative w-full py-32 md:py-48 bg-[#030303] border-t border-white/[0.02]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-32 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col gap-4 items-center md:items-start">
          <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-white/40">
            04 // Expertise
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-white text-center md:text-left">
            Core Skills
          </h2>
        </div>

        {/* Cinematic Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              className="skill-card relative flex flex-col gap-8 p-8 md:p-10 rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.05] transition-colors duration-500 hover:border-white/20 hover:bg-white/[0.04] group"
            >
              {/* Dynamic Mouse Glow Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{
                     background: "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)"
                   }}
              />

              <div className="relative z-10">
                <h3 className="font-sans text-xl md:text-2xl font-semibold tracking-tight text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto pt-4 border-t border-white/10">
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIndex) => (
                    <li 
                      key={sIndex} 
                      className="px-3 py-1.5 rounded bg-white/[0.03] text-[10px] md:text-xs tracking-wider uppercase font-medium text-white/60 border border-white/5"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
