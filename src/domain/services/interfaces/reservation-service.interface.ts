import { IRestaurant } from 'src/domain/entities';
import { ICrudOperations } from './crud-operations.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRestaurantService extends ICrudOperations<IRestaurant> {}
