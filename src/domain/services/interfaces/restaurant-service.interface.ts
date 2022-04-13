import {
  CreateRestaurantDto,
  ICrudOperations,
  IRestaurant,
  UpdateRestaurantDto,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRestaurantService
  extends ICrudOperations<
    IRestaurant,
    CreateRestaurantDto,
    UpdateRestaurantDto
  > {}
