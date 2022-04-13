import { IArea } from './area';

export interface IRestaurant {
  id: number;
  name: string;
  openHour: number;
  closeHour: number;
  averageMealDuration: number;
  areas: IArea[];
}
