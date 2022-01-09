import { monthNameList } from "../utils/dateUtils";

function withSpaceString(str: string | number) {
  return `${str}`;
}

function appendZeroInSingleDigit(number: string | number) {
  return number.toString().length > 1 ? number : "0" + number.toString();
}

export function replaceDate(date: Date, formatString: string) {
  /*
   * Date format
   * dd for cardinal date
   * Do for ordinal date
   */
  let cardinalDate = date.getDate();
  let ordinalDate = () => {
    if (cardinalDate == 1) return cardinalDate + "st";
    if (cardinalDate == 2) return cardinalDate + "nd";
    if (cardinalDate == 3) return cardinalDate + "rd";
    return cardinalDate + "th";
  };
  return formatString
    .toString()
    .replace(/\b(dd|DD)\b/g, String(cardinalDate))
    .replace(/\bDo\b/g, ordinalDate());
}

export function replaceMonth(date: Date, formatString: string) {
  /*
   * MM-> month number 1-12
   * MMM -> month in short Form e.d Jan, Feb
   * MMMM-> month name full form
   */
  let monthNumber = new Date(date).getMonth() + 1;
  let monthName = monthNameList[monthNumber - 1];
  let monthShortName = monthName.slice(0, 3);
  return formatString
    .toString()
    .replace(/\bMMMM\b/g, withSpaceString(monthName))
    .replace(/\bMMM\b/g, withSpaceString(monthShortName))
    .replace(/\bMM\b/g, withSpaceString(monthNumber));
}

export function replaceYear(date: Date, formatString: string) {
  /*
   * YYYY -> year full form
   *  YY -> last two digit of year
   */
  let thisYear = new Date(date).getFullYear().toString();
  let shortYear = thisYear.slice(2);
  return formatString
    .toString()
    .replace(/\bYYYY\b/g, withSpaceString(thisYear))
    .replace(/\bYY\b/g, withSpaceString(shortYear));
}

export function replaceTime(date: Date, formatString: string) {
  /*
   * HH -> 24hrs format
   * hh -> 12 hrs format
   */
  let currentTime = new Date(date);
  let varHour = currentTime.getHours();
  let clockHour = () => {
    if (varHour == 0) return { hour: "12", abbr: "am" };
    if (varHour < 12)
      return { hour: appendZeroInSingleDigit(varHour), abbr: "am" };
    return { hour: appendZeroInSingleDigit(varHour - 12), abbr: "pm" };
  };
  let varMin = appendZeroInSingleDigit(currentTime.getMinutes());

  let varSec = appendZeroInSingleDigit(currentTime.getSeconds());
  return formatString
    .toString()
    .replace(/\bHH\b/g, withSpaceString(varHour))
    .replace(/\bhh\b/g, withSpaceString(clockHour().hour))
    .replace(/\bmm\b/g, withSpaceString(varMin))
    .replace(/\bss\b/g, withSpaceString(varSec))
    .replace(/\ba\b/g, withSpaceString(clockHour().abbr))
    .replace(/\bA\b/g, withSpaceString(clockHour().abbr).toUpperCase());
}

export default function format(date: Date, formatString: string) {
  let dateString = replaceDate(date, formatString);
  dateString = replaceMonth(date, dateString);
  dateString = replaceYear(date, dateString);
  dateString = replaceTime(date, dateString);
  return dateString;
}
