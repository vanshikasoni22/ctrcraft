"use client"
import Link from "next/link"
import { motion } from "motion/react";
// import { Spotlight } from "./ui/Spotlight"
import { AuroraBackground } from "./ui/aurora-background";
import { Button } from "./ui/moving-border";


function HeroSection() {
  return (
    <AuroraBackground>
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
                    <h1 className="mt-20 md:mt-0 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">Thumbnails That Get Clicks — Instantly.</h1>
                    <p className="mt-4 font-normal text-base md:text-lg text-neutral-300 max-w-lg mx-auto">Turn your video ideas into scroll-stopping thumbnails with the power of AI. Designed to boost your CTR and grow your channel.
                    </p>
                    <div className="mt-4">
                        <Link href={"/courses"}>
                            <Button
                                borderRadius="1.75rem"
                                className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                            >
                                Generate a thumbnail
                            </Button>
                        </Link>
                    </div>
                </div>
            </motion.div>
    </AuroraBackground>
  )
}

export default HeroSection
