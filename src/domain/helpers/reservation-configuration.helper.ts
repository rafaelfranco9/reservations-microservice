import { IWeekdays } from '../entities';
export type IsoWeekdays = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export class ReservationConfigurationHelper {
  static isValidWeekday(
    configWeekdays: IWeekdays,
    requestedIsoWeekday: IsoWeekdays,
  ) {
    switch (requestedIsoWeekday) {
      case 1:
        return configWeekdays.monday;
      case 2:
        return configWeekdays.tuesday;
      case 3:
        return configWeekdays.wednesday;
      case 4:
        return configWeekdays.thursday;
      case 5:
        return configWeekdays.friday;
      case 6:
        return configWeekdays.saturday;
      case 7:
        return configWeekdays.sunday;
    }
  }
}
