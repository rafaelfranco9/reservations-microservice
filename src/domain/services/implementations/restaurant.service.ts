import {
  CreateRestaurantDto,
  IReservation,
  IReservationRepository,
  IRestaurant,
  IRestaurantRepository,
  IRestaurantService,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository, RestaurantRepository } from '@repositories';

@Injectable()
export class RestaurantService implements IRestaurantService {
  constructor(
    @Inject(RestaurantRepository)
    private readonly restaurantRepository: IRestaurantRepository,
    @Inject(ReservationRepository)
    private readonly reservationRepository: IReservationRepository,
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

  async getAllReservations(id: number): Promise<IReservation[]> {
    const restaurant = await this.getOne(id);
    return this.reservationRepository.getByRestaurantId(restaurant.id);
  }

  async getAllReservationsByDate(
    id: number,
    date: string,
  ): Promise<IReservation[]> {
    const restaurant = await this.getOne(id);
    return this.reservationRepository.getByRestaurantIdAndDate(
      restaurant.id,
      date,
    );
  }
}
