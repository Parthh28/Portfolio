"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BiometricHUD({ children }: { children: React.ReactNode }) {
    const [scanning, setScanning] = useState(true);

    useEffect(() => {
        // Simulate scan cycle
        const interval = setInterval(() => {
            setScanning((prev) => !prev);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group p-1 z-10">
            {/* HUD Frame */}
            <div className="absolute inset-0 border border-spider-blue/20 rounded-sm pointer-events-none">
                {/* Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-spider-blue/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-spider-blue/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-spider-blue/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-spider-blue/60" />

                {/* Data Points */}
                <div className="absolute -top-6 left-0 text-[10px] text-spider-blue/80 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 bg-spider-blue rounded-full animate-pulse" />
                    ID VERIFIED
                </div>
                <div className="absolute -bottom-6 right-0 text-[10px] text-spider-red/80 font-mono">
                    THREAT LEVEL: LOW
                </div>
            </div>

            {/* Scanning Line */}
            <motion.div
                animate={{
                    top: ["0%", "100%", "0%"],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                    repeatDelay: 1
                }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)] z-20 pointer-events-none"
            />

            {/* Grid Overlay (Appears on Hover) */}
            <div className="absolute inset-0 bg-hex-mesh opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Main Content (Glassmorphism) */}
            <div className="relative glass-panel rounded-sm overflow-hidden">
                {children}
            </div>
        </div>
    );
}
