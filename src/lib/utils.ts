import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function assetPath(path: string) {
    // For GitHub Pages deployment with basePath: '/Portfolio'
    const isProd = process.env.NODE_ENV === 'production';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    // In production, Next.js basePath handles some prefixing, 
    // but for raw strings in <img> or CSS, we need to handle it.
    // If the path already has /Portfolio/ (from previous turn), we remove it first to avoid double prefixing.
    const normalizedPath = cleanPath.replace(/^\/Portfolio/, '');
    
    return isProd ? `/Portfolio${normalizedPath}` : normalizedPath;
}
