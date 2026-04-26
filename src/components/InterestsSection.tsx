"use client";

import { motion } from "framer-motion";
import { Gamepad2, Headphones, Camera, Coffee } from "lucide-react";

export default function InterestsSection() {
    return (
        <section className="relative w-full py-32 bg-[#E8E6E1] text-black overflow-hidden pointer-events-auto">
            {/* Background Texture (Newsprint) */}
            <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
                {/* Daily Bugle Header Style */}
                <div className="border-b-4 border-black mb-12 pb-4 text-center">
                    <h2 className="text-6xl md:text-8xl font-serif font-black uppercase tracking-tight leading-none mb-2">
                        The Daily Life
                    </h2>
                    <div className="flex justify-between border-t-2 border-black pt-2 font-mono text-sm uppercase tracking-widest">
                        <span>Banglore City</span>
                        <span>Vol. 420</span>
                        <span>Price: ₹40</span>
                    </div>
                </div>

                {/* Newspaper Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Headline / Hero Interest */}
                    <div className="md:col-span-8 space-y-4">
                        <div className="rotate-1 bg-white p-4 shadow-lg border border-gray-300 transition-transform hover:scale-[1.01] duration-300 ease-out">
                            <div className="h-64 bg-gray-800 w-full mb-4 grayscale contrast-125 flex items-center justify-center overflow-hidden">
                                {/* Placeholder for Gamer setup or similar */}
                                <Gamepad2 className="w-24 h-24 text-white/80" />
                            </div>
                            <h3 className="text-4xl font-serif font-bold leading-tight">
                                Local Hero Found Gaming at 3 AM
                            </h3>
                            <p className="font-serif italic text-gray-600 mt-2 border-l-2 border-black pl-4">
                                "Sources say the high score was beaten just moments before the city needed saving again."
                            </p>
                            <p className="font-mono text-xs mt-4 text-gray-500 uppercase">
                                // TOPICS: RPGs, FPS, RETRO CONSOLES
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="md:col-span-4 flex flex-col gap-8 mt-12 md:mt-0">
                        {/* Music Interest */}
                        <div className="-rotate-2 bg-white p-4 shadow-md border border-gray-300 transition-transform hover:rotate-0 duration-300">
                            <h4 className="font-serif font-bold text-xl mb-2 border-b-2 border-black pb-1">
                                Audio Archives
                            </h4>
                            <div className="flex items-center gap-4 mb-3">
                                <Headphones className="w-8 h-8" />
                                <div className="text-sm font-mono">
                                    CURRENTLY PLAYING:<br />
                                    <span className="font-bold">Sunflower</span>
                                </div>
                            </div>
                            <p className="font-serif text-sm leading-snug">
                                A smooth mix of chill beats and nostalgic vibes, perfect for late-night coding sessions and getting lost in the flow.
                            </p>
                        </div>

                        {/* Photography Interest */}
                        <div className="rotate-2 bg-white p-4 shadow-md border border-gray-300 transition-transform hover:rotate-0 duration-300">
                            <h4 className="font-serif font-bold text-xl mb-2 border-b-2 border-black pb-1">
                                Through the Lens
                            </h4>
                            <div className="h-32 bg-gray-200 mb-3 grayscale contrast-125 flex items-center justify-center">
                                <Camera className="w-12 h-12 text-gray-500" />
                            </div>
                            <p className="font-serif text-sm leading-snug">
                                Capturing the city's angles from heights no one else can reach.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
