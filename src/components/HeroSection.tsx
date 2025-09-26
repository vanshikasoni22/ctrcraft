"use client"
import Link from "next/link"
import { motion } from "motion/react";
// import { Spotlight } from "./ui/Spotlight"
import { Button } from "./ui/moving-border";


function HeroSection() {
  return (
    <div className="min-h-screen w-full bg-[#f5f5dc] relative">
      {/* Warm Beige Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120,119,198,0.1) 0%, transparent 50%)`,
        }}
      />
      <div className="relative flex h-[100vh] flex-col items-center justify-center z-10">
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
                <div className="p-4 relative z-10 w-full text-center">
                    <h1 className="mt-20 md:mt-0 text-2xl md:text-4xl font-bold text-slate-800 py-4 font-merriweather italic">Thumbnails That Get Clicks — Instantly</h1>
                    <p className="mt-4 text-xs md:text-sm text-slate-600 max-w-lg mx-auto font-poppins font-medium">Turn your video ideas into scroll-stopping thumbnails with the power of AI. Designed to boost your CTR and grow your channel.
                    </p>
                    <div className="mt-6">
                        <Link href={"/signup"}>
                            <Button
                              containerClassName="rounded-full"
                              className="bg-gradient-to-r from-blue-500 to-green-500 text-white border-blue-400 cursor-pointer font-poppins rounded-full text-sm px-5 py-2"
                            >
                              Generate a thumbnail
                            </Button>



                        </Link>
                    </div>
                </div>
            </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
