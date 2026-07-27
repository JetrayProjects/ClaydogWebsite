import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getMobileSrc(src: string): string {
    if (!src || typeof src !== 'string' || src.endsWith('-mobile.webp')) return src;
    if (src.endsWith('.webp')) {
        return src.replace(/\.webp$/i, '-mobile.webp');
    }
    return src;
}
