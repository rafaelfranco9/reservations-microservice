import { IReservation, ITableGroup } from '../entities';
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
        to: reservation.toHour - 1,
      };
      return TimeHelper.timeFramesIntersect(timeframe, reservationTimeframe);
    });
  }

  static validPartySize(partySize: number, tableGroup: ITableGroup): boolean {
    return partySize >= tableGroup.min && partySize <= tableGroup.max;
  }

  static validTimeFrame(
    restaurantOperationTimeframe: TimeFrame,
    reservationSlotTimeframe: TimeFrame,
    restaurantMealAverage: number,
  ) {
    return (
      reservationSlotTimeframe.from >= restaurantOperationTimeframe.from &&
      reservationSlotTimeframe.to <= restaurantOperationTimeframe.to &&
      reservationSlotTimeframe.to > reservationSlotTimeframe.from &&
      reservationSlotTimeframe.to - reservationSlotTimeframe.from <=
        restaurantMealAverage
    );
  }
}
