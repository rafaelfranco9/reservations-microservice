import {
  CreateReservationDto,
  ReservationDateException,
  ReservationMinTimeBeforeException,
  TimeHelper,
  MIN_TIME_BEFORE_RESERVATION,
} from '@domain';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidDateHandler extends AbstractHandler<CreateReservationDto> {
  public handle(reservation: CreateReservationDto): CreateReservationDto {
    if (TimeHelper.isValidDate(reservation.date)) {
      if (TimeHelper.isAfterToday(reservation.date)) {
        return super.handle(reservation);
      }

      if (TimeHelper.isToday(reservation.date)) {
        const timeDifference =
          reservation.fromHour - TimeHelper.getCurrentTimeInMinutes();

        if (timeDifference <= MIN_TIME_BEFORE_RESERVATION) {
          throw new ReservationMinTimeBeforeException();
        }
        return super.handle(reservation);
      }
    }
    throw new ReservationDateException();
  }
}
