import {
  CreateRestaurantDto,
  IRestaurant,
  UpdateRestaurantDto,
  ICrudOperations,
  IReservation,
  AreaReservationSlots,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IRestaurantService
  extends ICrudOperations<
    IRestaurant,
    CreateRestaurantDto,
    UpdateRestaurantDto
  > {
  getAllReservations(id: number): Promise<IReservation[]>;
  getAllReservationsByDate(id: number, date: string): Promise<IReservation[]>;
  getReservationSlots(
    id: number,
    date: string,
  ): Promise<AreaReservationSlots[]>;
}
