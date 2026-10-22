import Contact from "@/components/sections/home/contact";
import ExperiencePreview from "@/components/sections/home/experience-preview";
import Hero from "@/components/sections/home/hero";
import Marquee from "@/components/sections/home/marquee";
import Toolkit from "@/components/sections/home/toolkit";
import Work from "@/components/sections/home/work";
import Writing from "@/components/sections/home/writing";

export const revalidate = 86400; // durations are computed from today's date

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <ExperiencePreview />
      <Toolkit />
      <Writing />
      <Contact />
    </>
  );
}
