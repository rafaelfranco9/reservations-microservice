import {
  CreateReservationDto,
  ReservationDateException,
  ReservationMinTimeBeforeException,
  TimeHelper,
  MIN_TIME_BEFORE_RESERVATION,
  IReservationConfiguration,
  ReservationConfigurationInactiveException,
  ReservationConfigurationHelper,
  IsoWeekdays,
  ReservationDateSoFarException,
} from '@domain';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidDateHandler extends AbstractHandler<CreateReservationDto> {
  constructor(private readonly configuration: IReservationConfiguration) {
    super();
  }

  public handle(reservation: CreateReservationDto): CreateReservationDto {
    if (TimeHelper.isValidDate(reservation.date)) {
      const validWithCurrent = this.validateWithCurrent(reservation);
      const validWithConfig = this.validateWithConfiguration(reservation);
      if (validWithConfig && validWithCurrent) {
        return super.handle(reservation);
      }
    }
    throw new ReservationDateException();
  }

  private validateWithCurrent(reservation: CreateReservationDto) {
    if (TimeHelper.isAfterToday(reservation.date)) {
      if (TimeHelper.daysDifferenceFromToday(reservation.date) > 60)
        throw new ReservationDateSoFarException();
      return true;
    }

    if (TimeHelper.isToday(reservation.date)) {
      const timeDifference =
        reservation.fromHour - TimeHelper.getCurrentTimeInMinutes();

      if (timeDifference <= MIN_TIME_BEFORE_RESERVATION) {
        throw new ReservationMinTimeBeforeException();
      }
      return true;
    }
  }

  private validateWithConfiguration(reservation: CreateReservationDto) {
    if (!this.configuration.isActive)
      throw new ReservationConfigurationInactiveException();

    if (
      TimeHelper.dateIsInList(
        reservation.date,
        this.configuration.inactiveDates,
      )
    )
      throw new ReservationConfigurationInactiveException();

    if (
      !ReservationConfigurationHelper.isValidWeekday(
        this.configuration.weekdays,
        TimeHelper.getWeekday(reservation.date) as IsoWeekdays,
      )
    ) {
      throw new ReservationConfigurationInactiveException();
    }
    return true;
  }
}
