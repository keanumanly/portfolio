"use client";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import FeatProjectPage from "./projects/page";
import { BackgroundBeams } from "./components/ui/background-beams"
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <div>
      {
        pathname === "/" && <BackgroundBeams />
      }
      <AboutPage />
      <ExperiencePage />
      <FeatProjectPage />
    </div>
  );
}
