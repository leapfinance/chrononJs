import formatTimeAndDate from "./lib/format";

export default class TimeLib extends Date {
  date: Date;
  constructor(date?: string | Date) {
    super();
    this.date = date ? new Date(date) : new Date();
  }
  format(formatData: string) {
    /*
     * Return format string.
     * @param formatData take a string and replace the value.
     */
    return formatTimeAndDate(this.date, formatData);
  }
}
