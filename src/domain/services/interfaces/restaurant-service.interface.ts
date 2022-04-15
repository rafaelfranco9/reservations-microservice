import {
  CreateRestaurantDto,
  IRestaurant,
  UpdateRestaurantDto,
  ICrudOperations,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRestaurantService
  extends ICrudOperations<
    IRestaurant,
    CreateRestaurantDto,
    UpdateRestaurantDto
  > {}
