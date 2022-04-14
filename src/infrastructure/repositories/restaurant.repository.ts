import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '@database';
import {
  CommonmExceptionMessages,
  CreateRestaurantDto,
  IRestaurant,
  IRestaurantRepository,
  UpdateRestaurantDto,
} from '@domain';

@Injectable()
export class RestaurantRepository implements IRestaurantRepository {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<IRestaurant>,
  ) {}

  getAll(): Promise<IRestaurant[]> {
    return this.repository.find({ relations: ['areas', 'areas.capacity'] });
  }

  async getOne(id: number): Promise<IRestaurant> {
    const restaurant = await this.repository.findOne(id, {
      relations: ['areas', 'areas.capacity'],
    });
    if (!restaurant) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('restaurant', id),
      );
    }
    return restaurant;
  }

  create(item: CreateRestaurantDto): Promise<IRestaurant> {
    const restaurant = this.repository.create(item);
    return this.repository.save(restaurant);
  }

  async update(id: number, item: UpdateRestaurantDto): Promise<IRestaurant> {
    const restaurant = await this.repository.preload({
      id,
      ...item,
    });

    if (!restaurant) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('restaurant', id),
      );
    }
    return this.repository.save(restaurant);
  }

  async delete(id: number): Promise<IRestaurant> {
    const restaurant = await this.getOne(id);
    return this.repository.remove(restaurant);
  }
}
