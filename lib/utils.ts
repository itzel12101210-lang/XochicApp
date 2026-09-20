// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in MXN */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(amount);
}

/** Calculate Xochic commission */
export function calcCommission(price: number, isPremium = false): {
  commission: number;
  pct: number;
  sellerReceives: number;
} {
  const pct = isPremium ? 0.10 : 0.08;
  const commission = Math.round(price * pct);
  return { commission, pct, sellerReceives: price - commission };
}

/** Truncate text */
export function truncate(text: string, maxLen: number): string {
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
}
