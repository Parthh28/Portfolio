"use client";

import { motion } from "framer-motion";
import { X, Cpu, Activity, Database } from "lucide-react";

interface HolographicCardProps {
    title: string;
    description: string;
    level: number;
    onClose: () => void;
}

export default function HolographicCard({ title, description, level, onClose }: HolographicCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-spider-black/60"
        >
            <div className="relative w-full max-w-md bg-spider-black/80 border border-stark-blue/50 rounded-lg shadow-[0_0_30px_rgba(0,168,255,0.3)] overflow-hidden">

                {/* Header / HUD Top Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-stark-blue/30 bg-stark-blue/10">
                    <div className="flex items-center space-x-2">
                        <Cpu className="w-5 h-5 text-stark-cyan animate-pulse" />
                        <span className="text-stark-cyan font-mono tracking-widest text-sm">
                            ANALYSIS_MODE_ACTIVE
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-stark-blue/20 rounded-full transition-colors group"
                    >
                        <X className="w-6 h-6 text-stark-blue group-hover:text-stark-cyan" />
                    </button>
                </div>

                {/* Content Body */}
                <div className="p-8 flex flex-col items-center text-center relative">
                    {/* Background grid overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                        style={{ backgroundImage: 'linear-gradient(rgba(0,168,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,168,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />

                    {/* Stats */}
                    <div className="space-y-6 relative z-10 flex flex-col items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-stark-white mb-2 uppercase tracking-wide drop-shadow-neon">
                                {title}
                            </h3>
                            <p className="text-stark-blue/80 text-sm font-mono leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Big Mastery Circle */}
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="50%" cy="50%" r="45%" fill="none" stroke="#1c2541" strokeWidth="6" />
                                <motion.circle
                                    cx="50%" cy="50%" r="45%" fill="none" stroke="#00A8FF" strokeWidth="6"
                                    strokeDasharray="283"
                                    strokeDashoffset={283 - (283 * level) / 100}
                                    initial={{ strokeDashoffset: 283 }}
                                    animate={{ strokeDashoffset: 283 - (283 * level) / 100 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-stark-white">{level}%</span>
                                <span className="text-[10px] text-stark-blue uppercase tracking-wider">Mastery</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer / Data Stream */}
                <div className="px-6 py-3 bg-stark-blue/5 border-t border-stark-blue/20 flex justify-between items-center text-[10px] font-mono text-stark-blue/60">
                    <div className="flex items-center space-x-2">
                        <Activity className="w-3 h-3 animate-pulse" />
                        <span>SYSTEM_STATUS: OPTIMAL</span>
                    </div>
                    <span>ID: {title.substring(0, 3).toUpperCase()}-{level}X-00</span>
                </div>
            </div>
        </motion.div>
    );
}
