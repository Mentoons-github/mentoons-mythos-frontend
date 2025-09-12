import {
  isToday,
  isYesterday,
  format,
  differenceInCalendarDays,
} from "date-fns";

export const getDateLabel = (dateString: string) => {
  const date = new Date(dateString);

  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  const daysAgo = differenceInCalendarDays(new Date(), date);

  if (daysAgo <= 6) {
    return format(date, "EEEE");
  }

  return format(date, "dd-MM-yyyy");
};

export const getTime = (dateString: string) => {
  return format(new Date(dateString), "hh:mm a");
};

//assignement date format
export const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  return `${day}${suffix} ${month} ${year}`;
};

//assignement time format
export const formatTime = (timeStr: string) => {
  if (!timeStr) return "";
  const [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export function formatToRealDate(dateString?: string | Date): string {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  return date
    .toLocaleDateString("en-US", {
      month: "short", 
     day: "numeric", 
     year: "numeric",
    })
    // .replace(",", ""); 
}

