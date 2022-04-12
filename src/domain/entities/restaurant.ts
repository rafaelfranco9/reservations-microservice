import { Area } from './area';

export class Restaurant {
  id: string;
  name: string;
  openHour: number;
  closeHour: number;
  averageMealDuration: number;
  areas: Area[];
}
