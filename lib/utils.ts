import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validateUrl = (url: string): boolean => {
  const re = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
  return re.test(url);
};

export const maskToken = (token: string): string => {
  return token.replace(/./g, "*").slice(0, -4) + token.slice(-4);
};

export const extractImageUrl = (description: string): string | null => {
  const words = description.trim().split(/\s+/);
  for (const word of words) {
    if (word.startsWith('http')) return word;
  }
  return null;
};

export const removeImageUrlFromDescription = (description: string): string => {
  const imageUrl = extractImageUrl(description);
  if (!imageUrl) return description;
  return description.replace(imageUrl, '').trim();
};
