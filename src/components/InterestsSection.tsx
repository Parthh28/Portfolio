"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
    Camera, 
    Music, 
    Play, 
    Pause, 
    Layers, 
    RotateCcw
} from "lucide-react";
import { cn, assetPath } from "@/lib/utils";

// Photo Stack Items (Actual photos across the portfolio)
const PHOTO_STACK = [
    {
        id: 1,
        title: "Late Night Engineering",
        caption: "03:00 AM // Flow state with mechanical switches & synthwave.",
        tag: "DEVELOPMENT",
        imageSrc: assetPath("/Me.jpg"),
        color: "from-cyan-500/20 via-blue-600/30 to-black"
    },
    {
        id: 2,
        title: "Lab-House Portal Calibration",
        caption: "High-precision instrument tracking and engineering dashboards.",
        tag: "ENGINEERING",
        imageSrc: assetPath("/project.png"),
        color: "from-red-500/20 via-purple-600/30 to-black"
    },
    {
        id: 3,
        title: "Habit Log AI Architecture",
        caption: "Predictive behavioral analytics and real-time data visualization.",
        tag: "AI & ANALYTICS",
        imageSrc: assetPath("/habit.png"),
        color: "from-emerald-500/20 via-teal-600/30 to-black"
    },
    {
        id: 4,
        title: "Serene Gamified Ecosystem",
        caption: "Designing micro-interactions and RPG-inspired habit progression.",
        tag: "UI/UX DESIGN",
        imageSrc: assetPath("/Serene.png"),
        color: "from-purple-500/20 via-indigo-600/30 to-black"
    },
    {
        id: 5,
        title: "NutriLife Health Tracking",
        caption: "Building responsive fitness and nutrition interfaces for daily routines.",
        tag: "FRONTEND",
        imageSrc: assetPath("/NutriLife.png"),
        color: "from-orange-500/20 via-amber-600/30 to-black"
    }
];

// Favorite Songs
const FAVORITE_SONGS = [
    {
        id: 1,
        title: "Sunflower",
        artist: "Post Malone, Swae Lee",
        album: "Spider-Man: Into the Spider-Verse",
        duration: "2:38",
        genre: "Chill / Hip-Hop"
    },
    {
        id: 2,
        title: "Starboy",
        artist: "The Weeknd, Daft Punk",
        album: "Synthwave / Cyberpunk Vibes",
        duration: "3:50",
        genre: "Electronic / R&B"
    },
    {
        id: 3,
        title: "Nightcall",
        artist: "Kavinsky",
        album: "Outrun / Late Night Focus",
        duration: "4:18",
        genre: "Synthwave"
    }
];

export default function InterestsSection() {
    // Photo Stack state (index of top card)
    const [topPhotoIndex, setTopPhotoIndex] = useState(0);
    // Active Song state
    const [currentSongId, setCurrentSongId] = useState<number>(1);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);

    const handleNextPhoto = () => {
        setTopPhotoIndex((prev) => (prev + 1) % PHOTO_STACK.length);
    };

    return (
        <section className="relative w-full py-28 bg-spider-black text-white overflow-hidden pointer-events-auto border-t border-b border-white/10">
            {/* Ambient Cyber Lighting */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-stark-cyan/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-spider-red/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stark-cyan/10 border border-stark-cyan/30 text-xs font-share text-stark-cyan uppercase tracking-widest mb-3">
                            <Layers className="w-3.5 h-3.5 text-stark-cyan" />
                            <span>{"OFF-DUTY PROTOCOLS // THE PERSONAL SIDE"}</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black font-syncopate uppercase tracking-tight text-white">
                            BEYOND THE <span className="text-[#00F5FF] drop-shadow-[0_0_20px_rgba(0,245,255,0.8)]">SCREEN</span>
                        </h2>
                    </div>
                    <p className="text-xs font-share text-white/50 max-w-xs md:text-right uppercase tracking-wider">
                        {"// SNAPSHOTS, HOBBIES & FAVORITE SOUNDTRACKS THAT FUEL CREATIVITY"}
                    </p>
                </div>

                {/* 2-Column Main Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* LEFT COLUMN (5 Cols): Interactive Photo Stack */}
                    <div className="lg:col-span-5 flex flex-col items-center">
                        <div className="w-full flex items-center justify-between mb-4 px-2">
                            <span className="text-xs font-share text-stark-cyan uppercase tracking-widest flex items-center gap-2">
                                <Camera className="w-3.5 h-3.5" /> {"PHOTO ARCHIVES // STACK"}
                            </span>
                            <button
                                onClick={handleNextPhoto}
                                suppressHydrationWarning
                                className="text-xs font-share text-white/60 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                                title="Shuffle top photo"
                            >
                                <RotateCcw className="w-3.5 h-3.5" /> SHUFFLE
                            </button>
                        </div>

                        {/* Stack Container */}
                        <div 
                            onClick={handleNextPhoto}
                            className="relative w-full aspect-[4/5] max-w-sm cursor-pointer select-none group"
                        >
                            {PHOTO_STACK.map((photo, index) => {
                                // Calculate offset based on order relative to topPhotoIndex
                                const order = (index - topPhotoIndex + PHOTO_STACK.length) % PHOTO_STACK.length;
                                const isTop = order === 0;

                                // Transformations for fanned deck effect
                                const rotateVal = order === 0 ? 0 : order === 1 ? 5 : -5;
                                const translateYVal = order * 12;
                                const scaleVal = 1 - order * 0.05;
                                const zIndexVal = 30 - order * 10;

                                return (
                                    <motion.div
                                        key={photo.id}
                                        animate={{
                                            rotate: rotateVal,
                                            y: translateYVal,
                                            scale: scaleVal,
                                            opacity: order > 2 ? 0 : 1
                                        }}
                                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ zIndex: zIndexVal }}
                                        className={cn(
                                            "absolute inset-0 rounded-2xl p-4 border flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.9)] transition-shadow",
                                            "bg-[#0a0a0a]",
                                            isTop
                                                ? "border-stark-cyan/70 shadow-[0_0_25px_rgba(0,245,255,0.25)] group-hover:border-stark-cyan"
                                                : "border-white/15 opacity-75"
                                        )}
                                    >
                                        {/* Top Card Badge */}
                                        <div className="flex items-center justify-between z-10">
                                            <span className="px-2.5 py-0.5 rounded text-[10px] font-share bg-white/10 text-white font-bold tracking-widest uppercase">
                                                {"0" + photo.id + " // " + photo.tag}
                                            </span>
                                            {isTop && (
                                                <span className="text-[10px] font-share text-stark-cyan animate-pulse">
                                                    [CLICK TO CYCLE]
                                                </span>
                                            )}
                                        </div>

                                        {/* Photo Display Frame */}
                                        <div className={cn(
                                            "relative w-full flex-1 my-3 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center bg-gradient-to-br",
                                            photo.color
                                        )}>
                                            {/* Subtle Grid Overlay inside photo area */}
                                            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 z-10 pointer-events-none" />
                                            
                                            {photo.imageSrc ? (
                                                <img 
                                                    src={photo.imageSrc} 
                                                    alt={photo.title}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="text-center p-6 z-10">
                                                    <Camera className="w-10 h-10 text-white/40 mx-auto mb-2" />
                                                    <span className="text-xs font-mono text-white/50 block tracking-widest uppercase">
                                                        {"PHOTO FRAME // " + photo.tag}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Caption Area */}
                                        <div className="pt-2 border-t border-white/10 z-10">
                                            <h4 className="font-bold text-lg text-white font-chakra tracking-wide">
                                                {photo.title}
                                            </h4>
                                            <p className="text-xs text-white/70 font-chakra mt-0.5">
                                                {photo.caption}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN (7 Cols): About Me / Hobbies + Favorite Songs Dock */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-10">
                        
                        {/* TOP SECTION: Daily Life & Routine */}
                        <div className="p-8 rounded-2xl bg-[#0a0a0a] border-2 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-stark-cyan/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <span className="text-xs font-share text-stark-cyan uppercase tracking-widest block mb-3">
                                {"// DAILY CADENCE & RITUALS"}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black font-syncopate uppercase tracking-wide text-white mb-4">
                                A Day in the Life
                            </h3>
                            <div className="text-white/90 leading-relaxed font-chakra text-base mb-6 tracking-wide space-y-4">
                                <p>
                                    Hey! I&apos;m just a regular guy trying to enjoy life one day at a time. College, gym, friends, and either working late or sleeping - that&apos;s pretty much my everyday.
                                </p>
                                <p>
                                    I&apos;m a huge football fan, and when I&apos;m not on the field you&apos;ll find me raging on Valorant or rewatching Marvel for the hundredth time. Moon Knight, Loki, Iron Man - those are my guys. Music is always running in the background whatever I&apos;m doing.
                                </p>
                                <p>
                                    I got into UI/UX because I just love things that look clean and visually well put together. Saw some stuff online, thought it looked cool, started learning - simple as that.
                                </p>
                                <p>
                                    I&apos;m an ambivert, pretty easy to talk to, and I like keeping things real. That&apos;s me.
                                </p>
                            </div>

                            {/* Hobbies Pills */}
                            <div>
                                <span className="text-[11px] font-share text-white/40 uppercase tracking-widest block mb-3">
                                    CORE PASSIONS & HOBBIES
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "🎨 UI/UX Exploration",
                                        "😎 Chill",
                                        "🎮 Late-Night RPGs",
                                        "⚽ Football Fanatic"
                                    ].map((hobby, i) => (
                                        <span 
                                            key={i}
                                            className="px-3.5 py-1.5 rounded-full text-xs font-chakra bg-[#141414] border border-white/20 text-white hover:border-stark-cyan hover:bg-stark-cyan/15 hover:shadow-[0_0_10px_rgba(0,245,255,0.3)] transition-all"
                                        >
                                            {hobby}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM SECTION: Favorite Songs / Soundtrack Dock */}
                        <div className="p-8 rounded-2xl bg-[#0a0a0a] border-2 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)] relative overflow-hidden">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-stark-cyan/10 border border-stark-cyan/30 flex items-center justify-center">
                                        <Music className="w-4 h-4 text-stark-cyan" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-white font-syncopate uppercase tracking-wider">
                                            {"SOUNDTRACK // FAVORITE TRACKS"}
                                        </h4>
                                        <span className="text-[10px] font-share text-white/50 block mt-0.5">
                                            THE FREQUENCIES BEHIND THE CODE
                                        </span>
                                    </div>
                                </div>

                                {/* Equalizer Visualizer */}
                                <div className="flex items-end gap-1 h-5">
                                    {[40, 90, 60, 100, 50, 80].map((h, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "w-1 rounded-full transition-all duration-300",
                                                isPlaying ? "bg-stark-cyan animate-pulse" : "bg-white/20"
                                            )}
                                            style={{
                                                height: isPlaying ? `${h}%` : "30%",
                                                animationDelay: `${i * 120}ms`
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Songs Playlist List */}
                            <div className="flex flex-col gap-2.5">
                                {FAVORITE_SONGS.map((song) => {
                                    const isSelected = song.id === currentSongId;
                                    return (
                                        <div
                                            key={song.id}
                                            onClick={() => setCurrentSongId(song.id)}
                                            className={cn(
                                                "flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer group",
                                                isSelected
                                                    ? "bg-stark-cyan/10 border-stark-cyan/50 shadow-[0_0_15px_rgba(0,245,255,0.15)]"
                                                    : "bg-[#141414] border-white/10 hover:border-white/25 hover:bg-[#1a1a1a]"
                                            )}
                                        >
                                            <div className="flex items-center gap-3.5">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (isSelected) {
                                                            setIsPlaying(!isPlaying);
                                                        } else {
                                                            setCurrentSongId(song.id);
                                                            setIsPlaying(true);
                                                        }
                                                    }}
                                                    suppressHydrationWarning
                                                    className={cn(
                                                        "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                                                        isSelected
                                                            ? "bg-stark-cyan text-spider-black shadow-[0_0_10px_#00F5FF]"
                                                            : "bg-white/10 text-white group-hover:bg-white/20"
                                                    )}
                                                >
                                                    {isSelected && isPlaying ? (
                                                        <Pause className="w-4 h-4 fill-current" />
                                                    ) : (
                                                        <Play className="w-4 h-4 fill-current ml-0.5" />
                                                    )}
                                                </button>

                                                <div>
                                                    <span className={cn(
                                                        "font-bold text-sm block font-chakra transition-colors",
                                                        isSelected ? "text-stark-cyan" : "text-white"
                                                    )}>
                                                        {song.title}
                                                    </span>
                                                    <span className="text-xs text-white/50 block font-share">
                                                        {song.artist} • {song.genre}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-share text-white/40">
                                                    {song.duration}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
