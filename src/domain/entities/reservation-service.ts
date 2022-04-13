import { IWeekdays } from './weekdays';

export interface IReservationService {
  id: number;
  restaurantId: string;
  isActive: boolean;
  weekdays: IWeekdays;
  fromHour: number;
  toHour: number;
  inactiveDates: string[];
}
