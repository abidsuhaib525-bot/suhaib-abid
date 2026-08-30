"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Code, Box, ArrowUpRight, Cpu } from "lucide-react";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const filters = ["ALL", "WEB DEVELOPMENT", "UTILITIES", "AUTOMATION"];

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Parallax
      gsap.to(".project-bg", {
        y: "5%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal Animations
      gsap.fromTo(
        ".project-header",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
        }
      );

      const validCards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        validCards,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 80%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".project-cta",
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".project-cta",
            start: "top 95%",
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#030303] py-32 flex flex-col items-center overflow-hidden"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="project-bg absolute inset-[-5%] w-[110%] h-[110%]">
          <Image 
            src="/project.png" 
            alt="Cinematic Space Background" 
            fill 
            priority
            className="object-cover object-right opacity-90"
          />
        </div>
        
        {/* Gradients to blend content seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-90 pointer-events-none" />
      </div>

      <div className="max-w-[1500px] w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col gap-12">
        
        {/* Header & Filters */}
        <div className="project-header flex flex-col gap-10 opacity-0">
          
          <div className="flex flex-col gap-4">
            <span className="text-white/40 text-[9px] font-mono tracking-[0.4em] uppercase">
              // WHAT I BUILD
            </span>
            <div className="relative">
              <h2 className="font-sans text-[60px] md:text-[80px] font-bold text-white tracking-tighter leading-[1]">
                PROJECTS
                <span className="absolute top-2 ml-2 w-3 h-3 rounded-full border border-white/30"></span>
              </h2>
            </div>
            <p className="text-white/50 text-xs md:text-sm max-w-sm mt-2 leading-relaxed">
              A selection of projects that reflect my passion for problem solving, clean design and impactful digital experiences.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {filters.map((filter, index) => (
              <button 
                key={index}
                className={`px-6 py-2.5 rounded-full border text-[10px] tracking-widest font-mono transition-all duration-300 whitespace-nowrap ${
                  index === 0 
                    ? "border-white/30 bg-white/[0.05] text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                    : "border-transparent bg-white/[0.02] text-white/40 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
          {projectsData.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative flex flex-col p-5 rounded-2xl bg-white/[0.02] backdrop-blur-[6px] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 opacity-0"
            >
              {/* Card Header (Number & Icon) */}
              <div className="flex justify-between items-center mb-5">
                <span className="text-white/50 font-mono text-xs tracking-widest">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 group-hover:text-white/80 group-hover:border-white/30 transition-colors duration-500">
                  {index % 2 === 0 ? <Code className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-500">
                <Image 
                  src={`/projects/${project.slug}.png`} 
                  alt={project.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                  <span className="text-white/20 font-mono text-xs tracking-widest uppercase">IMAGE_NOT_FOUND</span>
                </div>
                {/* Subtle dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-white font-semibold text-[15px] flex items-center gap-2">
                  {project.title}
                  <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-white transition-colors duration-500"></span>
                </h3>
                <p className="text-white/40 text-[11px] leading-relaxed mt-2 line-clamp-2 min-h-[34px]">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tech.slice(0, 4).map((t, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 rounded bg-white/[0.03] border border-white/5 text-[9px] font-mono tracking-wider text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Link */}
              <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center group-hover:border-white/30 transition-colors duration-500">
                <span className="text-white/50 text-[9px] tracking-[0.2em] font-mono uppercase group-hover:text-white transition-colors duration-500">
                  VIEW CASE STUDY
                </span>
                <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="project-cta w-full mt-6 p-6 md:p-8 rounded-3xl border border-white/[0.05] bg-white/[0.015] backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 opacity-0 hover:border-white/[0.1] hover:bg-white/[0.03] transition-colors duration-500">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
              <Box className="w-5 h-5 text-white/60" strokeWidth={1} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-[9px] font-mono tracking-[0.2em] uppercase">HAVE AN IDEA?</span>
              <p className="text-white/90 text-sm md:text-base font-medium">Let's build something amazing together.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
            <p className="text-white/40 text-xs hidden lg:block max-w-[200px]">
              I'm always open to discussing new projects, creative ideas or opportunities.
            </p>
            <Link 
              href="#contact"
              className="group/btn flex items-center justify-between gap-4 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors duration-300 min-w-[200px]"
            >
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase">GET IN TOUCH</span>
              <ArrowUpRight className="w-3 h-3 group-hover/btn:rotate-45 transition-transform duration-300" strokeWidth={2} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
