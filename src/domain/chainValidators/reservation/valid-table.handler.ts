import { CreateReservationDto, IRestaurant } from '@domain';
import { ReservationTableException } from '@exceptions';
import { AbstractHandler } from '../abstract-handler.abstract';

export class ValidTableHandler extends AbstractHandler<CreateReservationDto> {
  constructor(
    private readonly restaurant: IRestaurant,
    private readonly validAreaId: number,
  ) {
    super();
  }

  public handle(reservation: CreateReservationDto): CreateReservationDto {
    const area = this.restaurant.areas.find(
      (area) => area.id == this.validAreaId,
    );

    if (
      area.capacity.find((tableGroup) => tableGroup.id == reservation.tablesId)
    ) {
      return super.handle(reservation);
    }
    throw new ReservationTableException();
  }
}
