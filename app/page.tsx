"use client";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import FeatProjectPage from "./projects/page";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/about");
  return (
    <div>
      <AboutPage />
      <ExperiencePage />
      <FeatProjectPage />
    </div>
  );
}
