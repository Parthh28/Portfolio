"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface GlitchTextProps {
    text: string;
    isActive: boolean;
    className?: string;
    onComplete?: () => void;
}

export default function GlitchText({ text, isActive, className = "", onComplete }: GlitchTextProps) {
    const controls = useAnimation();

    useEffect(() => {
        if (isActive) {
            const sequence = async () => {
                // Glitch sequence
                await controls.start({
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 2, -2, 0],
                    textShadow: [
                        "0px 0px 0px rgba(0,0,0,0)",
                        "-2px 0px 0px #E63946, 2px 0px 0px #00F5FF", // Red/Cyan split
                        "2px 1px 0px #E63946, -2px -1px 0px #00F5FF",
                        "-1px -2px 0px #E63946, 1px 2px 0px #00F5FF",
                        "0px 0px 0px rgba(0,0,0,0)"
                    ],
                    transition: { duration: 0.3, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
                });

                if (onComplete) {
                    onComplete();
                }
            };
            sequence();
        }
    }, [isActive, controls, onComplete]);

    return (
        <span className={`relative inline-block ${className}`}>
            <motion.span animate={controls} className="relative z-10 inline-block">
                {text}
            </motion.span>

            {/* Duplicate layers for stronger glitch effect during animation */}
            {isActive && (
                <>
                    <motion.span
                        className="absolute top-0 left-0 text-spider-verse-red mix-blend-screen opacity-70 z-0 pointer-events-none"
                        animate={{
                            x: [-2, 2, -3, 1, 0],
                            clipPath: [
                                "inset(10% 0 80% 0)",
                                "inset(50% 0 10% 0)",
                                "inset(80% 0 5% 0)",
                                "inset(0% 0 0% 0)"
                            ]
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {text}
                    </motion.span>
                    <motion.span
                        className="absolute top-0 left-0 text-spider-verse-cyan mix-blend-screen opacity-70 z-0 pointer-events-none"
                        animate={{
                            x: [2, -2, 3, -1, 0],
                            clipPath: [
                                "inset(80% 0 10% 0)",
                                "inset(10% 0 50% 0)",
                                "inset(30% 0 20% 0)",
                                "inset(0% 0 0% 0)"
                            ]
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {text}
                    </motion.span>
                </>
            )}
        </span>
    );
}
