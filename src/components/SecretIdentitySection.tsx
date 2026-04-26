"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Headphones, Play, Pause, ExternalLink } from "lucide-react";

const GithubGrid = () => {
    // Generate static random looking grid so it doesn't flicker on hydration
    const weeks = 36;
    const days = 7;
    return (
        <div className="flex gap-1 w-full overflow-hidden">
            {Array.from({ length: weeks }).map((_, w) => (
                <div key={w} className="flex flex-col gap-[3px] md:gap-1 flex-1 min-w-[6px]">
                    {Array.from({ length: days }).map((_, d) => {
                        // A deterministic "random" based on index
                        const seed = (w * 7 + d) * 12345;
                        const val = Math.abs(Math.sin(seed));
                        const level = val > 0.85 ? 4 : val > 0.65 ? 3 : val > 0.4 ? 2 : val > 0.2 ? 1 : 0;
                        const colors = ['bg-[#161b22]', 'bg-[#0e4429]', 'bg-[#006d32]', 'bg-[#26a641]', 'bg-[#39d353]'];
                        return <div key={d} className={`w-full aspect-square rounded-[2px] md:rounded-sm ${colors[level]}`} />;
                    })}
                </div>
            ))}
        </div>
    )
}

const NewspaperStack = () => (
    <div className="absolute left-[2%] md:left-[10%] top-[35%] md:top-[15%] z-10 group perspective-1000 scale-[0.55] origin-top-left md:scale-[0.85] xl:scale-100 md:origin-center">
        {/* Layer 1 (Bottom) */}
        <div className="absolute inset-0 w-80 h-[420px] bg-[#dcdad5] rotate-[-12deg] translate-x-6 translate-y-6 shadow-2xl skew-x-2" />

        {/* Layer 2 (Middle) */}
        <div className="absolute inset-0 w-80 h-[420px] bg-[#eceae5] rotate-[-8deg] translate-x-2 translate-y-2 shadow-2xl grayscale" />

        {/* Top Paper */}
        <motion.div
            className="relative w-80 h-[420px] bg-[#f4f1ea] p-5 shadow-2xl text-black rotate-[-3deg] overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.02, rotate: -1, y: -5 }}
        >
            <div className="flex justify-between items-end border-b-4 border-black pb-2 mb-3">
                <h1 className="text-5xl font-black font-serif uppercase tracking-tighter">Daily Bugle</h1>
            </div>

            <div className="border-b-2 border-black/80 pb-2 mb-3">
                <div className="flex justify-between text-[10px] font-bold uppercase mb-2">
                    <span>Vol. 1 NO. 142</span>
                    <span>NEW YORK CITY</span>
                    <span>50 CENTS</span>
                </div>
                <h2 className="text-4xl font-black uppercase leading-[0.9] text-center mb-1">Masked Menace or Hero?</h2>
            </div>

            <div className="flex gap-4 text-[10px] text-justify font-serif leading-relaxed h-full">
                <div className="flex-1">
                    <p className="indent-4 mb-2 first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-1">The elusive web-slinger was seen again swinging through Queens late last night. While some citizens cheer, authorities remain deeply suspicious of this vigilante's true motives.</p>
                    <p className="indent-4">"He left a note on the stolen car," says local bodega owner Mr. Delmar. "Who does that? A hero or someone mocking the police?"</p>
                </div>
                <div className="flex-1 pl-4 border-l border-black/20">
                    <div className="w-full h-28 bg-zinc-800 mb-2 overflow-hidden relative grayscale contrast-125 border-4 border-white shadow-sm">
                        {/* Simulate a photo */}
                        <div className="absolute inset-0 bg-spider-red/20 mix-blend-color" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <div className="w-16 h-16 rounded-full bg-white blur-xl" />
                        </div>
                        <div className="absolute bottom-1 right-1 text-white/50 text-[8px] font-bold tracking-wider">PHOTO BY P. PARKER</div>
                    </div>
                    <p className="italic text-[9px] leading-tight">Sightings have increased 300% since the incident at the harbor. Is the city actually safe, or just changing hands?</p>
                </div>
            </div>

            {/* Coffee Ring Stain */}
            <div className="absolute top-20 right-12 w-20 h-20 border-[5px] border-amber-900/15 rounded-full mix-blend-multiply opacity-70 pointer-events-none" />
            <div className="absolute top-22 right-10 w-16 h-16 border-[3px] border-amber-900/10 rounded-full mix-blend-multiply opacity-50 pointer-events-none" />

            {/* Post-it note */}
            <div className="absolute bottom-10 -right-2 w-24 h-24 bg-yellow-200 shadow-md rotate-[-15deg] p-3 flex flex-col justify-center transform origin-bottom-right skew-x-[5deg]">
                <span className="font-serif italic font-bold text-sm text-blue-900 rotate-[-5deg]">Need more pics!</span>
                <span className="font-serif italic font-bold text-xs text-blue-900 rotate-[-5deg] mt-1">- JJJ</span>
            </div>
        </motion.div>
    </div>
)

const HeadphonesPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        audioRef.current = new Audio("/Portfolio/sunflower.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    if (!mounted) return null;

    return (
        <motion.div
            className="absolute right-[5%] md:right-[15%] top-[10%] md:top-[25%] z-20 w-56 md:w-64 bg-[#1a1a1c] rounded-xl p-4 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-zinc-800 rotate-[5deg] cursor-pointer group"
            whileHover={{ scale: 1.05, rotate: 2 }}
            onClick={togglePlay}
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-neon-cyan/10 rounded-full flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan/20 transition-colors">
                    <Headphones size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="text-white font-bold text-sm tracking-wide">Sunflower</h3>
                    <p className="text-zinc-500 text-xs mt-0.5 max-w-[120px] truncate">Post Malone, Swae Lee</p>
                </div>
                <button className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800">
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                </button>
            </div>

            <div className="mt-4 flex rounded-full bg-black h-1.5 overflow-hidden border border-zinc-900">
                <motion.div
                    className="h-full bg-gradient-to-r from-spider-blue to-neon-cyan"
                    animate={isPlaying ? { width: ["0%", "100%"] } : { width: "0%" }}
                    transition={{ duration: 153, ease: "linear", repeat: Infinity }}
                />
            </div>

            {/* Simulated Audio Spectrum */}
            {isPlaying && (
                <div className="absolute -bottom-6 right-8 flex gap-1 h-4 items-end">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 bg-neon-cyan opacity-40 rounded-t"
                            animate={{ height: ["20%", "100%", "40%"] }}
                            transition={{ duration: 0.5 + Math.random(), repeat: Infinity, repeatType: "reverse" }}
                        />
                    ))}
                </div>
            )}

            {/* Wires */}
            <svg className="absolute -bottom-[120px] left-8 w-24 h-[140px] pointer-events-none stroke-zinc-800 opacity-60" fill="none" strokeWidth="2.5" strokeLinecap="round">
                <path d="M 10 0 C 10 50, -20 80, 20 150" />
                <path d="M 8 0 C 30 40, 40 90, 20 150" />
            </svg>
        </motion.div>
    )
}

const LaptopScreen = () => {
    return (
        <div className="absolute bottom-[5%] md:bottom-[10%] left-1/2 -translate-x-1/2 z-30 perspective-[1500px] w-full max-w-[800px] px-4 md:px-0 pointer-events-none">
            <motion.div
                className="w-full max-w-[650px] mx-auto pointer-events-auto"
                initial={{ rotateX: 10, y: 50, opacity: 0 }}
                whileInView={{ rotateX: 5, y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ rotateX: 2, y: -5 }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Laptop Display (Screen part) */}
                <div className="w-full aspect-[16/11] md:aspect-auto md:h-[400px] bg-[#0d1117] rounded-t-2xl border-[8px] md:border-[12px] border-zinc-900 shadow-[0_-20px_60px_rgba(35,134,54,0.05)] relative overflow-hidden flex flex-col p-4 md:p-6 mb-1">

                    {/* Inner bezel highlight */}
                    <div className="absolute inset-0 border border-white/5 rounded-t-xl rounded-b-sm pointer-events-none" />

                    {/* Browser Bar */}
                    <div className="flex items-center gap-2 mb-4 md:mb-6 opacity-60 shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        <div className="ml-4 text-[10px] md:text-xs text-zinc-400 font-mono flex items-center gap-2 bg-zinc-800/80 px-3 py-1 rounded-md shadow-inner border border-zinc-700/50">
                            github.com/developer
                            <ExternalLink size={12} className="opacity-50" />
                        </div>
                    </div>

                    {/* Github Profile Layout */}
                    <div className="flex gap-4 md:gap-6 mb-6 md:mb-8 mt-2">
                        {/* Avatar */}
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#FF003C] border-[3px] border-zinc-700 shadow-lg shrink-0 flex items-center justify-center p-0.5">
                            <div className="w-full h-full rounded-full bg-zinc-900 border border-zinc-800 overflow-hidden relative">
                                <img src="/Portfolio/Me.jpg" alt="Profile" className="w-full h-full object-cover grayscale opacity-80" />
                            </div>
                        </div>
                        {/* Details */}
                        <div className="flex-1 mt-1 md:mt-0">
                            <h3 className="text-white font-bold text-lg md:text-2xl tracking-tight">Parth</h3>
                            <p className="text-zinc-400 text-xs md:text-sm mb-1 md:mb-2">Spider-Man (Actually Developer)</p>
                            <p className="text-zinc-500 text-[10px] md:text-xs font-mono leading-relaxed max-w-[95%] hidden md:block">
                                Web developer specializing in React, TypeScript, and fighting bugs.
                            </p>
                        </div>
                    </div>

                    {/* Contributions section */}
                    <div className="flex-1 flex flex-col justify-end">
                        <p className="text-zinc-400 text-[10px] md:text-xs mb-2 md:mb-3 font-medium">9,420 contributions in the last year</p>
                        <div className="w-full bg-[#0d1117] rounded-lg p-2 md:p-4 border border-zinc-800 overflow-hidden shadow-inner">
                            <GithubGrid />
                        </div>
                    </div>

                    {/* Screen glare reflection */}
                    <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-gradient-to-bl from-white/10 via-transparent to-transparent pointer-events-none -rotate-12 translate-x-[20%] -translate-y-[20%]" />
                    {/* Status LED */}
                    <div className="absolute top-2 right-1/2 translate-x-1/2 w-1 h-1 bg-green-500 rounded-full blur-[1px] opacity-70" />
                </div>

                {/* Laptop Base (Keyboard area) */}
                <div
                    className="w-[105%] h-6 md:h-8 bg-zinc-800 mx-auto rounded-b-xl md:rounded-b-3xl relative -left-[2.5%] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col justify-end pb-1 border-t border-zinc-700/50"
                    style={{
                        transform: 'rotateX(80deg) translateZ(0px)',
                        transformOrigin: 'top',
                    }}
                >
                    <div className="w-1/4 h-1 bg-zinc-700 mx-auto rounded-full mb-1 opacity-50" />
                </div>
            </motion.div>
        </div>
    )
}

export default function SecretIdentitySection() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0c0e] snap-start border-t border-white/5 py-40 my-20">
            {/* Desk Lamp Light (Radial Gradient illuminating the center-bottom desk area) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,_rgba(255,230,150,0.08)_0%,_rgba(12,12,14,1)_70%)] pointer-events-none z-0" />

            {/* Subtle Desk Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none mix-blend-overlay z-0" />

            <div className="w-full max-w-7xl mx-auto px-4 relative h-full min-h-[700px] z-10">

                {/* Section Title */}
                <h2 className="absolute -top-20 left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-black text-spider-white/20 tracking-[0.3em] uppercase text-center w-full">
                    Secret Identity
                </h2>

                {/* Desk Elements */}
                <NewspaperStack />
                <HeadphonesPlayer />
                <LaptopScreen />

            </div>
        </section>
    )
}
