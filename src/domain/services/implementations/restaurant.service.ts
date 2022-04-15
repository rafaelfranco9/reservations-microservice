import {
  CreateRestaurantDto,
  IRestaurant,
  IRestaurantRepository,
  IRestaurantService,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@repositories';

@Injectable()
export class RestaurantService implements IRestaurantService {
  constructor(
    @Inject(RestaurantRepository)
    private readonly restaurantRepository: IRestaurantRepository,
  ) {}

  getAll(): Promise<IRestaurant[]> {
    return this.restaurantRepository.getAll();
  }

  getOne(id: number): Promise<IRestaurant> {
    return this.restaurantRepository.getOne(id);
  }

  create(item: CreateRestaurantDto): Promise<IRestaurant> {
    return this.restaurantRepository.create(item);
  }

  update(id: number, item: IRestaurant): Promise<IRestaurant> {
    return this.restaurantRepository.update(id, item);
  }

  delete(id: number): Promise<IRestaurant> {
    return this.restaurantRepository.delete(id);
  }
}
