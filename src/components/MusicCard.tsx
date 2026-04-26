"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, Pause, Music } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MusicCard() {
    const [isPlaying, setIsPlaying] = useState(false); // Start paused to allow user interaction
    const [progress, setProgress] = useState(0);
    const [activeLyricIndex, setActiveLyricIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const LYRICS = [
        // Verse 1
        { time: 0.5, text: "Thinkin' in a bad way, losin' your grip" },
        { time: 3.2, text: "Screamin' at my face, baby, don't trip" },
        { time: 5.9, text: "Someone took a big L, don't know how that felt" },
        { time: 8.6, text: "Lookin' at you sideways, party on tilt" },
        { time: 11.3, text: "Ooh-ooh-ooh" },
        { time: 14.0, text: "Some things you just can't refuse" },
        { time: 16.7, text: "She wanna ride me like a cruise" },
        { time: 19.4, text: "And I'm not tryna lose" },

        // Chorus
        { time: 22.1, text: "Then you're left in the dust" },
        { time: 24.8, text: "Unless I stuck by ya" },
        { time: 27.5, text: "You're the sunflower" },
        { time: 30.2, text: "I think your love would be too much" },
        { time: 32.9, text: "Or you'll be left in the dust" },
        { time: 35.6, text: "Unless I stuck by ya" },
        { time: 38.3, text: "You're the sunflower" },
        { time: 41.0, text: "You're the sunflower" },
    ];

    // Audio Ref
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Hydration check
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        // Initialize audio
        audioRef.current = new Audio("/Portfolio/sunflower.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
    }, []);

    // Toggle Play/Pause
    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        setIsPlaying(!isPlaying);
    };

    // Simulate progress bar and lyric scroll
    useEffect(() => {
        if (!isPlaying || !mounted) return;

        const interval = setInterval(() => {
            if (audioRef.current) {
                const currentTime = audioRef.current.currentTime;

                // Sync progress with actual audio if available, else fallback to simulation
                if (audioRef.current.duration) {
                    setProgress((currentTime / audioRef.current.duration) * 100);
                } else {
                    setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
                }

                // Find active lyric
                const index = LYRICS.findIndex((lyric, i) => {
                    const nextLyric = LYRICS[i + 1];
                    return currentTime >= lyric.time && (!nextLyric || currentTime < nextLyric.time);
                });

                if (index !== -1 && index !== activeLyricIndex) {
                    setActiveLyricIndex(index);
                }
            }
        }, 100);

        return () => clearInterval(interval);
    }, [isPlaying, mounted, activeLyricIndex, progress]);

    // Auto-scroll lyrics to active index
    useEffect(() => {
        if (scrollContainerRef.current) {
            const activeEl = scrollContainerRef.current.children[0].children[activeLyricIndex] as HTMLElement;
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [activeLyricIndex]);



    // AntiGravity Sway
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const springRotate = useSpring(rotate, { stiffness: 20, damping: 10 });

    if (!mounted) return null;

    return (
        <div className="relative group perspective-1000 z-30">
            {/* Web Tether */}
            <motion.div
                className="absolute -top-32 left-1/2 w-[2px] h-32 bg-white/20 origin-bottom"
                style={{ rotateZ: springRotate }}
            />

            <motion.div
                style={{ rotateZ: springRotate, transformOrigin: "top center" }}
                className="w-80 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative"
            >
                {/* Background Noise/Texture */}
                <div className="absolute inset-0 bg-halftone opacity-10 pointer-events-none" />

                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-spider-verse-red animate-pulse" : "bg-gray-500"}`} />
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-spider-verse-cyan tracking-widest uppercase leading-none">Status</span>
                            <span className="text-[10px] font-bold text-white tracking-widest uppercase leading-none">{isPlaying ? "VIBING..." : "PAUSED"}</span>
                        </div>
                    </div>
                    <button
                        onClick={togglePlay}
                        className="p-1 rounded-full hover:bg-white/10 transition-colors"
                    >
                        {isPlaying ? <Pause className="w-4 h-4 text-white/80" /> : <Play className="w-4 h-4 text-white/80" />}
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 flex gap-4 items-center">
                    {/* Vinyl Record */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full rounded-full bg-black border border-white/10 relative overflow-hidden shadow-lg flex items-center justify-center"
                        >
                            {/* Vinyl Grooves */}
                            <div className="absolute inset-0 rounded-full border-2 border-white/5 scale-90" />
                            <div className="absolute inset-0 rounded-full border-2 border-white/5 scale-75" />
                            <div className="absolute inset-0 rounded-full border-2 border-white/5 scale-50" />

                            {/* Inner Label */}
                            <div className="w-8 h-8 bg-graffiti-yellow rounded-full flex items-center justify-center">
                                <span className="w-2 h-2 bg-black rounded-full" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Track Info */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">Sunflower</h3>
                        <p className="text-xs text-white/50 truncate">Post Malone, Swae Lee</p>

                        {/* Progress Bar */}
                        <div className="mt-3 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-spider-verse-cyan to-graffiti-yellow"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Lyrics Scroller */}
                <div className="h-24 bg-black/40 relative overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        className="h-full overflow-y-auto no-scrollbar p-4 text-xs font-serif text-white/70 text-center leading-relaxed mask-image-y"
                    >
                        <div className="space-y-4 pb-10">
                            {LYRICS.map((line, i) => (
                                <p
                                    key={i}
                                    className={`transition-all duration-300 ${i === activeLyricIndex
                                        ? "text-[#00F5FF] font-black scale-110"
                                        : "text-white/30 blur-[0.5px] scale-95"
                                        }`}
                                    style={{
                                        textShadow: i === activeLyricIndex ? "0 0 10px rgba(0, 245, 255, 0.8), 0 0 20px rgba(0, 245, 255, 0.4)" : "none"
                                    }}
                                >
                                    {line.text}
                                </p>
                            ))}
                        </div>
                        <style jsx>{`
                            .no-scrollbar::-webkit-scrollbar { display: none; }
                            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                            .mask-image-y { mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent); }
                        `}</style>
                    </div>
                </div>

                {/* Audio Viz Bars (Fake) */}
                <div className="absolute bottom-0 left-0 w-full h-1 flex items-end justify-between px-1 opacity-50">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-1 bg-spider-verse-cyan rounded-t-sm animate-wave"
                            style={{
                                height: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random()}s`,
                                animationDuration: `${0.5 + Math.random()}s`
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
