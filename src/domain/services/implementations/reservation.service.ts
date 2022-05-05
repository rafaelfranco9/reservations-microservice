import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository, RestaurantRepository } from '@repositories';
import {
  IReservation,
  CreateReservationDto,
  UpdateReservationDto,
  IReservationRepository,
  IRestaurantRepository,
  IReservationService,
  ReservationAreaOrTableException,
  ReservationHelper,
} from '@domain';
import {
  ReservationDateException,
  ReservationPartySizeException,
  ReservationSlotException,
  ReservationTimeframeException,
} from '@exceptions';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @Inject(ReservationRepository)
    private readonly reservationRepository: IReservationRepository,
    @Inject(RestaurantRepository)
    private readonly restaurantRepository: IRestaurantRepository,
  ) {}

  getAll(): Promise<IReservation[]> {
    return this.reservationRepository.getAll();
  }

  getOne(id: number): Promise<IReservation> {
    return this.reservationRepository.getOne(id);
  }

  create(item: CreateReservationDto): Promise<IReservation> {
    return this.reservationRepository.create(item);
  }

  update(id: number, item: UpdateReservationDto): Promise<IReservation> {
    return this.reservationRepository.update(id, item);
  }

  delete(id: number): Promise<IReservation> {
    return this.reservationRepository.delete(id);
  }

  async validIncomingReservation(
    reservation: CreateReservationDto,
  ): Promise<boolean> {
    const { restaurantId, tablesId, areaId, date, fromHour, toHour } =
      reservation;
    const restaurant = await this.restaurantRepository.getOne(restaurantId);
    const reservations =
      await this.reservationRepository.getByTablesIdAndDateTime(
        tablesId,
        date,
        { from: fromHour, to: toHour },
      );

    const tableGroup = restaurant.areas
      .find((area) => area.id == areaId)
      ?.capacity.find((tables) => tables.id == tablesId);

    if (!tableGroup) {
      throw new ReservationAreaOrTableException();
    }
    if (!ReservationHelper.validPartySize(reservation.partySize, tableGroup)) {
      throw new ReservationPartySizeException();
    }
    if (tableGroup.quantity - reservations.length > 0) {
      throw new ReservationSlotException();
    }
    if (
      !ReservationHelper.validTimeFrame(
        { from: restaurant.openHour, to: restaurant.closeHour },
        { from: reservation.fromHour, to: reservation.toHour },
        restaurant.averageMealDuration,
      )
    ) {
      throw new ReservationTimeframeException();
    }

    if (!ReservationHelper.validDate(reservation.date)) {
      throw new ReservationDateException();
    }

    return true;
  }
}
