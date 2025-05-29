import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUniqueData(tickets, key) {
  const uniqueValues = new Set();
  tickets.forEach((ticket) => uniqueValues.add(ticket[key]));

  return Array.from(uniqueValues).sort((a, b) => {
    if (typeof a === "string" && typeof b === "string")
      return a.localeCompare(b, undefined, { numeric: true });

    return a - b;
  });
}

export function formatDateTime(datetime) {
  return new Date(datetime).toLocaleString("en-GB", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export function formatPaymentMethod(session) {
  const paymentMethod = session.payment_intent?.payment_method;

  if (paymentMethod?.card)
    return `${paymentMethod.card.brand.charAt(0).toUpperCase() + paymentMethod.card.brand.slice(1)} ${paymentMethod.card.funding} (•••• ${paymentMethod.card.last4})`;

  return "N/A";
}

export function retrieveImageUrl(bucketName, imageName) {
  return `https://zaonfxpskbeyoutahieb.supabase.co/storage/v1/object/public/${bucketName}//${imageName}`;
}
