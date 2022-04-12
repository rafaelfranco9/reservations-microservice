import { ReservationService, Restaurant } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract restaurants: IGenericRepository<Restaurant>;
  abstract reservationService: IGenericRepository<ReservationService>;
}
