"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useSpiderSense } from "@/hooks/useSpiderSense";
import GlitchText from "@/components/GlitchText";

interface PendulumCardProps {
    title: string;
    description: string;
    tech: string;
    index: number;
    link?: string;
    image?: string;
}

export default function PendulumCard({ title, description, tech, index, link, image }: PendulumCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);

    // Spider-Sense Hook: Proximity reactivity
    const { style: senseStyle } = useSpiderSense(cardRef, 150);

    // Mouse position for 3D tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXRel = e.clientX - rect.left;
        const mouseYRel = e.clientY - rect.top;

        const xPct = mouseXRel / width - 0.5;
        const yPct = mouseYRel / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const handleCardClick = () => {
        if (!isGlitching) {
            setIsGlitching(true);
        }
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.div
            ref={cardRef}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
                ...senseStyle // Apply Spider-Sense vibration/shift
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
            className="relative w-full aspect-[4/5] cursor-pointer group"
            data-hover-target="true"
        >
            <div className="relative w-full h-full bg-spider-black border border-spider-white/10 overflow-hidden shadow-2xl glass-panel transition-all duration-300 group-hover:border-spider-red/50 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                {/* Image Placeholder area */}
                <div className="h-48 bg-spider-gunmetal/50 relative overflow-hidden glitch-img-container">

                    {image ? (
                        <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${image})` }}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-spider-white/20 font-mono text-xs">
                            [NO_SIGNAL]
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 relative z-10 bg-spider-black/80 backdrop-blur-sm h-full flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold italic text-spider-white uppercase tracking-tighter group-hover:text-spider-red transition-colors glitch-text" data-text={title}>
                            {title}
                        </h3>
                        <span className="text-xs font-mono text-spider-blue/50 border border-spider-blue/20 px-2 py-1 rounded">V.0{index + 1}</span>
                    </div>
                    <div className="w-full h-[1px] bg-gradient-to-r from-spider-red/50 to-transparent my-3" />
                    <p className="text-spider-gray/80 text-xs font-mono mb-4 leading-relaxed">
                        {description}
                        <br />
                        <span className="text-spider-red/60">TECH:</span> {tech}
                    </p>

                    {/* View Project Button (appearing on hover) */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        className="mt-auto"
                    >
                        {link && (
                            <a href={link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="block w-fit bg-spider-red text-white text-xs font-bold px-4 py-2 clip-path-polygon hover:bg-red-600 transition-colors">
                                ACCESS DATA
                            </a>
                        )}
                    </motion.div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-spider-red/0 group-hover:border-spider-red/100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-spider-red/0 group-hover:border-spider-red/100 transition-all duration-300" />
            </div>
        </motion.div>
    );
}
