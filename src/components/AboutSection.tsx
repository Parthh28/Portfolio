"use client";

import { motion } from "framer-motion";

import MusicCard from "./MusicCard";
import { cn } from "@/lib/utils";

export default function AboutSection() {
    return (
        <section className="w-full max-w-6xl mx-auto mb-40 px-4 relative">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Left Column: Photo & Music (Spider-Verse Style) */}
                <div className="lg:col-span-5 flex flex-col items-center relative group">

                    {/* Profile Photo Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-64 h-64 md:w-80 md:h-80 mb-10 z-10"
                    >
                        {/* Glitch/Offset Layers */}
                        <div className="absolute inset-0 bg-spider-verse-cyan/20 translate-x-2 translate-y-2 rounded-2xl mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                        <div className="absolute inset-0 bg-spider-verse-red/20 -translate-x-2 -translate-y-2 rounded-2xl mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-100" />

                        {/* Main Image Container */}
                        <div className="w-full h-full bg-spider-black rounded-2xl overflow-hidden relative border-4 border-white/10 shadow-2xl group-hover:border-spider-red/50 transition-colors">
                            {/* Placeholder / Fallback Instructions */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white/20 font-black text-center p-4 z-0">
                                <span className="text-4xl mb-2">ADD PHOTO</span>
                                <span className="text-xs font-mono text-spider-blue border border-spider-blue/30 px-2 py-1 rounded">
                                    /public/Me.jpg
                                </span>
                            </div>

                            {/* Actual Image Layer - Will cover placeholder if image exists */}
                            <div className="absolute inset-0 w-full h-full bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500 z-10"
                                style={{ backgroundImage: "url('/Me.jpg')" }}
                            />

                            {/* Overlay Texture */}
                            <div className="absolute inset-0 bg-halftone opacity-20 z-20 pointer-events-none mix-blend-overlay" />
                        </div>

                        {/* Graffiti Tag */}
                        <div className="absolute -bottom-6 -right-6 rotate-[-10deg] z-30">
                            <span className="bg-graffiti-yellow text-black font-black text-xl px-4 py-1.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter uppercase">
                                Friendly Nbhd Dev
                            </span>
                        </div>
                    </motion.div>


                    {/* Music Card (Positioned below photo) */}
                    <div className="relative z-20 w-full flex justify-center mt-6">
                        <MusicCard />
                    </div>
                </div>

                {/* Right Column: Bio Content */}
                <div className="lg:col-span-7 bg-carbon p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
                    {/* Decor lines */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-spider-verse-red via-violet-500 to-spider-verse-cyan pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-graffiti-yellow/10 blur-3xl rounded-full pointer-events-none" />

                    <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter mb-6 text-chromatic drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        HEY, WHAT'S UP?
                    </h2>

                    <div className="space-y-6 text-lg text-spider-white/80 font-medium leading-relaxed font-sans">
                        <p>
                            I'm <span className="text-spider-verse-cyan font-bold drop-shadow-[0_0_5px_rgba(0,255,255,0.6)]">Parth</span>. Just your average developer… until something needs to actually work well.
                        </p>
                        <p>
                            I build web experiences that aren't just functional, but smooth, responsive, and designed with intent.
                        </p>
                        <p>
                            Right now, I'm exploring different parts of development by building and shipping projects — figuring out where I can create the most impact.
                        </p>
                        <p>
                            I'm driven by curiosity and a desire to solve problems with clean, efficient code. I'm always learning, always improving, and always ready for the next challenge.
                        </p>
                        <p>
                            I don't chase trends. I focus on what works, what scales, and what feels right to use.
                        </p>

                    </div>

                    <div className="mt-10 flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-spider-verse-red/20 border border-spider-verse-red/50 rounded-full text-spider-verse-red font-bold text-sm uppercase tracking-wider">
                            Front-End Architect
                        </div>
                        <div className="px-4 py-2 bg-spider-verse-cyan/20 border border-spider-verse-cyan/50 rounded-full text-spider-verse-cyan font-bold text-sm uppercase tracking-wider">
                            UI/UX Enthusiast
                        </div>
                        <div className="px-4 py-2 bg-graffiti-yellow/20 border border-graffiti-yellow/50 rounded-full text-graffiti-yellow font-bold text-sm uppercase tracking-wider">
                            Vigilante Coder
                        </div>
                    </div>


                </div>
            </div>


        </section>
    );
}
