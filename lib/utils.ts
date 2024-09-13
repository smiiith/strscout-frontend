import { type ClassValue, clsx } from "clsx"
import { formatInTimeZone } from "date-fns-tz";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date) => {
  const dateObj = new Date(date);
  const timeZone = "America/Los_Angeles";
  const zonedDate = formatInTimeZone(dateObj, timeZone, "MM/dd/yyyy hh:mm aaaa zzz");
  return zonedDate;
}
