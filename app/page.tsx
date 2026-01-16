"use client";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import FeatProjectPage from "./projects/page";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  console.log("path:", pathname)
  return (
    <div>
      <AboutPage />
      <ExperiencePage />
      <FeatProjectPage />
    </div>
  );
}
