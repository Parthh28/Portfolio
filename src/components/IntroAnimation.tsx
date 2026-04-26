"use client";

import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
    const [scope, animate] = useAnimate();
    const [showWeb, setShowWeb] = useState(false);

    useEffect(() => {
        const sequence = async () => {
            // 1. Initial State (Black Screen)

            // 2. Web "Thwip" (Shoot)
            await new Promise(r => setTimeout(r, 600)); // Reduced delay
            setShowWeb(true);

            // Web hits screen around 200ms
            await new Promise(r => setTimeout(r, 200));

            // 3. Impact & Shake
            // Hard impact
            animate(scope.current, {
                x: [0, -10, 10, -5, 5, 0],
                y: [0, 5, -5, 2, 0]
            }, { duration: 0.3, ease: "easeInOut" });

            // 4. "Yank" Upwards (Elastic)
            await animate(scope.current, { y: "-100%" }, {
                duration: 0.5,
                ease: [0.7, 0, 0.84, 0], // Fast acceleration
                delay: 0.1
            });

            onComplete();
        };

        sequence();
    }, [animate, scope, onComplete]);

    return (
        <motion.div
            ref={scope}
            initial={{ y: 0 }}
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden",
            )}
        >
            {/* Comic Book Background Layer */}
            <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-1 md:gap-2 p-1 md:p-2 bg-black">
                {/* Panel 1 (Top Left) */}
                <div className="bg-spider-red relative overflow-hidden border-2 md:border-4 border-black">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#000_2px,_transparent_2.5px)] bg-[length:10px_10px]" />
                    <span className="absolute bottom-4 right-4 text-white font-black text-2xl md:text-4xl -rotate-12 italic drop-shadow-[2px_2px_0_#000]">THWIP!</span>
                </div>

                {/* Panel 2 (Top Mid - Image Placeholder) */}
                <div className="bg-spider-blue relative overflow-hidden border-2 md:border-4 border-black hidden md:block">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_#fff_2px,_transparent_2.5px)] bg-[length:8px_8px]" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <span className="font-comic font-bold text-white/50 rotate-45 text-6xl">?</span>
                    </div>
                </div>

                {/* Panel 3 (Top Right) */}
                <div className="bg-graffiti-yellow relative overflow-hidden border-2 md:border-4 border-black">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#000_1.5px,_transparent_2px)] bg-[length:12px_12px]" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-black text-4xl md:text-6xl rotate-6 italic uppercase tracking-widest opacity-20">NYC</span>
                </div>

                {/* Center Strip (Portfolio Text) */}
                <div className="col-span-2 md:col-span-3 row-span-1 bg-white relative border-2 md:border-4 border-black flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#ea3323_1px,_transparent_1.5px)] bg-[length:6px_6px]" />

                    {/* Skewed Background Strip */}
                    <div className="absolute inset-0 bg-spider-blue/10 -skew-x-12 translate-x-10" />

                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring", bounce: 0.5 }}
                        className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-spider-red to-red-900 italic tracking-tighter uppercase drop-shadow-[3px_3px_0px_#000] z-10"
                    >
                        PORTFOLIO
                    </motion.h1>

                    {/* Outline Text Duplicate for Stroke Effect */}
                    <span className="absolute text-5xl md:text-8xl font-black text-black italic tracking-tighter uppercase opacity-30 translate-x-1 translate-y-1 -z-10 blur-sm">
                        PORTFOLIO
                    </span>
                </div>

                {/* Panel 5 (Bottom Left) */}
                <div className="bg-black relative overflow-hidden border-2 md:border-4 border-white/20">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,_#1a1a1a_25%,_transparent_25%,_transparent_50%,_#1a1a1a_50%,_#1a1a1a_75%,_transparent_75%,_transparent)] bg-[length:20px_20px] opacity-20" />
                </div>

                {/* Panel 6 (Bottom Right) */}
                <div className="col-span-1 md:col-span-2 bg-spider-blue relative overflow-hidden border-2 md:border-4 border-black">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,_#000_2px,_transparent_2.5px)] bg-[length:14px_14px]" />
                    <span className="absolute top-4 right-8 text-graffiti-yellow font-black text-3xl md:text-5xl rotate-3 italic drop-shadow-[2px_2px_0_#000]">SNAP!</span>
                </div>
            </div>

            {/* The Web Strand Overlay */}
            {showWeb && <div className="absolute inset-0 z-50 pointer-events-none"><WebStrand /></div>}
        </motion.div>
    );
}

function WebStrand() {
    return (
        <svg
            viewBox="0 0 100 100"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-full pointer-events-none overflow-visible z-50"
            preserveAspectRatio="none"
        >
            <defs>
                {/* Organic Web Texture Filter */}
                <filter id="web-texture" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
                    <feGaussianBlur stdDeviation="0.2" />
                </filter>

                {/* Bright Glow Filter */}
                <filter id="web-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <linearGradient id="webGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#eef" stopOpacity="0.8" />
                </linearGradient>
            </defs>

            {/* Impact Burst at Top (Anchor - where it hits the 'camera' or 'ceiling') */}
            <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{ delay: 0.15, duration: 0.1, type: "spring" }}
                className="origin-top"
                style={{ transformOrigin: "50px 0px" }}
            >
                <path d="M 50 0 L 45 10 L 50 5 L 55 10 Z" fill="white" filter="url(#web-texture)" />
                <path d="M 50 0 L 35 5 L 50 2 L 65 5 Z" fill="white" opacity="0.6" filter="url(#web-texture)" />
                <circle cx="50" cy="0" r="3" fill="white" filter="url(#web-glow)" />
            </motion.g>

            {/* Layer 1: The 'Messy' Outer Web (Textured & Thick) */}
            <motion.path
                initial={{ d: "M 50 110 L 50 110" }}
                animate={{
                    d: [
                        "M 50 110 L 50 110", // Start
                        "M 42 110 L 58 110 L 50 -10" // Shoot past top, wide base
                    ]
                }}
                transition={{ duration: 0.2, ease: "circOut" }}
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.5"
                filter="url(#web-texture)"
            />

            {/* Layer 2: The Core Strand (Sharp & Bright) */}
            <motion.path
                initial={{ d: "M 50 110 L 50 110" }}
                animate={{
                    d: [
                        "M 50 110 L 50 110",
                        "M 48 110 L 52 110 L 50 -5" // Shoot to top
                    ]
                }}
                transition={{ duration: 0.2, ease: "circOut" }}
                fill="url(#webGradient)"
                filter="url(#web-glow)"
                opacity="0.9"
            />

            {/* Layer 3: Subtle Cross-Strand / Detail */}
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.25, ease: "linear" }}
                d="M 50 100 C 45 50 55 20 50 -5"
                stroke="white"
                strokeWidth="1"
                fill="none"
                filter="url(#web-texture)"
            />
        </svg>
    );
}
