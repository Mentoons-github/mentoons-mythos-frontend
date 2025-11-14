export const getWorkingHours = (checkIn: string | Date) => {
  const start = new Date(checkIn).getTime();
  const now = new Date().getTime();
  const diff = now - start;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours} H ${minutes} M`;
};

export const convertToInputTime = (date?: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`; // ✅ valid for input time
};

export const convertToISODate = (time: string, date: string | Date) => {
  const [h, m] = time.split(":");
  const d = new Date(date);
  d.setHours(Number(h), Number(m), 0, 0);
  return d.toISOString();
};

// ✅ Format stored numeric hours like `8.75 → "8 H 45 M"`
export const formatHours = (hours: number | null | undefined) => {
  if (!hours || hours <= 0) return "0 H 0 M";
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h} H ${m} M`;
};

// ✅ For live attendance calculation before checkout
export const liveWorkingHours = (checkIn: string | Date) => {
  const start = new Date(checkIn).getTime();
  const now = Date.now();
  const diffMin = (now - start) / (1000 * 60);

  const h = Math.floor(diffMin / 60);
  const m = Math.floor(diffMin % 60);

  return `${h} H ${m} M`;
};
