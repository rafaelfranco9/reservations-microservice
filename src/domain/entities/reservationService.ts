import { Weekdays } from '../valueObjects';

export class ReservationService {
  id: string;
  restaurantId: string;
  isActive: boolean;
  weekdays: Weekdays;
  fromHour: number;
  toHour: number;
  inactiveDates: string[];
}
