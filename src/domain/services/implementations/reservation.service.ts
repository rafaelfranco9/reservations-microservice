import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository, RestaurantRepository } from '@repositories';
import {
  IReservation,
  CreateReservationDto,
  UpdateReservationDto,
  IReservationRepository,
  IRestaurantRepository,
  IReservationService,
  TimeFrame,
} from '@domain';

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

  getByTablesIdAndDateTime(
    tableGroupId: number,
    date: string,
    timeframe: TimeFrame,
  ) {
    return this.reservationRepository.getByTablesIdAndDateTime(
      tableGroupId,
      date,
      timeframe,
    );
  }
}
