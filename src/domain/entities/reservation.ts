export interface IReservation {
  id: number;
  restaurantId: string;
  customer: string;
  date: string;
  fromHour: number;
  toHour: number;
  partySize: number;
  areaId: string;
  tablesId: string;
}
