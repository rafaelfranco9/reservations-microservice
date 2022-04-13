import { IReservationService, IRestaurant } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract restaurants: IGenericRepository<IRestaurant>;
  abstract reservationService: IGenericRepository<IReservationService>;
}
