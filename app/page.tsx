import Hero from "./components/Hero";
import AboutPage from "./about/page";
import ExperiencePage from "./experience/page";
import FeatProjectPage from "./projects/page";

export default function Home() {
  return (
    <div>
      {/* <Hero /> */}
      <AboutPage />
      <ExperiencePage />
      <FeatProjectPage />
    </div>
  );
}
