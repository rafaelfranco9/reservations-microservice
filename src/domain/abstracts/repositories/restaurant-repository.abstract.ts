import { IRestaurant, CreateRestaurantDto, UpdateRestaurantDto } from '@domain';
import { IGenericBaseRepository } from './generic-base-repository.abstract';

export abstract class IRestaurantRepository extends IGenericBaseRepository<
  IRestaurant,
  CreateRestaurantDto,
  UpdateRestaurantDto
> {}
