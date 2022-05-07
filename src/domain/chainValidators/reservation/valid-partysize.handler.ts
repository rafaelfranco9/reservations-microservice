import {
  CreateReservationDto,
  ReservationHelper,
  ReservationPartySizeException,
  IRestaurant,
} from '@domain';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidPartySizeHandler extends AbstractHandler<CreateReservationDto> {
  constructor(private readonly restaurant: IRestaurant) {
    super();
  }

  public handle(reservation: CreateReservationDto): CreateReservationDto {
    const tablesGroup = this.restaurant.areas
      .find((area) => area.id == reservation.areaId)
      .capacity.find((tables) => tables.id == reservation.tablesId);

    if (ReservationHelper.validPartySize(reservation.partySize, tablesGroup)) {
      return super.handle(reservation);
    }

    throw new ReservationPartySizeException();
  }
}
