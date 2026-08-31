"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Local cursor state for the VIEW indicator
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle background parallax
      gsap.to(".projects-bg", {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Reveal Section Intro
      gsap.fromTo(
        ".section-intro-text",
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".section-intro",
            start: "top 95%",
          },
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      // Project Animations
      const blocks = gsap.utils.toArray(".project-block");
      
      blocks.forEach((block: any, i: number) => {
        const q = gsap.utils.selector(block);
        
        // 1. Entrance Sequence
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 95%",
            toggleActions: "play none none reverse",
          }
        });

        tl.fromTo(q(".project-num"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
          .fromTo(q(".project-cat"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
          .fromTo(q(".project-title"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.4")
          .fromTo(q(".project-desc"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.6")
          .fromTo(q(".project-image-container"), { scale: 0.96, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.6")
          .fromTo(q(".project-tags span"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out" }, "-=0.8")
          .fromTo(q(".project-cta"), { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");

        // 2. Image Parallax
        gsap.to(q(".project-image"), {
          y: "8%",
          ease: "none",
          scrollTrigger: {
            trigger: block,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        // 3. Subtle Exit Depth Transition
        if (i !== blocks.length - 1) {
          gsap.to(block, {
            scale: 0.96,
            opacity: 0.4,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: block,
              start: "bottom 95%",
              end: "bottom 20%",
              scrub: true,
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#030303] py-32 overflow-hidden"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="projects-bg absolute inset-[-10%] w-[120%] h-[120%]">
          <Image 
            src="/project.webp" 
            alt="Space Aesthetic" 
            fill 
            priority
            className="object-cover object-[80%_center] opacity-[0.85]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-90" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 w-full">
        
        {/* Editorial Section Intro */}
        <div className="section-intro mb-32 md:mb-48 flex flex-col gap-6 max-w-xl pt-20">
          <span className="section-intro-text text-white/40 text-[9px] font-mono tracking-[0.4em] uppercase">
            // SEC 05
          </span>
          <h2 className="section-intro-text font-sans text-[60px] md:text-[90px] font-bold text-white tracking-tighter leading-[0.9] uppercase">
            SELECTED<br />WORK
          </h2>
          <div className="section-intro-text w-16 h-[1px] bg-white/20 mt-4 mb-2"></div>
          <p className="section-intro-text text-white/50 text-sm md:text-base font-light leading-relaxed">
            A curated selection of things I've built, designed, and engineered. Each project represents a focus on premium aesthetics and robust performance.
          </p>
        </div>

        {/* Project Showcase Flow */}
        <div className="flex flex-col gap-32 md:gap-48 lg:gap-64 pb-32">
          {projectsData.map((project, index) => (
            <div key={index} className="project-block relative w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24 origin-top group/project">
              
              {/* Left: Project Details */}
              <div className="w-full lg:w-[45%] flex flex-col gap-6 lg:gap-8 z-20">
                <div className="flex flex-col gap-3">
                  <span className="project-num text-white/60 group-hover/project:text-white transition-colors duration-500 font-mono text-3xl md:text-4xl">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="project-cat flex items-center gap-4">
                    <div className="w-8 h-[1px] bg-white/30"></div>
                    <span className="text-white/40 text-[9px] font-mono tracking-[0.4em] uppercase">
                      // FEATURED PROJECT
                    </span>
                  </div>
                </div>

                <h3 className="project-title text-4xl md:text-5xl lg:text-[56px] font-bold text-white uppercase tracking-tighter leading-[1] mt-2 group-hover/project:translate-x-2 transition-transform duration-700 ease-out">
                  {project.title}
                </h3>
                
                <p className="project-desc text-white/50 text-sm md:text-base leading-relaxed font-light max-w-md">
                  {project.description}
                </p>

                <div className="project-tags flex flex-wrap gap-2 mt-4">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 rounded bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono tracking-wider text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-cta mt-6">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="flex items-center gap-4 w-max px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] group-hover/project:bg-white group-hover/project:text-black group-hover/project:border-white transition-all duration-500"
                  >
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors">
                      VIEW CASE STUDY
                    </span>
                    <ArrowRight className="w-3 h-3 group-hover/project:translate-x-1 transition-transform duration-300" strokeWidth={2} />
                  </Link>
                </div>
              </div>

              {/* Right: Large Real Screenshot with Local VIEW Cursor */}
              <div className="project-image-container w-full lg:w-[55%] relative z-10">
                <Link 
                  href={`/projects/${project.slug}`} 
                  className="block relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#050505] border border-white/[0.05] shadow-[0_0_40px_rgba(255,255,255,0.02)] transition-all duration-700 hover:border-white/20 hover:shadow-[0_0_60px_rgba(255,255,255,0.04)] cursor-none"
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  
                  {/* Image container for inner scale and parallax */}
                  <div className="absolute inset-[-5%] w-[110%] h-[110%] scale-100 group-hover/project:scale-[1.03] transition-transform duration-[1.5s] ease-out">
                    <Image 
                      src={`/projects/${project.slug}.png`} 
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="project-image object-cover opacity-90 group-hover/project:opacity-100 transition-opacity duration-700"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Subtle inner dark vignette for that expensive product feel */}
                  <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] z-10"></div>
                  
                  {/* Butter-smooth local VIEW indicator */}
                  <div 
                    className={`absolute z-20 pointer-events-none flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono tracking-widest uppercase transition-opacity duration-300 ${hoveredProject === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      left: cursorPos.x,
                      top: cursorPos.y,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    VIEW
                  </div>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
