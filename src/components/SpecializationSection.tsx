"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EdithBackground from "./EdithBackground";
import HolographicCard from "./HolographicCard";
import { Code, Cpu, ChevronRight, Layout, Layers, Terminal } from "lucide-react";
import { Skills } from "@/components/ui/skills-showcase";

// Data Structure
const SPECIALIZATIONS = [
    {
        id: "frontend",
        label: "Front End",
        icon: Code,
        level: 98,
        description: "Building responsive, high-performance user interfaces with modern React ecosystems.",
    },
    {
        id: "web-design",
        label: "Web Design",
        icon: Layout,
        level: 95,
        description: "Designing visually captivating, modern web aesthetics with dynamic motion and rich visual hierarchies.",
    },
    {
        id: "ui-ux",
        label: "UI/UX",
        icon: Layers,
        level: 96,
        description: "Crafting intuitive, user-centered digital experiences with seamless micro-interactions and accessible flows.",
    },
];

const HolographicSuitMenu = ({ items, onSelect, onClose }: { items: typeof SPECIALIZATIONS, onSelect: (spec: typeof SPECIALIZATIONS[0]) => void, onClose: () => void }) => {

    return (
        <section className="relative w-full min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden">
            {/* Header (Fixed) */}
            <div className="absolute top-0 left-0 w-full z-40 py-6 bg-gradient-to-b from-spider-black via-spider-black/90 to-transparent pointer-events-none">
                <div className="w-full max-w-6xl mx-auto px-4 text-center pointer-events-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-spider-white mb-2 tracking-widest uppercase text-stark drop-shadow-neon">
                        <span className="text-neon-cyan mr-4 opacity-50 font-mono text-xl align-middle">03.</span>
                        Suit Upgrades
                    </h2>
                    {/* File System Breadcrumb */}
                    <div className="flex items-center justify-center space-x-2 text-stark-blue/60 font-mono text-xs select-none bg-spider-black/50 backdrop-blur-md py-2 rounded-full w-fit mx-auto px-6 border border-stark-blue/20">
                        <span className="hover:text-stark-cyan cursor-pointer transition-colors" onClick={onClose}>ROOT</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="hover:text-stark-cyan cursor-pointer transition-colors" onClick={onClose}>SYSTEM</span>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-stark-cyan font-bold">SPECIALIZATION_MODULES</span>
                    </div>
                </div>
            </div>

            {/* Holographic Radial Menu */}
            <div className="relative w-full max-w-4xl aspect-square max-h-[800px] mt-10 md:mt-20 mx-auto">
                
                {/* Connecting Web Filaments (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    {items.map((_, i) => {
                        const angle = (i * (360 / items.length) - 90) * (Math.PI / 180);
                        const x2 = 50 + Math.cos(angle) * 45; // X radius 45%
                        const y2 = 50 + Math.sin(angle) * 25; // Y radius 25% (makes an ellipse)
                        return (
                            <motion.line
                                key={`line-${i}`}
                                x1="50%"
                                y1="50%"
                                x2={`${x2}%`}
                                y2={`${y2}%`}
                                stroke="rgba(0, 255, 255, 0.4)"
                                strokeWidth="2"
                                filter="url(#glow)"
                                initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 1.5, delay: i * 0.2 + 0.5, ease: "easeInOut" }}
                            />
                        );
                    })}
                </svg>

                {/* Central Core */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                >
                    <div className="relative flex items-center justify-center">
                        {/* Core Rings */}
                        <motion.div 
                            className="absolute w-32 h-32 md:w-48 md:h-48 border border-stark-cyan/30 rounded-full"
                            style={{ scaleY: 0.6 }} // Simulate 3D tilt
                            animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
                        />
                        <motion.div 
                            className="absolute w-28 h-28 md:w-40 md:h-40 border-2 border-dashed border-stark-blue/50 rounded-full"
                            style={{ scaleY: 0.6 }} // Simulate 3D tilt
                            animate={{ rotate: -360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />
                        
                        {/* Core Button/Display */}
                        <div className="w-20 h-20 md:w-28 md:h-28 bg-spider-black rounded-full border-2 border-stark-cyan flex items-center justify-center shadow-[0_0_30px_rgba(0,255,255,0.6)] animate-pulse-glow z-10 relative">
                            <Cpu className="w-10 h-10 md:w-14 md:h-14 text-stark-cyan drop-shadow-neon" />
                        </div>
                    </div>
                </motion.div>

                {/* Radial Skill Nodes */}
                {items.map((spec, i) => {
                    const angle = (i * (360 / items.length) - 90) * (Math.PI / 180);
                    const left = 50 + Math.cos(angle) * 45; // X radius 45%
                    const top = 50 + Math.sin(angle) * 25; // Y radius 25%

                    // Position label dynamically based on Y position (nodes top, label top; nodes bottom, label bottom)
                    const labelTop = top < 50 ? '-140%' : '110%';

                    return (
                        <motion.div
                            key={spec.id}
                            className="absolute z-30"
                            style={{ 
                                left: `${left}%`, 
                                top: `${top}%`,
                                x: "-50%",
                                y: "-50%"
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.15 + 1, type: "spring" }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.15, zIndex: 40 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelect(spec)}
                                className="group cursor-pointer flex flex-col items-center justify-center gap-2"
                            >
                                {/* Holographic Hexagon/Circle Body */}
                                <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-stark-blue/10 border border-stark-cyan/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(0,168,255,0.3)] transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,255,255,0.8)] group-hover:bg-stark-cyan/20 group-hover:border-stark-cyan">
                                    <spec.icon className="w-6 h-6 md:w-10 md:h-10 text-stark-white group-hover:text-stark-cyan transition-colors duration-300 drop-shadow-neon" />
                                    
                                    {/* Rotating target ring on hover */}
                                    <motion.div 
                                        className="absolute inset-[-8px] border border-dashed border-stark-cyan/0 rounded-full group-hover:border-stark-cyan/60"
                                        animate={{ rotate: 180 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    />
                                    
                                    {/* Scanline effect */}
                                    <div className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-full h-[2px] bg-stark-cyan/80 shadow-[0_0_10px_#00FFFF] -translate-y-full group-hover:animate-scan" />
                                    </div>
                                </div>

                                {/* Label - Positioned dynamically */}
                                <div 
                                    className="absolute left-1/2 -translate-x-1/2 w-[150px] text-center flex flex-col items-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity"
                                    style={{ top: labelTop }}
                                >
                                    <h4 className="text-xs md:text-sm font-bold text-stark-white uppercase tracking-wider drop-shadow-neon bg-spider-black/60 px-2 py-1 rounded inline-block">
                                        {spec.label}
                                    </h4>
                                    <div className="text-[10px] font-mono text-stark-cyan mt-1 hidden md:block">
                                        LEVEL {spec.level}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* System Status (Bottom) */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 text-stark-blue/60 font-mono text-[10px] md:text-xs">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stark-cyan animate-pulse"></span> ONLINE</span>
                    <span>|</span>
                    <span>ALL SYSTEMS OPTIMAL</span>
                    <span>|</span>
                    <span className="text-stark-cyan">M.K. VII</span>
                </div>
                <div className="opacity-50">CLICK MODULE TO EXPAND DIAGNOSTICS</div>
            </div>
            
            {/* Custom CSS for Animations inside this component context */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan-animation {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(400%); }
                }
                .group:hover .animate-scan {
                    animation: scan-animation 2s linear infinite;
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.1); }
                    50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.3); }
                }
                .animate-pulse-glow {
                    animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}} />
        </section>
    );
};

export default function SpecializationSection() {
    const [selectedSpec, setSelectedSpec] = useState<typeof SPECIALIZATIONS[0] | null>(null);
    const [rootOpen, setRootOpen] = useState(false);

    return (
        <div className="relative w-full bg-spider-black text-white">
            {/* Note: changed section to div wrapper to handle varying heights */}
            <EdithBackground className="absolute inset-0 z-0 opacity-40 pointer-events-none mix-blend-screen" />

            <AnimatePresence mode="wait">
                {!rootOpen ? (
                    <motion.section
                        key="root-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center py-20"
                    >
                        {/* Title & Static Content */}
                        <div className="w-full max-w-6xl px-4 text-center">
                            <h2 className="text-4xl md:text-6xl font-black text-spider-white mb-4 tracking-widest uppercase text-stark drop-shadow-neon">
                                <span className="text-neon-cyan mr-4 opacity-50 font-mono text-2xl align-middle">03.</span>
                                TECH STACK
                            </h2>
                            <div className="flex items-center justify-center space-x-2 text-stark-blue/60 font-mono text-xs mb-16 select-none">
                                <span className="text-stark-cyan font-bold">ROOT</span>
                                <ChevronRight className="w-3 h-3" />
                                <span>SYSTEM</span>
                                <ChevronRight className="w-3 h-3" />
                                <span>TECH_STACK_MODULES</span>
                            </div>

                            {/* Interactive Skills Showcase */}
                            <div className="flex flex-col items-center justify-center my-6 w-full">
                                <Skills
                                    onSkillClick={(skill) => {
                                        const found = SPECIALIZATIONS.find(
                                            (s) => s.label.toLowerCase() === skill.name.toLowerCase()
                                        );
                                        if (found) {
                                            setSelectedSpec(found);
                                        }
                                    }}
                                />
                            </div>

                            <div className="flex justify-center mt-4">
                                <motion.button
                                    onClick={() => setRootOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    suppressHydrationWarning
                                    className="px-8 py-3.5 bg-stark-cyan/10 hover:bg-stark-cyan/20 border border-stark-cyan text-stark-cyan font-mono text-xs md:text-sm tracking-widest uppercase rounded-full shadow-[0_0_20px_rgba(0,255,255,0.4)] hover:shadow-[0_0_35px_rgba(0,255,255,0.8)] transition-all flex items-center gap-3 cursor-pointer group"
                                >
                                    <span>INITIALIZE MODULES</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.section>
                ) : (
                    <motion.div
                        key="scroll-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative z-10"
                    >
                        <HolographicSuitMenu
                            items={SPECIALIZATIONS}
                            onSelect={setSelectedSpec}
                            onClose={() => setRootOpen(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Holographic Detail Modal */}
            <AnimatePresence>
                {selectedSpec && (
                    <HolographicCard
                        title={selectedSpec.label}
                        level={selectedSpec.level}
                        description={selectedSpec.description}
                        onClose={() => setSelectedSpec(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
