import NepaliDate from "nepali-datetime";

export function formatNepaliDate(date: Date, format = "YYYY/MM/DD") {
  return new NepaliDate(date).format(format);
}
