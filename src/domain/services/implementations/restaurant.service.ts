import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository, RestaurantRepository } from '@repositories';
import {
  CreateRestaurantDto,
  IReservation,
  IReservationRepository,
  IRestaurant,
  IRestaurantRepository,
  IRestaurantService,
  SlotsByTimeInterval,
  TimeFrame,
  TimeSlotsByArea,
  RESERVATION_TIME_INTERVAL,
  ReservationHelper,
  RestaurantHelper,
} from '@domain';

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

  async getReservationSlots(
    id: number,
    date: string,
  ): Promise<TimeSlotsByArea> {
    const restaurant = await this.getOne(id);
    const reservations = await this.getAllReservationsByDate(id, date);
    const timeSlotsByArea: TimeSlotsByArea = {};
    let slotsByTimeInterval: SlotsByTimeInterval = {};
    const lastSlotTime = restaurant.closeHour - RESERVATION_TIME_INTERVAL;

    restaurant.areas.forEach((area) => {
      let timer = restaurant.openHour;

      while (timer <= lastSlotTime) {
        const currentTimeframe: TimeFrame = {
          from: timer,
          to: timer + restaurant.averageMealDuration - 1,
        };

        const currentReservations =
          ReservationHelper.getReservationsInTimeframe(
            reservations,
            currentTimeframe,
          );

        const tablesAvailable = RestaurantHelper.getAreaCapacityUpdated(
          area.capacity,
          currentReservations,
        );

        slotsByTimeInterval[timer.toString()] = RestaurantHelper.createTimeSlot(
          tablesAvailable,
          currentTimeframe,
        );

        timer += RESERVATION_TIME_INTERVAL;
      }

      timeSlotsByArea[area.name] = slotsByTimeInterval;
      slotsByTimeInterval = {};
    });

    return timeSlotsByArea;
  }
}
