export const getYear = (date?: string | null) => (date ? date.slice(0, 4) : "");

export const formatDate = (date: string | null | undefined, locale: string) => {
  if (!date) return "";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(date),
  );
};

export const formatMoney = (value: number | null | undefined, locale: string) => {
  if (!value) return "";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

export const formatNumber = (value: number | null | undefined, locale: string) =>
  value ? new Intl.NumberFormat(locale).format(value) : "";

export const splitRuntime = (minutes?: number | null) =>
  minutes ? { h: Math.floor(minutes / 60), m: minutes % 60 } : null;

export const getAge = (birthday: string, deathday?: string | null) => {
  const end = deathday ? new Date(deathday) : new Date();
  const start = new Date(birthday);
  let age = end.getFullYear() - start.getFullYear();
  const m = end.getMonth() - start.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < start.getDate())) age--;
  return age;
};
