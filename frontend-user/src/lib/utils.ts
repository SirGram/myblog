import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  // Get day, month, and year from the date
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Add ordinal suffix to the day
  let dayWithSuffix;
  if (day === 1 || day === 21 || day === 31) {
    dayWithSuffix = `${day}st`;
  } else if (day === 2 || day === 22) {
    dayWithSuffix = `${day}nd`;
  } else if (day === 3 || day === 23) {
    dayWithSuffix = `${day}rd`;
  } else {
    dayWithSuffix = `${day}th`;
  }

  // Construct the formatted date string
  const formattedDate = `${dayWithSuffix} ${month} ${year}`;

  return formattedDate;
}

export function formatDateMonthAndYear(date: Date) {
  // Get  month, and year from the date
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = ` ${month} ${year}`;

  return formattedDate;
}
