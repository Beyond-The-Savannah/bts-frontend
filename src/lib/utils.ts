import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function DateFormatter(date: string) {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
}