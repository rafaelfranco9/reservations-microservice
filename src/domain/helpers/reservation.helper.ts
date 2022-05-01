import { IReservation } from '../entities';
import { TimeFrame } from '../valueObjects';
import { TimeHelper } from './time.helper';

export class ReservationHelper {
  static getReservationsInTimeframe(
    reservations: IReservation[],
    timeframe: TimeFrame,
  ) {
    return reservations.filter((reservation) => {
      const reservationTimeframe: TimeFrame = {
        from: reservation.fromHour,
        to: reservation.toHour,
      };
      return TimeHelper.timeFramesIntersect(timeframe, reservationTimeframe);
    });
  }
}
