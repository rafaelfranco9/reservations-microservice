import { CreateRestaurantDto, UpdateRestaurantDto } from '@domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericRepository } from 'src/domain/abstracts/generic-repository.abstract';
import { Repository } from 'typeorm';
import { Restaurant } from '../database';

@Injectable()
export class RestaurantRepository implements IGenericRepository<Restaurant> {
  constructor(
    @InjectRepository(Restaurant)
    private readonly repository: Repository<Restaurant>,
  ) {}

  getAll(): Promise<Restaurant[]> {
    return this.repository.find({ relations: ['areas', 'areas.capacity'] });
  }

  async getOne(id: number): Promise<Restaurant> {
    const restaurant = await this.repository.findOne(id, {
      relations: ['areas', 'areas.capacity'],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} was not found`);
    }
    return restaurant;
  }

  create(item: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.repository.create(item);
    return this.repository.save(restaurant);
  }

  async update(id: number, item: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.repository.preload({
      id,
      ...item,
    });
    console.log(JSON.stringify(restaurant));
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with id ${id} was not found`);
    }
    return this.repository.save(restaurant);
  }

  async delete(id: number): Promise<Restaurant> {
    const restaurant = await this.getOne(id);
    return this.repository.remove(restaurant);
  }
}
