import {
  CreateReservationDto,
  IReservation,
  UpdateReservationDto,
} from '@domain';
import { IGenericBaseRepository } from './generic-base-repository.abstract';

export abstract class IReservationRepository extends IGenericBaseRepository<
  IReservation,
  CreateReservationDto,
  UpdateReservationDto
> {
  abstract getByRestaurantId(id: number): Promise<IReservation[]>;
  abstract getByRestaurantIdAndDate(
    id: number,
    date: string,
  ): Promise<IReservation[]>;
}
