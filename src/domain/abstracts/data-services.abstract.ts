import { IReservationService, IRestaurant } from '@domain';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract restaurants: IGenericRepository<IRestaurant>;
  abstract reservationService: IGenericRepository<IReservationService>;
}
