"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import IntroAnimation from "../components/IntroAnimation";
import WebBackground from "../components/WebBackground";
import ParallaxCity from "../components/ParallaxCity";
import TiltedCard from "../components/TiltedCard";
import SpiderVerseBackground from "../components/SpiderVerseBackground";
import SpecializationSection from "../components/SpecializationSection";
import InterestsSection from "../components/InterestsSection";
import TimelineSection from "../components/TimelineSection";
import ContactSection from "../components/ContactSection";
import AboutSection from "../components/AboutSection";
import { ChevronDown } from "lucide-react";
import CinematicOverlay from "../components/CinematicOverlay";
import ParallaxBackground from "../components/ParallaxBackground";
import MissionMap from "../components/MissionMap";
import WebNetSocials from "../components/WebNetSocials";
import { assetPath } from "@/lib/utils";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Motion Blur strength based on speed
  const blurOpacity = useTransform(smoothVelocity, [-2000, -100, 0, 100, 2000], [0.4, 0, 0, 0, 0.4]);
  // Slight "Jolt" / Scale effect
  const viewScale = useTransform(smoothVelocity, [-3000, 0, 3000], [0.98, 1, 0.98]);

  return (
    <div className="relative w-full h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory bg-spider-black selection:bg-spider-red selection:text-white scroll-smooth">

      {/* Web-Zip Motion Blur Overlay */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none bg-spider-red/10 mix-blend-overlay backdrop-blur-[2px]"
        style={{ opacity: blurOpacity }}
      />

      <CinematicOverlay />
      {/* Intro Animation Layer */}
      {!introFinished && (
        <IntroAnimation onComplete={() => setIntroFinished(true)} />
      )}

      {/* Parallax City Layer */}
      <ParallaxCity />

      {/* Multi-Plane Detailed Parallax (Skyline/Rooftops) */}
      <ParallaxBackground />

      {/* Web Background Layer (Canvas) */}
      <WebBackground />

      <motion.main
        className={`relative transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'} flex flex-col items-center z-10 w-full`}
        style={{ scale: viewScale }}
      >
        {/* Intro Section (Full Height) */}
        <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative snap-start shrink-0">
          <h1 className={`text-5xl md:text-9xl font-black text-[#8a0303] tracking-widest drop-shadow-[0_0_15px_rgba(138,3,3,0.8)] uppercase scale-y-110 z-20 ${introFinished ? "animate-glitch" : ""}`}>
            Parth's<br />Portfolio
          </h1>
          <p className="text-spider-white mt-8 text-xl md:text-2xl font-bold tracking-[0.3em] uppercase bg-black/40 px-6 py-3 border-y border-spider-blue/50 backdrop-blur-sm z-20">
            Web Developer & Designer
          </p>

          <div className="absolute bottom-10 animate-pulse text-neon-cyan/70 text-xs font-bold tracking-[0.2em] uppercase flex flex-col items-center gap-2 z-20">
            // SCROLL TO INITIALIZE DESCENT //
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>
        </section>

        {/* Content Section (Simulating height of building) */}
        <section className="min-h-[300vh] w-full flex flex-col items-center pt-32 box-border px-4 gap-40 snap-start">

          {/* ABOUT SECTION - SPIDER-VERSE STYLE */}
          <div className="w-full snap-center pt-20">
            <AboutSection />
          </div>

          {/* SPECIALIZATION - TECH MODULES (New Section) */}
          <div className="w-full snap-center pt-20">
            <SpecializationSection />
          </div>

          {/* TIMELINE SECTION (Studies & Achievements) */}
          <div className="w-full snap-center pt-20">
            <TimelineSection />
          </div>

          {/* INTERESTS - DAILY BUGLE STYLE (New Section) */}
          <div className="w-full snap-center pt-20">
            <InterestsSection />
          </div>
          {/* WORKS GALLERY - TILTED CARDS */}
          <section className="w-full relative py-40 my-20 overflow-hidden snap-start">
            <SpiderVerseBackground />
            <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold text-spider-white mb-20 text-right tracking-widest uppercase border-b border-spider-white/10 pb-4">
                Latest Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-32">
                <TiltedCard
                  imageSrc={assetPath("/project.png")}
                  altText="Lab-house website"
                  captionText="Lab-house website"
                  containerHeight="500px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="w-full h-full flex flex-col justify-end">
                      <div className="p-6 bg-spider-black/90 backdrop-blur-md border-t border-spider-red/50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] rounded-b-[15px]">
                        <h3 className="text-2xl font-bold text-spider-white uppercase tracking-tighter">Lab-house website</h3>
                        <p className="text-[11px] text-spider-gray mt-3 leading-relaxed font-mono">
                          A website that company needs for their business. The website tells about their work and has the form to let them know who needs to calibrate
                        </p>
                        <p className="text-[10px] text-spider-red mt-4 font-bold uppercase tracking-widest font-mono">HTML / CSS / JS</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://labhouse1.netlify.app/", "_blank")}
                />
                <TiltedCard
                  imageSrc={assetPath("/habit.png")}
                  altText="Habit Tracker"
                  captionText="Habit Tracker"
                  containerHeight="500px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="w-full h-full flex flex-col justify-end">
                      <div className="p-6 bg-spider-black/90 backdrop-blur-md border-t border-spider-red/50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] rounded-b-[15px]">
                        <h3 className="text-2xl font-bold text-spider-white uppercase tracking-tighter">Habit Tracker</h3>
                        <p className="text-[11px] text-spider-gray mt-3 leading-relaxed font-mono">
                          AI-driven analytics dashboard featuring predictive modeling and data visualization.
                        </p>
                        <p className="text-[10px] text-spider-red mt-4 font-bold uppercase tracking-widest font-mono">HTML / CSS / JS</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://habitlog.netlify.app/", "_blank")}
                />
                <TiltedCard
                  imageSrc={assetPath("/Serene.png")}
                  altText="Serene Reminder"
                  captionText="Serene Reminder"


                  containerHeight="500px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="w-full h-full flex flex-col justify-end">
                      <div className="p-6 bg-spider-black/90 backdrop-blur-md border-t border-spider-red/50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] rounded-b-[15px]">
                        <h3 className="text-2xl font-bold text-spider-white uppercase tracking-tighter">Serene Reminder</h3>
                        <p className="text-[11px] text-spider-gray mt-3 leading-relaxed font-mono line-clamp-3">
                          A gamified habit tracker that turns your daily routine into an RPG-like journey. Earn XP, level up, and evolve a virtual pet while staying productive.
                        </p>
                        <p className="text-[10px] text-spider-red mt-4 font-bold uppercase tracking-widest font-mono">React / Tailwind / Supabase</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://habit-tracker-puce-eight.vercel.app/", "_blank")}
                />
                <TiltedCard
                  imageSrc={assetPath("https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1887&auto=format&fit=crop")}
                  altText="Delta Engine"
                  captionText="Delta Engine"
                  containerHeight="500px"
                  containerWidth="100%"
                  imageHeight="400px"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.1}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="w-full h-full flex flex-col justify-end">
                      <div className="p-6 bg-spider-black/90 backdrop-blur-md border-t border-spider-red/50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)] rounded-b-[15px]">
                        <h3 className="text-2xl font-bold text-spider-white uppercase tracking-tighter">Delta Engine</h3>
                        <p className="text-[11px] text-spider-gray mt-3 leading-relaxed font-mono">
                          Custom game engine tailored for browser-based narrative experiences.
                        </p>
                        <p className="text-[10px] text-spider-red mt-4 font-bold uppercase tracking-widest font-mono">Canvas API / WASM</p>
                      </div>
                    </div>
                  }
                />

              </div>

            </div>
          </section>


          {/* MISSION MAP - HOLOGRAPHIC CITY */}
          <div className="w-full snap-center pt-20">
            <MissionMap />
          </div>

        </section>

        <div className="w-full snap-center pt-20">
          <ContactSection />
        </div>

        {/* WEB NET - SOCIALS FOOTER */}
        <div className="w-full snap-start">
          <WebNetSocials />
        </div>
      </motion.main>
    </div>
  );
}
