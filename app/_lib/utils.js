import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUniqueData(tickets, key) {
  const uniqueValues = new Set();
  tickets.forEach((ticket) => uniqueValues.add(ticket[key]));

  return Array.from(uniqueValues).sort((a, b) => a - b);
}

export function formatDateTime(datetime) {
  return new Date(datetime).toLocaleString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
