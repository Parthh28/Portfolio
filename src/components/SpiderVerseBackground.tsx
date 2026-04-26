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

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
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

        // Particles System (Matching WebBackground.tsx)
        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }

        const particles: Particle[] = [];
        const PARTICLE_COUNT = 50;
        const CONNECTION_DISTANCE = 150;
        const MOUSE_DISTANCE = 200;

        // Initialize particles
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }

        const getCardPositions = () => {
            const cards = document.querySelectorAll('.project-card-node');
            const positions: { x: number, y: number }[] = [];

            if (!canvas.parentElement) return [];
            const parentRect = canvas.parentElement.getBoundingClientRect();

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                positions.push({
                    x: rect.left + rect.width / 2 - parentRect.left,
                    y: rect.top + 50 - parentRect.top
                });
            });
            return positions;
        };

        const drawWebLine = (x1: number, y1: number, x2: number, y2: number) => {
            ctx.beginPath();
            ctx.moveTo(x1, y1);

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const droop = dist * 0.1;

            // Gentle sway
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
            time++;

            // 1. Clear (Transparent/Dark)
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 2. Project Card Connections (The "structure")
            const positions = getCardPositions();

            if (positions.length > 0) {
                // Connect top
                drawWebLine(canvas.width / 2, -100, positions[0].x, positions[0].y);

                // Connect cards
                for (let i = 0; i < positions.length - 1; i++) {
                    drawWebLine(positions[i].x, positions[i].y, positions[i + 1].x, positions[i + 1].y);
                }
                // Cross connections
                for (let i = 0; i < positions.length - 2; i++) {
                    drawWebLine(positions[i].x, positions[i].y, positions[i + 2].x, positions[i + 2].y);
                }
            }

            // 3. Ambient Particles (The "atmosphere" from WebBackground)
            particles.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.fill();

                // Connect particles to each other
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / CONNECTION_DISTANCE)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connect to Mouse
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_DISTANCE) {
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

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 w-full h-full pointer-events-none"
        />
    );
}
