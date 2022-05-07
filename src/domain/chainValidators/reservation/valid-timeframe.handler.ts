import {
  CreateReservationDto,
  IRestaurant,
  ReservationHelper,
  ReservationTimeframeException,
  TimeFrame,
} from '@domain';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidTimeframeHandler extends AbstractHandler<CreateReservationDto> {
  constructor(private readonly restaurant: IRestaurant) {
    super();
  }

  public handle(reservation: CreateReservationDto): CreateReservationDto {
    const restaurantOperationHours: TimeFrame = {
      from: this.restaurant.openHour,
      to: this.restaurant.closeHour,
    };

    const reservationTimeframe: TimeFrame = {
      from: reservation.fromHour,
      to: reservation.toHour,
    };

    if (
      ReservationHelper.validTimeFrame(
        restaurantOperationHours,
        reservationTimeframe,
        this.restaurant.averageMealDuration,
      )
    ) {
      return super.handle(reservation);
    }

    throw new ReservationTimeframeException();
  }
}
