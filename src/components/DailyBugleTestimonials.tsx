"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TESTIMONIALS = [
    {
        id: 1,
        headline: "SPIDER-MAN SAVED MY APP!",
        quote: "This developer doesn't just write code; they spin webs of logic that trap every bug in the city. Our load times dropped by 90%!",
        author: "J. Jonah Jameson",
        role: "Editor-in-Chief, The Daily Bugle",
        image: "/jjj-avatar.jpg" // Placeholder
    },
    {
        id: 2,
        headline: "A HERO FOR HIRE?",
        quote: "I thought my project was doomed, but then... thwip! Everything connected. The API integration is stronger than spider-silk.",
        author: "Gwen Stacy",
        role: "Lead Scientist, Oscorp",
        image: "/gwen-avatar.jpg"
    },
    {
        id: 3,
        headline: "MYSTERIO DEBUNKED!",
        quote: "Finally, a portfolio that's not just smoke and mirrors. What you see is what you get—pure, high-performance excellence.",
        author: "Miles Morales",
        role: "Neighborhood Developer",
        image: "/miles-avatar.jpg"
    }
];

export default function DailyBugleTestimonials() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]); // Horizontal scroll effect (optional)

    return (
        <section ref={targetRef} className="relative w-full py-20 overflow-hidden bg-spider-black">

            {/* Header / News Ticker */}
            <div className="w-full border-y-4 border-white mb-20 bg-red-700 py-2 overflow-hidden whitespace-nowrap">
                <motion.div
                    className="inline-block text-4xl font-black text-white italic tracking-tighter"
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    LATEST NEWS • SPIDER-MENACE OR CODING PRODIGY? • BUGLE EXCLUSIVE • 5-STAR REVIEWS FLOOD THE CITY •
                    LATEST NEWS • SPIDER-MENACE OR CODING PRODIGY? • BUGLE EXCLUSIVE • 5-STAR REVIEWS FLOOD THE CITY •
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-6xl md:text-8xl font-black text-center text-white uppercase tracking-tighter mb-10 drop-shadow-[5px_5px_0px_#8a0303]">
                    The Daily Bugle
                </h2>

                {/* Horizontal Scroll Container */}
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {TESTIMONIALS.map((t) => (
                        <div key={t.id} className="min-w-[85vw] md:min-w-[600px] snap-center shrink-0">
                            {/* Newspaper Card */}
                            <div className="relative bg-[#e0e0e0] text-black p-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] rotate-1 hover:rotate-0 transition-transform duration-500">
                                {/* Paper Texture Overlay */}
                                <div className="absolute inset-0 bg-[#d4d4d4] opacity-20 pointer-events-none mix-blend-multiply overflow-hidden">
                                    <svg className="w-full h-full opacity-30">
                                        <filter id="newspaper-grain">
                                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                                            <feColorMatrix type="saturate" values="0" />
                                        </filter>
                                        <rect width="100%" height="100%" filter="url(#newspaper-grain)" />
                                    </svg>
                                </div>

                                {/* Header Line */}
                                <div className="border-b-4 border-black mb-4 mx-2 flex justify-between items-end pb-1">
                                    <span className="font-extrabold text-xs">VOL. {t.id}</span>
                                    <span className="font-extrabold text-xs">PRICE: FREE</span>
                                </div>

                                {/* Content Grid */}
                                <div className="grid grid-cols-12 gap-4 px-4 pb-8">

                                    {/* Headline */}
                                    <div className="col-span-12">
                                        <h3 className="text-5xl md:text-7xl font-black leading-[0.8] tracking-tighter uppercase mb-4">
                                            {t.headline}
                                        </h3>
                                    </div>

                                    {/* Image (Halftone Effect) */}
                                    <div className="col-span-12 md:col-span-5 h-48 bg-black relative overflow-hidden border-2 border-black">
                                        {/* CSS Halftone */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle,white_2px,transparent_2.5px)] bg-[size:6px_6px] opacity-80 z-10" />
                                        <div className="absolute inset-0 bg-spider-red mix-blend-multiply z-20 opacity-50" />
                                        <div className="absolute inset-0 flex items-center justify-center text-white z-0">
                                            {/* Placeholder Icon if no image */}
                                            <span className="text-6xl font-bold">?</span>
                                        </div>
                                        <div className="absolute bottom-0 left-0 bg-black text-white text-[10px] px-1 font-bold z-30">
                                            PHOTO BY PETER P.
                                        </div>
                                    </div>

                                    {/* Story Text */}
                                    <div className="col-span-12 md:col-span-7 flex flex-col justify-between">
                                        <p className="font-serif text-lg md:text-xl font-bold leading-tight border-l-4 border-black pl-4 mb-4">
                                            &quot;{t.quote}&quot;
                                        </p>
                                        <div className="font-sans font-black uppercase text-sm text-right">
                                            — {t.author}<br />
                                            <span className="text-gray-600">{t.role}</span>
                                        </div>
                                    </div>

                                </div>

                                {/* Footer Barcode decorative */}
                                <div className="h-4 bg-black mx-4 mb-2 opacity-80 flex gap-1 justify-end">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div key={i} className="h-full bg-white w-1" style={{ width: ((i * 3 + 2) % 5 + 2) + 'px' }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
