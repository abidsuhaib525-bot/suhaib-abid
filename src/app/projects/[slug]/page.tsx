import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, Folder, Globe, Layout, Calendar, User, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import * as LucideIcons from "lucide-react";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Dynamic Icon component for key features
  const IconComponent = ({ name, className }: { name: string, className?: string }) => {
    const Icon = (LucideIcons as any)[name] || LucideIcons.Circle;
    return <Icon className={className} strokeWidth={1.5} />;
  };

  return (
    <main className="min-h-screen bg-[#030303] text-white font-sans selection:bg-white/20 relative overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-[-5%] w-[110%] h-[110%]">
          <Image 
            src="/project.png" 
            alt="Space Background" 
            fill 
            priority
            className="object-cover object-right opacity-[0.85]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303] opacity-90" />
      </div>

      {/* Left Vertical Nav (Desktop) */}
      <div className="hidden lg:flex fixed left-6 lg:left-12 top-0 bottom-0 flex-col justify-between items-center py-24 opacity-40 pointer-events-none z-50">
        <span className="text-[9px] tracking-[0.4em] font-mono whitespace-nowrap rotate-[-90deg] origin-center mt-8">
          SEC 06
        </span>
        <div className="w-[1px] h-32 bg-white/20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-[#030303] bg-white"></div>
        </div>
        <span className="text-[9px] tracking-[0.4em] font-mono whitespace-nowrap rotate-[-90deg] origin-center mb-16">
          PROJECT DETAILS
        </span>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:pl-32 lg:pr-12 py-24 md:py-32 z-10 flex flex-col gap-24">
        
        {/* Top Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          {/* Left: Info */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6">
            <Link href="/#projects" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-[10px] font-mono tracking-widest w-max mb-4">
              <ArrowLeft className="w-3 h-3" /> BACK TO PROJECTS
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-white text-xl font-mono">01</span>
              <div className="h-[1px] w-12 bg-white/20"></div>
            </div>

            <div>
              <span className="text-white/40 text-[9px] font-mono tracking-[0.4em] uppercase block mb-3">
                // FEATURED PROJECT
              </span>
              <h1 className="text-[40px] md:text-[60px] font-bold tracking-tighter leading-[1] mb-6 uppercase">
                {project.title}
              </h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-all duration-300"
              >
                <span className="text-[10px] font-mono tracking-widest uppercase">LIVE PROJECT</span>
                <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-300" />
              </a>
            </div>
          </div>

          {/* Right: Big Image */}
          <div className="w-full lg:w-[55%] relative perspective-1000">
            <div className="w-full aspect-[16/10] relative rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md p-2 shadow-[0_0_50px_rgba(255,255,255,0.05)] transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="w-full h-full relative rounded-lg overflow-hidden bg-[#0a0a0a]">
                <Image 
                  src={`/projects/${project.slug}.png`} 
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <hr className="border-white/5" />

        {/* Overview & Metadata */}
        <section className="flex flex-col lg:flex-row gap-16 lg:gap-8">
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h2 className="text-white text-sm font-bold tracking-widest uppercase">OVERVIEW</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              {project.approach || project.description}
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-y-8 gap-x-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0">
                <Folder className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">Category</span>
                <span className="text-white/80 text-sm">{project.category}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0">
                <Layout className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">Platform</span>
                <span className="text-white/80 text-sm">{project.platform || "Web / Desktop"}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">Year</span>
                <span className="text-white/80 text-sm">{project.year}</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-white/50" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">Role</span>
                <span className="text-white/80 text-sm">{project.role || "Developer"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        {project.keyFeatures && (
          <section className="flex flex-col gap-8">
            <h2 className="text-white text-sm font-bold tracking-widest uppercase">KEY FEATURES</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
              {project.keyFeatures.map((feature: any, idx: number) => (
                <div key={idx} className="min-w-[220px] md:min-w-[260px] p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <IconComponent name={feature.icon} className="w-5 h-5 text-white/60" />
                  </div>
                  <h3 className="text-white font-medium text-sm mt-2">{feature.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <hr className="border-white/5" />

        {/* Tech Stack & Challenges */}
        <section className="flex flex-col md:flex-row gap-16 md:gap-8">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-white text-sm font-bold tracking-widest uppercase">TECH STACK</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((t, idx) => (
                <span key={idx} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] text-white/70 text-[11px] font-mono tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-white text-sm font-bold tracking-widest uppercase">CHALLENGES</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              {project.challenge || "Building high-performance solutions while maintaining a clean user experience."}
            </p>
          </div>
        </section>

        {/* Project Links (Only Live Project as requested) */}
        <section className="flex flex-col gap-8 mb-12">
          <h2 className="text-white text-sm font-bold tracking-widest uppercase">PROJECT LINKS</h2>
          <div className="w-full md:w-[400px]">
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer" 
              className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Globe className="w-5 h-5 text-white/80" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-white font-medium text-sm tracking-wide">LIVE PROJECT</span>
                  <span className="text-white/40 text-[11px]">Explore the live application</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
