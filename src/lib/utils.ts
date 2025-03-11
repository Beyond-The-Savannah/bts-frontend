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
    .replace(/<b>/g, "<strong>")
    .replace(/<\/b>/g, "</strong>")
    .replace(/<i>/g, "<em>")
    .replace(/<\/i>/g, "</em>")
    .replace(/<\/?ul>/g, "<ul>")
    .replace(/<\/?ol>/g, "<ol>")
    .replace(/<br>/g, "<br>")
    .replace(/<\/br>/g, "")
  )
}