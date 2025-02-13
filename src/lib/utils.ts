import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function DateFormatter(date: string) {
  const formattedDate = new Date(date).toISOString().split("T")[0];
  return formattedDate;
}

export function correctedParsedHTML(htmlString: string){
  return (
    htmlString
    .replace(/ul>/g, "<ul>")
    .replace(/li>/g, "<li>")
    .replace(/<b>/g, "<strong>")
    .replace(/<\/b>/g, "</strong>")
    .replace(/<i>/g, "<em>")
    .replace(/<\/i>/g, "</em>")
    .replace(/<h1>/g, "<h1>")
    .replace(/<\/h1>/g, "</h1>")
    .replace(/<h2>/g, "<h2>")
    .replace(/<\/h2>/g, "</h2>")
    .replace(/p>/g, "<p>")
    .replace(/<\/p>/g, "</p>")
    .replace(/<\/?ul>/g, "<ul>")
    .replace(/<\/?ol>/g, "<ul>")
    .replace(/<\/?br>/g, "<br>")
  )
}