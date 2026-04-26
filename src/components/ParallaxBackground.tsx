"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ParallaxBackground() {
    const { scrollY } = useScroll();

    // Parallax Factors
    // Layer B: Skyline (0.2x speed - subtle movement)
    const ySkyline = useTransform(scrollY, [0, 5000], [0, 1000]);

    // Layer A: Rooftops (0.5x speed - faster movement)
    const yRooftops = useTransform(scrollY, [0, 5000], [0, 2500]);

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">

            {/* Layer B: Distant NYC Skyline (Slower) */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{ y: ySkyline }}
            >
                <div className="absolute bottom-0 w-full h-1/2 flex items-end opacity-30 text-spider-blue/20">
                    {/* CSS Generated Skyline */}
                    <div className="w-[10%] h-[40%] bg-current mx-1" />
                    <div className="w-[15%] h-[70%] bg-current mx-1" />
                    <div className="w-[8%] h-[50%] bg-current mx-1" />
                    <div className="w-[12%] h-[85%] bg-current mx-1 relative">
                        <div className="absolute top-2 w-1 h-10 left-1/2 -translate-x-1/2 bg-current" /> {/* Spire */}
                    </div>
                    <div className="w-[20%] h-[60%] bg-current mx-1" />
                    <div className="w-[10%] h-[45%] bg-current mx-1" />
                    <div className="w-[18%] h-[75%] bg-current mx-1" />
                    <div className="w-[7%] h-[30%] bg-current mx-1" />
                </div>
            </motion.div>

            {/* Layer A: Rooftop Objects (Faster) */}
            <motion.div
                className="absolute inset-0 w-full h-[120%] -top-[5%]"
                style={{ y: yRooftops }}
            >
                {/* Water Tank (Left) */}
                <div className="absolute top-[40%] -left-10 w-64 h-64 opacity-10 text-spider-black">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                        <path d="M 20 80 L 20 40 Q 20 30 50 30 Q 80 30 80 40 L 80 80 Z" /> {/* Tank Body */}
                        <path d="M 25 80 L 20 100 L 30 100 L 28 80" /> {/* Legs */}
                        <path d="M 75 80 L 80 100 L 70 100 L 72 80" />
                        <rect x="20" y="35" width="60" height="5" opacity="0.5" /> {/* Band */}
                        <rect x="20" y="50" width="60" height="5" opacity="0.5" />
                        <path d="M 50 30 L 50 10" stroke="currentColor" strokeWidth="2" /> {/* Spire */}
                    </svg>
                </div>

                {/* AC Vent / Unit (Right) */}
                <div className="absolute top-[60%] -right-20 w-80 h-80 opacity-10 text-spider-black rotate-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                        <rect x="10" y="40" width="80" height="50" rx="2" />
                        <circle cx="50" cy="65" r="15" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.5" />
                        <rect x="15" y="45" width="70" height="5" opacity="0.3" />
                        <rect x="15" y="55" width="70" height="5" opacity="0.3" />
                    </svg>
                </div>

                {/* Random Foreground Pipe */}
                <div className="absolute top-[20%] left-[20%] w-full h-2 bg-spider-black/10 -rotate-3" />
            </motion.div>

            {/* Gradient Overlay to fade bottom into content */}
            <div className="absolute inset-0 bg-gradient-to-t from-spider-black via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
