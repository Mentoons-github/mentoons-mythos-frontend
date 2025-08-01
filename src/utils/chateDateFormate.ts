import { isToday, isYesterday, format, differenceInCalendarDays } from "date-fns";

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
