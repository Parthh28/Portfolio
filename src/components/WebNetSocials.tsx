"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import React, { useRef, useSyncExternalStore } from "react";
import { Github, Linkedin, Mail, X, Instagram } from "lucide-react";

const SOCIALS = [
    { id: 1, icon: Github, label: "GitHub", link: "https://github.com/Parthh28", color: "#6e5494" },
    { id: 2, icon: Linkedin, label: "LinkedIn", link: "https://www.linkedin.com/in/parth-mehta-31184337b/", color: "#0077b5" },
    { id: 3, icon: X, label: "X", link: "https://twitter.com", color: "#1da1f2" },
    { id: 4, icon: Instagram, label: "Instagram", link: "https://www.instagram.com/parthhh__.28/", color: "#E1306C" },
    { id: 5, icon: Mail, label: "Email", link: "mailto:parth.mehta2801@gmail.com", color: "#ea4335" },
];


// Same SOCIALS...

export default function WebNetSocials() {
    const containerRef = useRef(null);

    // Physics-based sway for the "web" strands
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const springVelocity = useSpring(scrollVelocity, { stiffness: 50, damping: 10 });
    const springSkew = useTransform(springVelocity, [-1000, 1000], [-15, 15]);

    // Ensure hydration stability for scroll-driven animations
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    return (
        <section ref={containerRef} className="relative w-full h-[60vh] flex flex-col items-center justify-start pt-20 overflow-hidden bg-spider-black">

            {/* Header */}
            <h2 className="text-4xl md:text-5xl font-black text-spider-white uppercase tracking-widest mb-2 z-10 relative">
                Caught the Vibe?
            </h2>
            <p className="text-spider-blue font-mono mb-20 z-10 relative">
                {"// CONNECT WITH THE NETWORK"}
            </p>

            {/* The Web Net Container */}
            <div className="relative w-full max-w-4xl h-full flex justify-center gap-8 md:gap-20">
                {SOCIALS.map((social, index) => (
                    <WebNode
                        key={social.id}
                        social={social}
                        index={index}
                        sway={mounted ? springSkew : 0}
                    />
                ))}
            </div>

            {/* Realistic Background Web Decor */}
            <div 
                suppressHydrationWarning
                className="absolute inset-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden z-0" 
                style={{ 
                    opacity: 0.15, 
                    maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)", 
                    WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 70%)" 
                }}
            >
                <svg suppressHydrationWarning viewBox="0 0 1000 1000" className="w-[150%] h-[150%] md:w-[100%] md:h-[100%] stroke-spider-white origin-center" style={{ filter: "drop-shadow(0 0 3px rgba(255,255,255,0.7))" }}>
                    {/* Messy Center Hub */}
                    {Array.from({ length: 20 }).map((_, i) => {
                        // Use deterministic mathematical functions instead of Math.random() for SSR hydration
                        const a1 = Math.abs(Math.sin(i * 13.5)) * Math.PI * 2;
                        const r1 = Math.abs(Math.cos(i * 7.2)) * 50;
                        const x1 = (500 + Math.cos(a1) * r1).toFixed(2);
                        const y1 = (500 + Math.sin(a1) * r1).toFixed(2);
                        const a2 = Math.abs(Math.sin(i * 22.8)) * Math.PI * 2;
                        const r2 = Math.abs(Math.cos(i * 11.4)) * 50;
                        const x2 = (500 + Math.cos(a2) * r2).toFixed(2);
                        const y2 = (500 + Math.sin(a2) * r2).toFixed(2);
                        return <line key={`center-${i}`} suppressHydrationWarning x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={(0.5 + Math.abs(Math.sin(i * 5.1))).toFixed(2)} strokeOpacity={(0.4 + Math.abs(Math.cos(i * 9.3)) * 0.4).toFixed(2)} />;
                    })}

                    {/* Radial threads (Structural) */}
                    {Array.from({ length: 24 }).map((_, i) => {
                        const baseAngle = (Math.PI * 2 / 24) * i;
                        // Irregular angles
                        const angleVariance = Math.sin(i * 4.1) * 0.12;
                        const angle = baseAngle + angleVariance;
                        const length = 800 + Math.sin(i * 7.3) * 200;
                        const x2 = (500 + Math.cos(angle) * length).toFixed(2);
                        const y2 = (500 + Math.sin(angle) * length).toFixed(2);
                        
                        // Varying thickness and opacity for depth
                        const opacity = (0.15 + (Math.sin(i * 13) * 0.5 + 0.5) * 0.4).toFixed(2);
                        const width = (0.5 + (Math.sin(i * 22) * 0.5 + 0.5) * 2).toFixed(2);
                        
                        return <line key={`radial-${i}`} suppressHydrationWarning x1="500" y1="500" x2={x2} y2={y2} strokeWidth={width} strokeOpacity={opacity} />;
                    })}
                    
                    {/* Spiral threads (Catching) */}
                    {Array.from({ length: 40 }).map((_, i) => {
                        // Exponentially increasing gap distance from center
                        const rBase = Math.pow(i, 1.35) * 8 + 30; 
                        let d = "";
                        
                        // Random chance to skip an entire ring (broken web)
                        if (Math.sin(i * 8.3) > 0.85) return null;

                        for (let j = 0; j <= 24; j++) {
                            const currentJ = j % 24;
                            const nextJ = (j + 1) % 24;
                            
                            // Match the irregular radial angles
                            const a1 = (Math.PI * 2 / 24) * currentJ + Math.sin(currentJ * 4.1) * 0.12;
                            const a2 = (Math.PI * 2 / 24) * nextJ + Math.sin(nextJ * 4.1) * 0.12;
                            
                            // Organic radius variation (wobbly rings)
                            const r1 = rBase + Math.sin(i * 13.1 + currentJ * 7.5) * 12;
                            const r2 = rBase + Math.sin(i * 13.1 + nextJ * 7.5) * 12;

                            const x1 = (500 + Math.cos(a1) * r1).toFixed(2);
                            const y1 = (500 + Math.sin(a1) * r1).toFixed(2);
                            const x2 = (500 + Math.cos(a2) * r2).toFixed(2);
                            const y2 = (500 + Math.sin(a2) * r2).toFixed(2);
                            
                            // Midpoint for sagging bezier curve
                            const midAngle = (a1 + a2) / 2;
                            // Sag calculation: some are tight, some are very loose
                            const tightness = (Math.sin(i * 2.1 + currentJ * 3.4) * 0.5 + 0.5); 
                            const sagFactor = 0.98 - tightness * 0.2; // 0.78 to 0.98 (pulls inwards)
                            
                            const cx = (500 + Math.cos(midAngle) * ((r1 + r2) / 2 * sagFactor)).toFixed(2);
                            const cy = (500 + Math.sin(midAngle) * ((r1 + r2) / 2 * sagFactor)).toFixed(2);
                            
                            // Randomly break individual segments
                            const skipSegment = Math.sin(i * 17.1 + currentJ * 9.3) > 0.85;

                            if (!skipSegment) {
                                if (d === "" || d.endsWith(" ")) {
                                    d += `M ${x1} ${y1} `;
                                }
                                d += `Q ${cx} ${cy} ${x2} ${y2} `;
                            } else if (d !== "" && !d.endsWith(" ")) {
                                d += " "; // mark break
                            }
                        }
                        
                        const opacity = (0.1 + (i / 40) * 0.35 + (Math.sin(i * 44) * 0.5 + 0.5) * 0.15).toFixed(2);
                        const strokeWidth = (0.4 + (Math.sin(i * 33) * 0.5 + 0.5) * 0.8).toFixed(2);
                        
                        return <path key={`spiral-${i}`} suppressHydrationWarning d={d} fill="none" strokeWidth={strokeWidth} strokeOpacity={opacity} />;
                    })}
                </svg>
            </div>

            {/* SVG Gradient Definitions (Injected) */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    <linearGradient id="insta-gradient-webnet" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop stopColor="#f09433" offset="0%" />
                        <stop stopColor="#e6683c" offset="25%" />
                        <stop stopColor="#dc2743" offset="50%" />
                        <stop stopColor="#cc2366" offset="75%" />
                        <stop stopColor="#bc1888" offset="100%" />
                    </linearGradient>
                </defs>
            </svg>
            <style jsx global>{`
                .insta-gradient-webnet:hover svg {
                    stroke: url(#insta-gradient-webnet) !important;
                    transition: stroke 0.3s ease;
                }
            `}</style>
        </section>
    );
}

function WebNode({ social, index, sway }: { social: typeof SOCIALS[0], index: number, sway: any }) {
    // Randomize thread length
    const threadLength = 60 + (index % 2) * 50;
    const isInsta = social.label === "Instagram";

    return (
        <motion.div
            suppressHydrationWarning
            className="relative flex flex-col items-center origin-top cursor-pointer group"
            style={{ rotate: sway }}
            whileHover={{ rotate: 0, scale: 1.1 }}
        >
            {/* Realistic Web Thread */}
            <svg 
                className="pointer-events-none relative z-10" 
                style={{ width: '12px', height: threadLength, filter: "drop-shadow(0 0 2px rgba(255,255,255,0.4))", marginBottom: '-1px' }} 
                viewBox={`0 0 12 ${threadLength}`} 
                preserveAspectRatio="none"
            >
                {/* Subtle outer glow strand for more visual weight */}
                <path d={`M 6 0 Q 6 ${threadLength * 0.5} 6 ${threadLength}`} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                {/* Main strand */}
                <path d={`M 6 0 Q 8 ${threadLength * 0.5} 6 ${threadLength}`} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                {/* Secondary intertwined strand */}
                <path d={`M 6 0 Q 4 ${threadLength * 0.5} 6 ${threadLength}`} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                {/* Tiny dew drops */}
                <circle cx="7" cy={threadLength * 0.3} r="1.5" fill="rgba(255,255,255,0.9)" />
                <circle cx="5" cy={threadLength * 0.7} r="2" fill="rgba(255,255,255,0.7)" />
                <circle cx="6.5" cy={threadLength * 0.85} r="1" fill="rgba(255,255,255,1)" />
            </svg>

            {/* Icon Node */}
            <motion.a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative w-16 h-16 rounded-full bg-spider-black border-2 border-spider-white/20 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] z-20 overflow-hidden transition-colors ${isInsta ? "insta-gradient-webnet" : ""
                    }`}
                whileHover={{ y: 10, borderColor: social.color }}
                whileTap={{ scale: 0.9 }}
                // CSS Variable for hover color
                style={{ "--hover-color": social.color } as React.CSSProperties}
            >
                {/* Inner Glow */}
                <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundColor: social.color }}
                />

                <social.icon
                    size={28}
                    className={`text-spider-white transition-colors duration-300 ${!isInsta ? "group-hover:text-[var(--hover-color)]" : ""}`}
                    style={{ filter: `drop-shadow(0 0 5px ${social.color})` }}
                />
            </motion.a>

            {/* Label (Holographic Tooltip) */}
            <div className="absolute top-[calc(100%+10px)] opacity-0 group-hover:opacity-100 transition-opacity bg-spider-blue/10 border border-spider-blue text-spider-blue text-xs font-mono px-2 py-1 backdrop-blur-sm pointer-events-none whitespace-nowrap z-30">
                {social.label}
            </div>
        </motion.div>
    );
}
