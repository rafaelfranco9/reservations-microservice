export class Slot {
  startTime: number;
  endTime: number;
  partySize: number;
  openSpots: number;
}

//area name -> time interval -> slots
export type SlotsByTimeInterval = Record<string, Slot[]>;
export type TimeSlotsByArea = Record<string, SlotsByTimeInterval>;
