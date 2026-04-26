"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import IntroAnimation from "../components/IntroAnimation";
import WebBackground from "../components/WebBackground";
import ParallaxCity from "../components/ParallaxCity";
import PendulumCard from "../components/PendulumCard";
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
          {/* WORKS GALLERY - PENDULUM CARDS */}
          <section className="w-full relative py-40 my-20 overflow-hidden snap-start">
            <SpiderVerseBackground />
            <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
              <h2 className="text-4xl font-bold text-spider-white mb-20 text-right tracking-widest uppercase border-b border-spider-white/10 pb-4">
                Latest Projects
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20 perspective-1000">
                <PendulumCard
                  title="Lab-house website"
                  description="A website that company needs for their business. The website tells about their work and has the form to let them know who needs to calibrate"
                  tech="HTML / CSS / JS"
                  index={0}
                  link="https://labhouse1.netlify.app/" // Replace with your actual URL
                  image="/project.png" // Replace with your image path (e.g., "/my-project.png")
                />
                <PendulumCard
                  title="Habit Tracker"
                  description="AI-driven analytics dashboard featuring predictive modeling and data visualization."
                  tech="HTML / CSS / JS"
                  link="https://habitlog.netlify.app/"
                  index={1}
                  image="/habit.png"
                />
                <PendulumCard
                  title="Serene Reminder"
                  description="Serene Reminder is a gamified habit tracker that turns your daily routine into an RPG-like journey. It features a sleek, modern interface where you earn XP for completing habits to level up and evolve a virtual pet (like a dragon or cosmic spirit). Beyond tracking, it includes a robust alarm/reminder system, mood logging, and cloud synchronization via Supabase."
                  tech="React / Tailwind CSS / Supabase"
                  index={2}
                  link="https://habit-tracker-puce-eight.vercel.app/"
                  image="/serene.png"
                />
                <PendulumCard
                  title="Delta Engine"
                  description="Custom game engine tailored for browser-based narrative experiences."
                  tech="Canvas API / WASM"
                  index={3}
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
