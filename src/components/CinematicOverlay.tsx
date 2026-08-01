"use client";

import { useSyncExternalStore } from "react";

export default function CinematicOverlay() {
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    );

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] w-full h-full overflow-hidden">
            {/* Vignette: Darken edges for focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.6)_100%)]" />

            {/* Scanlines: Subtle horizontal lines */}
            <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))]"
                style={{ backgroundSize: "100% 4px, 3px 100%" }}
            />

            {/* Lightweight GPU-tiled noise instead of live SVG feTurbulence filter over full screen */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: "128px 128px",
                    backgroundRepeat: "repeat"
                }}
            />
        </div>
    );
}
