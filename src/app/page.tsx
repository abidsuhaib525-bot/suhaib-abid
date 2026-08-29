import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-grain min-h-screen selection:bg-brand-white selection:text-brand-black">
      <Navigation />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      
      {/* 
        Remaining sections to be built:
        - Contact
      */}
    </main>
  );
}
