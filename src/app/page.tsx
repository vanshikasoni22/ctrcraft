import HeroSection from "@/components/HeroSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { div } from "motion/react-client";
import Image from "next/image";

export default function Home() {
  return (
    
    <div>
      <HeroSection/>
      <TestimonialsSection autoplay={true}/>
    </div>
  );
}
