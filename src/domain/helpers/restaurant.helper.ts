import { IReservation, ITables } from '../entities';
import { Slot, TimeFrame } from '../valueObjects';

export class RestaurantHelper {
  static getAreaCapacityUpdated(
    capacity: ITables[],
    reservations: IReservation[],
  ): ITables[] {
    return capacity.map((tables) => {
      if (
        reservations.find((reservation) => reservation.tablesId == tables.id)
      ) {
        return { ...tables, quantity: tables.quantity - 1 };
      }
      return tables;
    });
  }

  static createTimeSlot(tables: ITables[], timeframe: TimeFrame) {
    const slots: Slot[] = [];

    tables.forEach((table) => {
      if (table.quantity == 0) return;

      const interations = table.max - table.min + 1;
      [...Array(interations).keys()].forEach((value) => {
        const partySize = table.min + value;
        const slotWithPartySize = slots.find(
          (slot) => slot.partySize === partySize,
        );
        if (slotWithPartySize) {
          slotWithPartySize.openSpots += table.quantity;
        } else {
          slots.push({
            openSpots: table.quantity,
            partySize: partySize,
            startTime: timeframe.from,
            endTime: timeframe.to,
          });
        }
      });
    });

    return slots;
  }
}
