export class Slot {
  startTime: number;
  endTime: number;
  partySize: number;
  openSpots: number;
  tableGroupId: number[];
}

export type SlotsByTimeInterval = Record<string, Slot[]>;
export interface AreaReservationSlots {
  id: number;
  name: string;
  slots: SlotsByTimeInterval;
}
