
"use client";
import { BackgroundBeams } from "../components/ui/background-beams"
import { AboutIntro } from "./components/about-intro"
import { TerminalContainer } from "./components/terminal-container"
import { CertificateContainer } from "./components/certificate-container"
import { SkillContainer } from "./components/skill-container"
import { usePathname } from "next/navigation";

export default function AboutPage() {
    const pathname = usePathname();
    return (
      <div id="about" className="relative flex nmax-h-screen h-full w-full flex-col items-start justify-start overflow-hidden">
        {
            pathname === "/about" && <BackgroundBeams />
        }
        <BackgroundBeams />
        <div  id="aboutsection" className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <AboutIntro />
          <TerminalContainer />
        </div>

        <section className="w-full bg-[#0E0E10] px-4 py-12 sm:py-16">
          <CertificateContainer />
        </section>
        
        <section className="w-full px-4 py-12 sm:py-16">
          <p className=" mb-6 sm:mb-8 lg:mb-10 text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-white ">
                Tech Stack
          </p>

        </section>
        <div id="aboutskillsection" className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-0 px-2 sm:px-6 md:flex-row md:justify-center">
          <SkillContainer value={0}/>
        </div>

        <div id="aboutskillsection" className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-0 px-2 sm:px-6 md:flex-row md:justify-center">
          <SkillContainer value={1}/>
        </div>  
      </div>
    );
  }
  