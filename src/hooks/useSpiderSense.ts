import { useState, useEffect, RefObject } from "react";
import { useSpring, useMotionValue } from "framer-motion";

/**
 * useSpiderSense Hook
 * 
 * Provides a "spider-sense" effect when the mouse is near an element.
 * Returns motion values for x and y vibration.
 * 
 * @param ref - Reference to the element to detect proximity to
 * @param threshold - Distance in pixels to trigger the effect
 */
export const useSpiderSense = <T extends HTMLElement = HTMLElement>(ref: RefObject<T | null>, threshold = 100) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isNear, setIsNear] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            // Calculate center of the element
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate distance from mouse to center
            // (Note: this is a simple center-to-point distance. 
            // For better edge detection we might use distance to nearest point on rect, 
            // but center is usually sufficient for small cards)
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
            );

            if (distance < threshold + Math.max(rect.width, rect.height) / 2) {
                // Adjust threshold to be from center, so effectively "threshold" usually means "distance from edge" roughly
                // But here let's stick to the prompt's likely intent or simpler logic.
                // If we want 100px from *card*, we need distance to rect.

                // Let's refine distance calculation to be distance to the rectangle
                const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
                const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
                const distanceToEdge = Math.sqrt(dx * dx + dy * dy);

                if (distanceToEdge < threshold) {
                    setIsNear(true);
                    // Intensity ramps up as we get closer (0 at threshold, 1 at 0 distance)
                    const intensity = 1 - Math.min(distanceToEdge / threshold, 1);

                    // Jitter amount
                    const jitter = 3 * intensity;

                    // Apply random jitter
                    if (intensity > 0) {
                        mouseX.set((Math.random() - 0.5) * jitter);
                        mouseY.set((Math.random() - 0.5) * jitter);
                    } else {
                        mouseX.set(0);
                        mouseY.set(0);
                    }
                } else {
                    setIsNear(false);
                    mouseX.set(0);
                    mouseY.set(0);
                }
            } else {
                setIsNear(false);
                mouseX.set(0);
                mouseY.set(0);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [ref, threshold, mouseX, mouseY]);

    // Smooth out the jitter slightly so it doesn't look too chaotic, but enough to vibrate
    const x = useSpring(mouseX, { stiffness: 500, damping: 10 });
    const y = useSpring(mouseY, { stiffness: 500, damping: 10 });

    return {
        style: { x, y },
        isNear
    };
};
