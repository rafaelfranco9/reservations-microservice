import {
  CreateReservationDto,
  IRestaurant,
  ReservationHelper,
  ReservationTimeframeException,
  TimeFrame,
  IReservationConfiguration,
} from '@domain';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidTimeframeHandler extends AbstractHandler<CreateReservationDto> {
  constructor(
    private readonly restaurant: IRestaurant,
    private readonly configuration: IReservationConfiguration,
  ) {
    super();
  }

  public handle(reservation: CreateReservationDto): CreateReservationDto {
    const reservationAcceptanceTimeframe: TimeFrame = {
      from: this.configuration.fromHour,
      to: this.configuration.toHour,
    };

    const reservationTimeframe: TimeFrame = {
      from: reservation.fromHour,
      to: reservation.toHour,
    };

    if (
      ReservationHelper.validTimeFrame(
        reservationAcceptanceTimeframe,
        reservationTimeframe,
        this.restaurant.averageMealDuration,
      )
    ) {
      return super.handle(reservation);
    }

    throw new ReservationTimeframeException();
  }
}
