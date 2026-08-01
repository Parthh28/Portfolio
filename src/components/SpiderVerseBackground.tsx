"use client";

import { useEffect, useRef } from "react";

export default function SpiderVerseBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number | null = null;
        let time = 0;
        let isVisible = true;

        let cachedPositions: { x: number, y: number }[] = [];
        let lastPosUpdate = 0;

        const updateCardPositions = () => {
            if (!canvas.parentElement) return;
            const cards = document.querySelectorAll('.project-card-node');
            if (cards.length === 0) {
                cachedPositions = [];
                return;
            }
            const parentRect = canvas.parentElement.getBoundingClientRect();
            const positions: { x: number, y: number }[] = [];
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                positions.push({
                    x: rect.left + rect.width / 2 - parentRect.left,
                    y: rect.top + 50 - parentRect.top
                });
            });
            cachedPositions = positions;
        };

        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
                updateCardPositions();
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (canvas.parentElement) {
                const rect = canvas.parentElement.getBoundingClientRect();
                mouseRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top
                };
            }
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        resize();

        // Particles System
        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }

        const particles: Particle[] = [];
        const PARTICLE_COUNT = 30; // Optimized particle density for high FPS
        const CONNECTION_DISTANCE = 150;
        const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
        const MOUSE_DISTANCE = 200;
        const MOUSE_DIST_SQ = MOUSE_DISTANCE * MOUSE_DISTANCE;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 1
            });
        }

        const drawWebLine = (x1: number, y1: number, x2: number, y2: number) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const droop = dist * 0.1;

            ctx.quadraticCurveTo(
                midX,
                midY + droop + Math.sin(time * 0.02 + x1) * 2,
                x2,
                y2
            );

            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
        };

        const animate = () => {
            if (!isVisible || document.hidden) {
                animationFrameId = null;
                return;
            }
            time++;

            // Update DOM queries only periodically (once every ~60 frames) instead of every frame
            if (time - lastPosUpdate > 60 || time === 1) {
                updateCardPositions();
                lastPosUpdate = time;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const positions = cachedPositions;
            if (positions.length > 0) {
                drawWebLine(canvas.width / 2, -100, positions[0].x, positions[0].y);
                for (let i = 0; i < positions.length - 1; i++) {
                    drawWebLine(positions[i].x, positions[i].y, positions[i + 1].x, positions[i + 1].y);
                }
                for (let i = 0; i < positions.length - 2; i++) {
                    drawWebLine(positions[i].x, positions[i].y, positions[i + 2].x, positions[i + 2].y);
                }
            }

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
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / CONNECTION_DISTANCE)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < MOUSE_DIST_SQ) {
                    const dist = Math.sqrt(distSq);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.5 * (1 - dist / MOUSE_DISTANCE)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.stroke();
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
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        />
    );
}
