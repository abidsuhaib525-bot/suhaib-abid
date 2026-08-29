import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";

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

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#ededed] font-sans selection:bg-white/20">
      
      {/* Top Bar */}
      <nav className="w-full max-w-3xl mx-auto px-6 py-12 flex justify-between items-center border-b border-white/[0.05]">
        <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2">
          <span>←</span> Suhaib Abid
        </Link>
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1"
        >
          Visit live <span>↗</span>
        </a>
      </nav>

      {/* Main Content Area */}
      <article className="w-full max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12">
        
        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-2xl">
            {project.description}
          </p>
        </div>

        {/* Feature List (Tech Stack & Year) */}
        <ul className="flex flex-col gap-2 text-white/70 font-light list-disc list-inside marker:text-white/30">
          <li>Category: {project.category}</li>
          <li>Launched: {project.year}</li>
          <li>Tech Stack: {project.tech.join(" / ")}</li>
        </ul>

        {/* The Challenge */}
        {project.challenge && (
          <section className="mt-8">
            <h2 className="text-xl font-medium mb-4 text-white/90">The challenge</h2>
            <p className="text-white/60 leading-relaxed font-light">
              {project.challenge}
            </p>
          </section>
        )}

        {/* The Approach */}
        {project.approach && (
          <section>
            <h2 className="text-xl font-medium mb-4 text-white/90">The approach</h2>
            <p className="text-white/60 leading-relaxed font-light">
              {project.approach}
            </p>
          </section>
        )}

        {/* Screenshot Image */}
        <section className="my-8 rounded-lg overflow-hidden border border-white/10 shadow-2xl relative aspect-[16/9] w-full bg-[#111]">
          <img 
            src={`/projects/${project.slug}.png`} 
            alt={`${project.title} interface screenshot`}
            className="w-full h-full object-cover"
          />
        </section>

        {/* The Outcome */}
        {project.outcome && (
          <section>
            <h2 className="text-xl font-medium mb-4 text-white/90">The outcome</h2>
            <p className="text-white/60 leading-relaxed font-light">
              {project.outcome}
            </p>
          </section>
        )}

        {/* Footer Links */}
        <div className="pt-16 pb-32 flex flex-col gap-6">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-brand-accent underline underline-offset-4 hover:text-white transition-colors w-max">
            Visit the live project
          </a>
          
          <div className="flex flex-col gap-3 mt-8 pt-8 border-t border-white/10">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              Back to home
            </Link>
          </div>
        </div>

      </article>
    </main>
  );
}
