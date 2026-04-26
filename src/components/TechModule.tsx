"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TechModuleProps {
    icon: LucideIcon;
    label: string;
    level: number; // 0 - 100
}

export default function TechModule({ icon: Icon, label, level }: TechModuleProps) {
    return (
        <div className="relative group w-32 h-32 flex flex-col items-center justify-center cursor-pointer">
            {/* Background Glow (Pulse) */}
            <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-spider-blue/20 rounded-full blur-xl"
            />

            {/* Hexagon Frame */}
            <div className="relative w-24 h-24 glass-panel clip-path-hexagon flex items-center justify-center border border-spider-blue/30 group-hover:border-neon-cyan transition-colors duration-300">
                <Icon className="w-10 h-10 text-spider-white group-hover:text-neon-cyan transition-colors duration-300" strokeWidth={1.5} />

                {/* Level Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                    <circle
                        cx="50%" cy="50%" r="48%"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2"
                    />
                    <motion.circle
                        cx="50%" cy="50%" r="48%"
                        fill="none"
                        stroke="#45a29e"
                        strokeWidth="2"
                        strokeDasharray="300"
                        strokeDashoffset={300 - (300 * level) / 100}
                        initial={{ strokeDashoffset: 300 }}
                        whileInView={{ strokeDashoffset: 300 - (300 * level) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
            </div>

            {/* Scanning Brackets (Appear on Hover) */}
            <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-cyan" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-cyan" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-cyan" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-cyan" />
            </div>

            {/* Label (Tooltip style but always visible below) */}
            <div className="absolute -bottom-10 flex flex-col items-center">
                <div className="text-xs font-mono text-spider-white/60 tracking-widest uppercase group-hover:text-neon-cyan transition-colors">
                    {label}
                </div>
                {/* Module Loaded Flicker */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] text-neon-cyan/80 font-mono mt-1 animate-pulse">
                    MODULE: LOADED
                </div>
            </div>
        </div>
    );
}
