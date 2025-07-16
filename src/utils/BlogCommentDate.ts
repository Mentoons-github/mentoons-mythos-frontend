import { differenceInMinutes, differenceInHours, differenceInDays } from "date-fns";

export const formatTime = (dateString: string) => {
  const now = new Date();
  const date = new Date(dateString);

  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) return `${minutes}m`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours}h`;

  const days = differenceInDays(now, date);
  return `${days}d`;
};
