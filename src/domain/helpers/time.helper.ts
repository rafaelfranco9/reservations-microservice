//ALL TIMES IN THE APP ARE MANAGE IN THIS FORMAT 13:40 = 13*60 + 40 = 820

import { TimeFormatException } from '@domain';
import * as moment from 'moment';
import { TimeFrame } from '../valueObjects';

export class TimeHelper {
  static convert24hTimeToMinutes(time: string): number {
    if (time.split(':').length < 2) throw new TimeFormatException();
    const hours = +time.split(':')[0] * 60;
    const minutes = +time.split(':')[1];
    return hours + minutes;
  }

  static convertMinutesTo24hTime(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = (time / 60 - hours) * 60;
    return `${hours < 10 ? '0' : ''}${hours}:${
      minutes < 10 ? '0' : ''
    }${minutes}`;
  }

  static timeIsBetweenHours(
    timeToValidate: number,
    timeframe: TimeFrame,
  ): boolean {
    return timeToValidate >= timeframe.from && timeToValidate <= timeframe.to;
  }

  static timeFramesIntersect(
    timeframe1: TimeFrame,
    timeframe2: TimeFrame,
  ): boolean {
    return (
      this.timeIsBetweenHours(timeframe1.from, timeframe2) ||
      this.timeIsBetweenHours(timeframe1.to, timeframe2)
    );
  }

  static timeIsLessThan(timeToValidate: number, time: number): boolean {
    return timeToValidate < time;
  }

  static timeIsGreaterThan(timeToValidate: number, time: number): boolean {
    return timeToValidate > time;
  }

  static getCurrentTimeInMinutes() {
    const current = moment().format('HH:mm');
    return this.convert24hTimeToMinutes(current);
  }

  static isValidDate(date: string) {
    return moment(date, 'MM-DD-YYYY', true).isValid();
  }

  static isToday(date: string) {
    return moment(date, 'MM-DD-YYYY', true).isSame(moment(), 'date');
  }

  static isAfterToday(date: string) {
    return moment(date, 'MM-DD-YYYY', true).isAfter(moment(), 'date');
  }

  static isBeforeToday(date: string) {
    return moment(date, 'MM-DD-YYYY', true).isBefore(moment(), 'date');
  }

  static daysDifferenceFromToday(date: string) {
    const parsedDate = moment(date, 'MM-DD-YYYY', true);
    return moment().diff(parsedDate, 'days');
  }

  static dateIsInList(date: string, dateList: string[]) {
    return dateList.some((d) => d === date);
  }

  static getWeekday(date: string) {
    return moment(date, 'MM-DD-YYYY', true).isoWeekday();
    //1 monday - 7 sunday
  }
}
