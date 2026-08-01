"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";

// Placeholder timeline data that the user will populate later
const TIMELINE_DATA = [
    {
        id: 1,
        type: "study",
        icon: GraduationCap,
        date: "2025 - 2028",
        title: "BCA(Ai-ML) in Computer Science",
        institution: "Reva University",
        description: "Specialized in web technologies and artificial intelligence. Graduated top of the class. Built multiple high-performance web applications as part of senior capstone projects."
    }
    
];

export default function TimelineSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const webLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    return (
        <section ref={containerRef} className="relative w-full min-h-screen py-20 px-4 overflow-hidden">
            {/* Header */}
            <div className="w-full max-w-6xl mx-auto mb-20 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-spider-white tracking-widest uppercase mb-4 drop-shadow-neon">
                    Path of the Parth
                </h2>
                <div className="inline-block px-4 py-1 border border-stark-cyan/30 rounded-full bg-spider-black/50 backdrop-blur-md">
                    <p className="text-stark-cyan font-mono text-sm">EXPERIENCE // ACADEMICS // ACHIEVEMENTS</p>
                </div>
            </div>

            {/* Timeline Container */}
            <div className="max-w-5xl mx-auto relative z-10">
                
                {/* Central Web Strand (The Line) */}
                <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-stark-blue/20 -translate-x-1/2">
                    {/* Animated Fill Line */}
                    <motion.div 
                        suppressHydrationWarning
                        className="absolute top-0 left-0 w-full bg-stark-cyan shadow-[0_0_15px_#00FFFF]"
                        style={{ height: mounted ? webLineHeight : "0%" }}
                    />
                </div>

                {/* Timeline Events */}
                <div className="flex flex-col gap-12 md:gap-24">
                    {TIMELINE_DATA.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div 
                                key={item.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Left/Right Spacer for Desktop layout */}
                                <div className="hidden md:block w-5/12" />

                                {/* Center Node (Icon) */}
                                <div className={`absolute left-[20px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-stark-cyan bg-spider-black shadow-[0_0_20px_rgba(0,255,255,0.4)] z-20`}>
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-stark-cyan drop-shadow-neon" />
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                                    <motion.div 
                                        whileHover={{ scale: 1.02 }}
                                        className="relative p-6 md:p-8 rounded-xl bg-stark-blue/5 border border-stark-blue/20 backdrop-blur-md overflow-hidden group transition-all hover:bg-stark-blue/10 hover:border-stark-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                                    >
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-stark-cyan/10 rounded-bl-full pointer-events-none" />
                                        
                                        {/* Date Badge */}
                                        <span className={`inline-block px-3 py-1 bg-stark-cyan/20 border border-stark-cyan/30 text-stark-cyan font-mono text-xs rounded-full mb-4 shadow-[0_0_10px_rgba(0,255,255,0.2)]`}>
                                            {item.date}
                                        </span>

                                        <h3 className="text-2xl font-bold text-stark-white mb-1 uppercase tracking-wide drop-shadow-sm">
                                            {item.title}
                                        </h3>
                                        
                                        <h4 className="text-md text-spider-blue/90 font-semibold mb-4 flex items-center gap-2">
                                            {isEven ? (
                                                <>
                                                    <span className="hidden md:inline-block w-6 h-[1px] bg-stark-cyan/50" />
                                                    {item.institution}
                                                </>
                                            ) : (
                                                <>
                                                    {item.institution}
                                                    <span className="hidden md:inline-block w-6 h-[1px] bg-stark-cyan/50" />
                                                </>
                                            )}
                                        </h4>

                                        <p className="text-spider-white/70 text-sm leading-relaxed font-mono">
                                            {item.description}
                                        </p>
                                        
                                        {/* Cinematic Hover effect block */}
                                        <div className={`absolute bottom-0 ${isEven ? 'left-0' : 'right-0'} w-1/3 h-1 bg-gradient-to-r ${isEven ? 'from-stark-cyan/80 to-transparent' : 'from-transparent to-stark-cyan/80'} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
