import { IReservation, ITables } from '../entities';
import { Slot, TimeFrame } from '../valueObjects';

export class RestaurantHelper {
  static getAreaCapacityUpdated(
    capacity: ITables[],
    reservations: IReservation[],
  ): ITables[] {
    return capacity.map((tables) => {
      const numOfTableReservations = reservations.reduce((acc, curr) => {
        if (curr.tablesId == tables.id) {
          return (acc += 1);
        }
        return acc;
      }, 0);

      return { ...tables, quantity: tables.quantity - numOfTableReservations };
    });
  }

  static createTimeSlot(tables: ITables[], timeframe: TimeFrame) {
    const slots: Slot[] = [];

    tables.forEach((table) => {
      if (table.quantity < 1) return;

      const interations = table.max - table.min + 1;
      [...Array(interations).keys()].forEach((value) => {
        const partySize = table.min + value;
        const slotWithPartySize = slots.find(
          (slot) => slot.partySize === partySize,
        );
        if (slotWithPartySize) {
          slotWithPartySize.openSpots += table.quantity;
          slotWithPartySize.tablesId.push(table.id);
        } else {
          slots.push({
            openSpots: table.quantity,
            partySize: partySize,
            startTime: timeframe.from,
            endTime: timeframe.to,
            tablesId: [table.id],
          });
        }
      });
    });

    return slots;
  }
}
