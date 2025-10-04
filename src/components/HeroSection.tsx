"use client"
import Link from "next/link"
import { motion, useInView } from "motion/react";
import { Button } from "./ui/moving-border";
import { useRef } from "react";

function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f5dc] relative overflow-hidden">
      {/* Enhanced Background with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 80%, rgba(120,119,198,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.5) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120,119,198,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 70%, rgba(120,119,198,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.4) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(120,119,198,0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Floating Elements */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-sm"
          animate={{ 
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-20 w-8 h-8 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-full blur-sm"
          animate={{ 
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-sm"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </motion.div>

      <div className="relative flex h-[100vh] flex-col items-center justify-center z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative flex flex-col gap-6 items-center justify-center px-4"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/50 text-slate-700 text-xs font-medium shadow-lg"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            AI-Powered Thumbnail Generation
          </motion.div>

          <div className="p-4 relative z-10 w-full text-center">
            {/* Main Headline */}
            <motion.h1 
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 md:mt-0 text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 font-merriweather italic leading-tight"
            >
              Thumbnails That Get{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Clicks
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </span>
              {" "}—{" "}
              <span className="text-green-600">Instantly</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto font-poppins font-medium leading-relaxed"
            >
              Transform your YouTube channel with AI-powered thumbnail generation. 
              <span className="font-semibold text-slate-700"> Boost your click-through rates by up to 300%</span> 
              {" "}and watch your subscriber count soar.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex justify-center"
            >
              <Link href={"/signup"}>
                <Button
                  containerClassName="rounded-full"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-blue-400 cursor-pointer font-poppins rounded-full text-base font-semibold px-8 py-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Creating for Free
                  <motion.span
                    className="ml-2 inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-8 text-xs text-slate-500 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required • Free forever plan • Cancel anytime
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroSection
