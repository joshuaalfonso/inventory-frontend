export type DateInput = Date | string | number;

function toDate(input: DateInput): Date {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  return date;
}

// Example: Mar 19, 2026
export function displayDate(input: DateInput, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(toDate(input));
}

// Example: March 19, 2026
export function displayDateLong(input: DateInput, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(toDate(input));
}

// Example: Mar 19, 2026, 02:30 PM
export function displayDateTime(input: DateInput, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(toDate(input));
}

// Example: 02:30 PM
export function displayTime(input: DateInput, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(toDate(input));
}

// Example: Thursday
export function displayWeekday(input: DateInput, locale = "en-US"): string {
  return new Intl.DateTimeFormat(locale, {
    weekday: "long",
  }).format(toDate(input));
}