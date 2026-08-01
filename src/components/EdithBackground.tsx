"use client";

import { useEffect, useRef } from "react";

interface EdithBackgroundProps {
    className?: string;
}

export default function EdithBackground({ className = "" }: EdithBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number | null = null;
        let time = 0;
        let isVisible = true;

        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
        };
        window.addEventListener("resize", resize);
        resize();

        // Palette
        const STARK_CYAN = "#00FFFF";
        const HUD_GRID = "rgba(0, 168, 255, 0.1)";
        const ALERT_ORANGE = "#FF5500";

        // Elements
        interface Target {
            x: number;
            y: number;
            size: number;
            locked: boolean;
            life: number;
        }
        const targets: Target[] = [];

        const drawGrid = () => {
            ctx.strokeStyle = HUD_GRID;
            ctx.lineWidth = 1;

            const horizonY = canvas.height * 0.6;
            const centerX = canvas.width / 2;
            for (let i = -10; i <= 10; i++) {
                ctx.beginPath();
                ctx.moveTo(centerX + i * 50, horizonY);
                ctx.lineTo(centerX + i * 200, canvas.height);
                ctx.stroke();
            }

            for (let i = 0; i < 10; i++) {
                const y = horizonY + Math.pow(i, 2) * 5;
                if (y > canvas.height) break;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        };

        const drawReticle = (t: Target) => {
            ctx.strokeStyle = t.locked ? ALERT_ORANGE : STARK_CYAN;
            ctx.lineWidth = 2;

            const s = t.size;
            ctx.beginPath(); ctx.moveTo(t.x - s, t.y - s / 2); ctx.lineTo(t.x - s, t.y - s); ctx.lineTo(t.x - s / 2, t.y - s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(t.x + s / 2, t.y - s); ctx.lineTo(t.x + s, t.y - s); ctx.lineTo(t.x + s, t.y - s / 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(t.x + s, t.y + s / 2); ctx.lineTo(t.x + s, t.y + s); ctx.lineTo(t.x + s / 2, t.y + s); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(t.x - s / 2, t.y + s); ctx.lineTo(t.x - s, t.y + s); ctx.lineTo(t.x - s, t.y + s / 2); ctx.stroke();

            if (t.locked) {
                ctx.fillStyle = ALERT_ORANGE;
                ctx.fillRect(t.x - 2, t.y - 2, 4, 4);

                ctx.fillStyle = STARK_CYAN;
                ctx.font = "10px monospace";
                ctx.fillText(`ID_TARGET: ${Math.floor(t.x)}`, t.x + s + 5, t.y);
            }
        };

        const drawDataStream = (x: number) => {
            ctx.font = "10px monospace";
            ctx.fillStyle = "rgba(0, 255, 255, 0.5)";
            for (let i = 0; i < 20; i++) {
                if (Math.random() > 0.9) {
                    const txt = Math.random().toString(16).substring(2, 6).toUpperCase();
                    ctx.fillText(txt, x, canvas.height - i * 15 - (time % 100));
                }
            }
        };

        const drawScanLine = () => {
            const y = (time * 5) % canvas.height;
            ctx.fillStyle = "rgba(0, 168, 255, 0.1)";
            ctx.fillRect(0, y, canvas.width, 50);
            ctx.fillStyle = STARK_CYAN;
            ctx.fillRect(0, y + 50, canvas.width, 2);
        };

        const animate = () => {
            if (!isVisible || document.hidden) {
                animationFrameId = null;
                return;
            }
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            drawGrid();
            drawDataStream(50);
            drawDataStream(canvas.width - 50);

            if (Math.random() < 0.02 && targets.length < 5) {
                targets.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: 30,
                    locked: false,
                    life: 100
                });
            }

            for (let i = targets.length - 1; i >= 0; i--) {
                const t = targets[i];
                t.life--;
                if (t.life < 50) t.locked = true;
                if (t.life <= 0) {
                    targets.splice(i, 1);
                    continue;
                }
                drawReticle(t);
            }

            drawScanLine();

            ctx.strokeStyle = "rgba(0, 168, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 200, time * 0.01, time * 0.01 + Math.PI);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 220, -time * 0.02, -time * 0.02 + Math.PI * 0.5);
            ctx.stroke();

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
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (observer && canvas) observer.unobserve(canvas);
            stopAnimation();
        };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
}
