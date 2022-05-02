import luxon from 'luxon';

const DateTime = luxon.DateTime;
const Interval = luxon.Interval;


const values = [100, 200, 300, 400];
const [firstVal, secondVal] = values;
console.log(firstVal, secondVal);

// const { DateTime, Interval } = luxon;

export const getFormattedDate = (date) => {
  const { DATE_SHORT } = DateTime;
  // if we didn't get a date, just use the current time
  if (!date) {
    return luxon.DateTime.local().toLocaleString(DateTime.DATE_SHORT);
  }

  // if we got a date object
  if (date instanceof Date) {
    return DateTime.fromJSDate(date).toFormat(DATE_SHORT);
  }

  // if we got a date string, see if we can parse it
  if (typeof date === 'string') {
    const parsedDate = DateTime.fromISO(date);
    if (parsedDate.isValid) {
      return parsedDate.toFormat(DATE_SHORT);
    }
  }

  // we got something we weren't expecting (bad format or not a date object)
  throw new Error('Date must be a date object or an ISO 8601 formatted date string.');
}

export const getInterval = (from, to) => {
  if (from instanceof DateTime !== true || to instanceof DateTime) {
    throw new Error('From and to must be datetime objects');
  }
  const interval = Interval.fromDateTimes(from, to);

  return interval.toLocaleString();
}

export default {
  getFormattedDate,
  getInterval,
}
