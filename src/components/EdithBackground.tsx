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

        let animationFrameId: number;
        let time = 0;

        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
            }
        };
        window.addEventListener("resize", resize);
        resize();

        // Palette
        const STARK_BLUE = "#00A8FF";
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
        let targets: Target[] = [];

        const drawGrid = () => {
            // Perspective Grid
            ctx.strokeStyle = HUD_GRID;
            ctx.lineWidth = 1;

            // Horizon line
            const horizonY = canvas.height * 0.6;

            // Vertical lines fanning out
            const centerX = canvas.width / 2;
            for (let i = -10; i <= 10; i++) {
                ctx.beginPath();
                ctx.moveTo(centerX + i * 50, horizonY);
                ctx.lineTo(centerX + i * 200, canvas.height);
                ctx.stroke();
            }

            // Horizontal lines
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

            // Corners
            const s = t.size;
            // Top Left
            ctx.beginPath(); ctx.moveTo(t.x - s, t.y - s / 2); ctx.lineTo(t.x - s, t.y - s); ctx.lineTo(t.x - s / 2, t.y - s); ctx.stroke();
            // Top Right
            ctx.beginPath(); ctx.moveTo(t.x + s / 2, t.y - s); ctx.lineTo(t.x + s, t.y - s); ctx.lineTo(t.x + s, t.y - s / 2); ctx.stroke();
            // Bottom Right
            ctx.beginPath(); ctx.moveTo(t.x + s, t.y + s / 2); ctx.lineTo(t.x + s, t.y + s); ctx.lineTo(t.x + s / 2, t.y + s); ctx.stroke();
            // Bottom Left
            ctx.beginPath(); ctx.moveTo(t.x - s / 2, t.y + s); ctx.lineTo(t.x - s, t.y + s); ctx.lineTo(t.x - s, t.y + s / 2); ctx.stroke();

            // Center cross
            if (t.locked) {
                ctx.fillStyle = ALERT_ORANGE;
                ctx.fillRect(t.x - 2, t.y - 2, 4, 4);

                // Text
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
        }

        const animate = () => {
            time++;
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear

            // 1. Grid
            drawGrid();

            // 2. Data Streams (Left and Right edges)
            drawDataStream(50);
            drawDataStream(canvas.width - 50);

            // 3. Targets
            if (Math.random() < 0.02) {
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

            // 4. Scan Line
            drawScanLine();

            // 5. Circle HUD Element
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

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={className} />;
}
