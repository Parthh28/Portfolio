"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, MapPin, Target } from "lucide-react";

interface Project {
    id: number;
    title: string;
    description: string;
    status: "MISSION COMPLETE" | "IN PROGRESS" | "CLASSIFIED";
    tech: string[];
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    location: string;
    link?: string;
}

// Projects distributed across Key Bangalore Tech Hubs
const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Lab-House Interface",
        description: "A centralized calibration portal. Calibrated sensitive instruments with 99.9% accuracy.",
        status: "MISSION COMPLETE",
        tech: ["Next.js", "Tailwind", "Supabase"],
        x: 40,
        y: 30, // Indiranagar / East-Central
        location: "INDIRANAGAR",
        link: "https://labhouse1.netlify.app/"
    },
    {
        id: 2,
        title: "Habit Log AI",
        description: "Predictive behavioral analysis system. Tracking daily patterns to optimize human efficiency.",
        status: "IN PROGRESS",
        tech: ["React", "TensorFlow.js", "D3.js"],
        x: 80,
        y: 40, // Whitefield / East
        location: "WHITEFIELD",
        link: "https://habitlog.netlify.app/"
    },
    {
        id: 3,
        title: "Serene Reminder",
        description: "A simple reminder app that helps you stay on track with your daily tasks and routines.",
        status: "IN PROGRESS",
        tech: ["React", "CSS", "Supabase"],
        x: 50,
        y: 80, // Electronic City / South
        location: "ELECTRONIC CITY",
        link: "https://habit-tracker-puce-eight.vercel.app/"
    },
    {
        id: 4,
        title: "NutriLife",
        description: "A comprehensive nutrition and fitness tracking platform designed to help users achieve their health goals.",
        status: "MISSION COMPLETE",
        tech: ["HTML", "CSS", "JS"],
        x: 30,
        y: 60, // Koramangala / South-Central
        location: "KORAMANGALA",
        link: "https://parthh28.github.io/NutriLife/"
    }
];

export default function MissionMap() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-spider-black">

            {/* Header */}
            <div className="relative z-10 text-center mb-10">
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-spider-red to-spider-blue uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                    Mission Log: BENGALURU
                </h2>
                <div className="flex items-center justify-center gap-4 mt-2">
                    <span className="text-spider-blue/80 font-mono tracking-[0.2em] text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        LIVE SATELLITE FEED
                    </span>
                    <span className="text-spider-red/80 font-mono tracking-[0.2em] text-sm">
                        // SECURE CHANNEL
                    </span>
                </div>
            </div>

            {/* Holographic Tactical Grid */}
            <div className="relative w-[90%] max-w-5xl aspect-[16/9] border-2 border-spider-blue/30 rounded-lg bg-spider-black/80 backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(50,50,255,0.1)] group">

                {/* 1. Base Grid Layer */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />

                {/* 2. Tactical Overlay (Connecting Nodes) */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Central Hub Circle */}
                    <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(14, 165, 233, 0.2)" strokeWidth="1" strokeDasharray="4 2">
                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(14, 165, 233, 0.1)" strokeWidth="1" strokeDasharray="10 10">
                        <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="30s" repeatCount="indefinite" />
                    </circle>
                    {/* Zone Recon Rectangles */}
                    <rect x="35" y="25" width="10" height="10" fill="none" stroke="#0ea5e9" strokeOpacity="0.3" rx="2" />
                    <text x="36" y="24" fill="#0ea5e9" fontSize="2" fontFamily="monospace" opacity="0.7">SECTOR 1: IND</text>
                    <rect x="75" y="35" width="10" height="10" fill="none" stroke="#0ea5e9" strokeOpacity="0.3" rx="2" />
                    <text x="76" y="34" fill="#0ea5e9" fontSize="2" fontFamily="monospace" opacity="0.7">SECTOR 2: WFD</text>
                    <rect x="45" y="75" width="10" height="10" fill="none" stroke="#0ea5e9" strokeOpacity="0.3" rx="2" />
                    <text x="46" y="74" fill="#0ea5e9" fontSize="2" fontFamily="monospace" opacity="0.7">SECTOR 3: ECITY</text>
                    <rect x="25" y="55" width="10" height="10" fill="none" stroke="#0ea5e9" strokeOpacity="0.3" rx="2" />
                    <text x="26" y="54" fill="#0ea5e9" fontSize="2" fontFamily="monospace" opacity="0.7">SECTOR 4: KORM</text>
                </svg>


                {/* Mission Markers */}
                {PROJECTS.map((project) => (
                    <motion.button
                        key={project.id}
                        layoutId={`marker-${project.id}`}
                        onClick={() => setSelectedId(project.id)}
                        className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center z-20 group/marker"
                        style={{ left: `${project.x}%`, top: `${project.y}%` }}
                        whileHover={{ scale: 1.1 }}
                    >
                        {/* High-Tech Reticle */}
                        <div className="absolute inset-0 border border-spider-red rounded-full animate-ping opacity-20" />
                        <div className="absolute inset-2 border border-spider-red rounded-full animate-spin-slow opacity-80 border-t-transparent border-l-transparent" />
                        <div className="w-2 h-2 bg-spider-red rounded-full shadow-[0_0_15px_#FF2400]" />

                        {/* Hover Label */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-spider-black/90 border border-spider-red/50 text-spider-red text-[10px] font-mono whitespace-nowrap px-3 py-1 opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none z-30 shadow-lg">
                            Target Locked: {project.title}
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Modal - Holographic Projection */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        {PROJECTS.map((project) => (
                            project.id === selectedId && (
                                <motion.div
                                    key={project.id}
                                    layoutId={`marker-${project.id}`}
                                    className="relative w-full max-w-2xl bg-black border-2 border-spider-blue shadow-[0_0_50px_rgba(14,165,233,0.3)] p-8 overflow-hidden z-50"
                                >
                                    {/* Hologram Scan/Glitch Overlay - Reduced to 2% opacity to improve text readability */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.02)_50%)] bg-[size:100%_3px] pointer-events-none z-10" />

                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-4 right-4 text-spider-blue hover:text-white transition-colors z-50 bg-black/50 rounded-full p-1"
                                    >
                                        <X size={24} />
                                    </button>

                                    <div className="relative z-20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Target className="text-spider-red" size={20} />
                                            <span className="text-spider-red font-mono text-sm tracking-widest text-shadow-glow">TARGET ACQUIRED</span>
                                        </div>

                                        <motion.h3
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-4xl font-black text-white uppercase tracking-widest mb-4 drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
                                        >
                                            {project.title}
                                        </motion.h3>

                                        <div className="flex items-center gap-4 mb-6 text-sm font-mono border border-spider-blue/50 p-3 bg-black/60 rounded backdrop-blur-sm shadow-inner shadow-spider-blue/10">
                                            <span className={`px-2 py-0.5 font-bold border ${project.status === "MISSION COMPLETE" ? "border-green-500 text-green-400 bg-green-900/40" :
                                                    project.status === "IN PROGRESS" ? "border-yellow-500 text-yellow-400 bg-yellow-900/40" :
                                                        "border-red-500 text-red-400 bg-red-900/40"
                                                }`}>
                                                [{project.status}]
                                            </span>
                                            <span className="text-cyan-300 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">LOC: {project.location}</span>
                                        </div>

                                        <p className="text-white font-mono mb-8 leading-relaxed text-lg bg-black/40 p-2 rounded border-l-2 border-spider-blue/50">
                                            {project.description}
                                        </p>

                                        <div className="mb-8">
                                            <h4 className="text-xs text-spider-blue mb-3 font-bold uppercase tracking-widest border-b border-spider-blue/30 inline-block pb-1">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(t => (
                                                    <span key={t} className="px-3 py-1 bg-spider-blue/10 text-cyan-300 text-xs font-bold border border-spider-blue/40 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 bg-spider-red text-white font-bold py-3 px-8 hover:bg-red-700 transition-all uppercase tracking-wider text-sm clip-path-slant group/btn relative overflow-hidden shadow-[0_0_20px_rgba(255,0,0,0.4)]"
                                                style={{ clipPath: "polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)" }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500" />
                                                Initialize Protocol <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            )
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
