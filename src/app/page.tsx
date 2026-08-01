"use client";

import { useState } from "react";
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
import WebNetSocials from "../components/WebNetSocials";
import { assetPath } from "@/lib/utils";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-y-scroll overflow-x-hidden snap-y snap-mandatory bg-spider-black selection:bg-spider-red selection:text-white scroll-smooth">
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

      <main
        className={`relative transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'} flex flex-col items-center z-10 w-full`}
      >
        {/* Intro Section (Full Height) */}
        <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative snap-start shrink-0">
          <h1 className={`text-5xl md:text-9xl font-black text-[#8a0303] tracking-widest drop-shadow-[0_0_15px_rgba(138,3,3,0.8)] uppercase scale-y-110 z-20 ${introFinished ? "animate-glitch" : ""}`}>
            Parth&apos;s<br />Portfolio
          </h1>
          <p className="text-spider-white mt-8 text-xl md:text-2xl font-bold tracking-[0.3em] uppercase bg-black/40 px-6 py-3 border-y border-spider-blue/50 backdrop-blur-sm z-20">
            Web Developer & Designer
          </p>

          <div className="absolute bottom-10 animate-pulse text-neon-cyan/70 text-xs font-bold tracking-[0.2em] uppercase flex flex-col items-center gap-2 z-20">
            {"// SCROLL TO INITIALIZE DESCENT //"}
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
                  imageSrc={assetPath("/lab-house.png")}
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
                        <p className="text-[10px] text-spider-verse-cyan mt-4 font-bold uppercase tracking-widest font-mono">HTML / CSS / JS</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://lab-house.vercel.app/", "_blank")}
                />
                <TiltedCard
                  imageSrc={assetPath("/Study-OS.png")}
                  altText="Study-OS"
                  captionText="Study-OS"
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
                        <h3 className="text-2xl font-bold text-spider-white uppercase tracking-tighter">Study-OS</h3>
                        <p className="text-[11px] text-spider-gray mt-3 leading-relaxed font-mono">
                          StudyOS is a web-based study tracking platform designed for college students. It helps students log study sessions, track progress across subjects, and build consistent study habits — all through a clean, distraction-free interface built around student psychology.(For Shastra UNiversity 3rd Sem EEE student).
                        </p>
                        <p className="text-[10px] text-spider-verse-cyan mt-4 font-bold uppercase tracking-widest font-mono">Next.JS(React) / Tailwind CSS / Supabase</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://study-os-psi.vercel.app/", "_blank")}
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
                        <p className="text-[10px] text-spider-verse-cyan mt-4 font-bold uppercase tracking-widest font-mono">React / Tailwind / Supabase</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://habit-tracker-puce-eight.vercel.app/", "_blank")}
                />
                <TiltedCard
                  imageSrc={assetPath("/NutriLife.png")}
                  altText="NutriLife"
                  captionText="NutriLife"
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
                        <h3 className="text-2xl font-bold text-spider-white uppercase tracking-tighter">NutriLife</h3>
                        <p className="text-[11px] text-spider-gray mt-3 leading-relaxed font-mono">
                          A comprehensive nutrition and fitness tracking platform designed to help users achieve their health goals.
                        </p>
                        <p className="text-[10px] text-spider-verse-cyan mt-4 font-bold uppercase tracking-widest font-mono">HTML / CSS / JS</p>
                      </div>
                    </div>
                  }
                  onClick={() => window.open("https://parthh28.github.io/NutriLife/", "_blank")}
                />

              </div>

            </div>
          </section>

        </section>

        <div className="w-full snap-center pt-20">
          <ContactSection />
        </div>

        {/* WEB NET - SOCIALS FOOTER */}
        <div className="w-full snap-start">
          <WebNetSocials />
        </div>
      </main>
    </div>
  );
}
