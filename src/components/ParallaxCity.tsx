"use client";

import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion";
import { useRef } from "react";

export default function ParallaxCity() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    // Get scroll velocity
    const scrollVelocity = useVelocity(scrollY);
    // Smooth the velocity for a less jumpy blur effect
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

    // Parallax layers
    // As we scroll down (climb down), the layers move at different speeds.
    // 0% scroll = Top of building
    // 100% scroll = Street level

    // Map velocity (-1500 to 1500) to blur amount (0px to 12px) - More sensitive/visible
    const blurAmount = useTransform(smoothVelocity, [-1500, 0, 1500], [12, 0, 12]);
    // Create filter string: "blur(5px)"
    const blurFilter = useTransform(blurAmount, (v) => `blur(${v}px)`);

    // Distant skyline (moves very slowly)
    const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

    // Mid-ground buildings (move faster)
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    // Foreground (closest buildings, move fastest)
    const foreY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

    return (
        <div ref={targetRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
            {/* Layer 1: Sky/Distant */}
            <motion.div
                style={{ y: skyY }}
                className="absolute inset-x-0 bottom-0 h-full w-full bg-gradient-to-b from-[#050505] to-[#1a1a1a]"
            />

            {/* Layer 2: Mid-ground Skyline */}
            <motion.div
                style={{ y: midY }}
                className="absolute inset-x-0 bottom-[-20%] h-[120%] w-full opacity-80 flex items-end justify-around blur-[1px]"
            >
                {/* Procedural Buildings (Silhouette) */}
                <div className="w-[10%] h-[40%] bg-spider-gunmetal" />
                <div className="w-[15%] h-[60%] bg-spider-gunmetal" />
                <div className="w-[8%] h-[30%] bg-spider-gunmetal" />
                <div className="w-[20%] h-[50%] bg-spider-gunmetal" />
                <div className="w-[12%] h-[45%] bg-spider-gunmetal" />
            </motion.div>

            {/* Layer 3: Foreground Buildings (Detailed) */}
            <motion.div
                style={{ y: foreY }}
                className="absolute inset-x-0 bottom-[-10%] h-[110%] w-full flex items-end justify-between px-10"
            >
                <div className="w-[20%] h-[70%] bg-gradient-to-b from-[#151515] to-spider-black border-t-2 border-spider-red/30 relative block shadow-2xl">
                    {/* Windows (Neon) */}
                    <div className="absolute top-10 left-4 w-1 h-8 bg-red-500/80 box-shadow-glow" />
                    <div className="absolute top-24 right-4 w-1 h-1 bg-red-500/50" />
                    <div className="absolute bottom-1/3 left-1/3 w-8 h-12 bg-spider-blue/10 border border-spider-blue/30" />
                </div>

                <div className="w-[25%] h-[80%] bg-gradient-to-b from-[#1a1a1a] to-black border-t-2 border-spider-blue/30 relative block shadow-2xl">
                    <div className="absolute top-20 left-10 w-32 h-1 bg-spider-blue/50 box-shadow-glow" />
                    <div className="absolute top-24 left-10 w-32 h-1 bg-spider-blue/30" />
                </div>

                <div className="w-[15%] h-[60%] bg-gradient-to-b from-[#151515] to-spider-black border-t-2 border-spider-red/30 relative block" />
            </motion.div>
        </div>
    );
}
