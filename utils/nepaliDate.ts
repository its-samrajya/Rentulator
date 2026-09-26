import NepaliDate from "nepali-datetime";

export function formatNepaliDate(date: Date, format = "YYYY/MM/DD") {
  return new NepaliDate(date).format(format);
}

export const NEPALI_MONTH_NAMES: readonly string[] = Array.from(
  { length: 12 },
  (_, index) => new NepaliDate(2083, index, 1).format("MMMM"),
);

export const getCurrentNepaliYearMonth = (): {
  year: number;
  month: number;
} => {
  const today = new NepaliDate(new Date());
  return { year: today.getYear(), month: today.getMonth() + 1 };
};

export const getPreviousNepaliYearMonth = (): {
  year: number;
  month: number;
} => {
  const today = new NepaliDate(new Date());
  const year = today.getYear();
  const month = today.getMonth() + 1;
  if (month === 1) {
    return { year: year - 1, month: 12 };
  }
  return { year, month: month - 1 };
};

export const getNepaliMonthDateRange = (
  year: number,
  month: number,
): { start: Date; end: Date } => {
  const start = new NepaliDate(year, month - 1, 1).getDateObject();
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const end = new NepaliDate(nextYear, nextMonth - 1, 1).getDateObject();
  return { start, end };
};
