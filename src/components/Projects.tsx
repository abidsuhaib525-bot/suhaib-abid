"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Filter out nulls from strict-mode duplicate renders to prevent lag
      const validCards = cardsRef.current.filter(Boolean);
      
      // Stagger fade-in/slide-up for the project cards
      gsap.fromTo(validCards,
        { y: 80, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative w-full py-32 md:py-48 bg-[#030303] border-t border-white/[0.02]"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-32 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col gap-4">
          <span className="text-[9px] font-medium tracking-[0.4em] uppercase text-white/40">
            05 // Selected Work
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-white">
            Projects
          </h2>
        </div>

        {/* Cinematic Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projectsData.map((project, index) => (
            <Link 
              href={`/projects/${project.slug}`}
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col gap-6 opacity-0"
            >
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 group-hover:border-white/10 transition-colors duration-500">
                <Image 
                  src={`/projects/${project.slug}.png`} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                  onError={(e) => {
                    // Fallback to placeholder if screenshot failed
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                  className="object-cover" 
                />
                
                {/* Fallback Placeholder (Hidden by default, shown if image fails to load) */}
                <div className="hidden absolute inset-0 bg-gradient-to-br from-brand-black via-[#111] to-[#1a1a1a] flex items-center justify-center">
                  <div className="text-white/10 font-sans text-2xl font-bold tracking-widest uppercase rotate-[-45deg] scale-150 transform transition-transform duration-700 group-hover:scale-110">
                    {project.title}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    View Project
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex flex-col gap-2 px-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase font-medium">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-white/60 text-sm font-light">
                  {project.category}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] tracking-wider uppercase font-medium text-white/40"
                    >
                      {t}{i < project.tech.length - 1 && <span className="mx-2 text-white/20">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
