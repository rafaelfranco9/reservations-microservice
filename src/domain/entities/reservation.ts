export interface IReservation {
  id: number;
  restaurantId: number;
  customer: string;
  date: string;
  fromHour: number;
  toHour: number;
  partySize: number;
  areaId: number;
  tableGroupId: number;
}
//TODO: AGREGAR STATUS
