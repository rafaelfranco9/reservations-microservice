import { IWeekdays } from '../valueObjects';

export interface IReservationService {
  id: number;
  restaurantId: string;
  isActive: boolean;
  weekdays: IWeekdays;
  fromHour: number;
  toHour: number;
  inactiveDates: string[];
}
