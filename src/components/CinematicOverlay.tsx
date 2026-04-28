"use client";

import { useEffect, useState } from "react";

export default function CinematicOverlay() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full overflow-hidden">
            {/* Vignette: Darken edges for focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />

            {/* Scanlines: Subtle horizontal lines */}
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))]"
                style={{ backgroundSize: "100% 4px, 3px 100%" }}
            />

            {/* Subtle animated noise/grain */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
                <filter id="grainy">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grainy)" />
            </svg>
        </div>
    );
}
