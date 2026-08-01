"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

export default function WebBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 }); // Start mouse off-screen

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number | null = null;
        let particles: Particle[] = [];
        let isVisible = true;

        // Configuration (Optimized for smooth 60+ FPS)
        const PARTICLE_COUNT = 45;
        const CONNECTION_DISTANCE = 150;
        const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
        const MOUSE_DISTANCE = 200;
        const MOUSE_DIST_SQ = MOUSE_DISTANCE * MOUSE_DISTANCE;
        const PARTICLE_SPEED = 0.2;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                    vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);

        resize();

        const animate = () => {
            if (!isVisible || document.hidden) {
                animationFrameId = null;
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.fill();

                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < CONNECTION_DIST_SQ) {
                        const distance = Math.sqrt(distSq);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / CONNECTION_DISTANCE})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                const mouseDx = p.x - mouseRef.current.x;
                const mouseDy = p.y - mouseRef.current.y;
                const mouseDistSq = mouseDx * mouseDx + mouseDy * mouseDy;

                if (mouseDistSq < MOUSE_DIST_SQ) {
                    const mouseDist = Math.sqrt(mouseDistSq);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 245, 255, ${1 - mouseDist / MOUSE_DISTANCE})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.stroke();

                    if (mouseDist > 50) {
                        p.vx -= mouseDx * 0.0003;
                        p.vy -= mouseDy * 0.0003;
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (animationFrameId === null && isVisible && !document.hidden) {
                animate();
            }
        };

        const stopAnimation = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            });
        }, { threshold: 0.01 });

        if (canvas) observer.observe(canvas);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopAnimation();
            } else if (isVisible) {
                startAnimation();
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        startAnimation();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (observer && canvas) observer.unobserve(canvas);
            stopAnimation();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        />
    );
}
