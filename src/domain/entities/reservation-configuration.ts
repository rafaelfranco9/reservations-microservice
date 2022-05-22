import { IWeekdays } from './weekdays';

export interface IReservationConfiguration {
  id: number;
  restaurantId: number;
  isActive: boolean;
  weekdays: IWeekdays;
  fromHour: number;
  toHour: number;
  inactiveDates: string[];
}
