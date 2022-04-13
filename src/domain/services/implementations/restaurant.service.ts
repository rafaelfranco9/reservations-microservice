import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from '@repositories';
import { IRestaurant } from 'src/domain/entities';
import { IRestaurantService } from '../interfaces';

@Injectable()
export class RestaurantService implements IRestaurantService {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}

  getAll(): Promise<IRestaurant[]> {
    return this.restaurantRepository.getAll();
  }

  getOne(id: number): Promise<IRestaurant> {
    return this.restaurantRepository.getOne(id);
  }

  create(item: IRestaurant): Promise<IRestaurant> {
    return this.restaurantRepository.create(item);
  }

  update(id: number, item: IRestaurant): Promise<IRestaurant> {
    return this.restaurantRepository.update(id, item);
  }

  delete(id: number): Promise<IRestaurant> {
    return this.restaurantRepository.delete(id);
  }
}
