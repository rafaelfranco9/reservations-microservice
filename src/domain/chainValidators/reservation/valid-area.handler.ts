import { CreateReservationDto, IRestaurant } from '@domain';
import { ReservationAreaException } from '@exceptions';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidAreaHandler extends AbstractHandler<CreateReservationDto> {
  constructor(private readonly restaurant: IRestaurant) {
    super();
  }

  public handle(reservation: CreateReservationDto): CreateReservationDto {
    if (this.restaurant.areas.find((area) => area.id == reservation.areaId)) {
      return super.handle(reservation);
    }
    throw new ReservationAreaException();
  }
}
