import { IReservation, ITableGroup } from '../entities';
import { Slot, TimeFrame } from '../valueObjects';

export class RestaurantHelper {
  static getAreaCapacityUpdated(
    capacity: ITableGroup[],
    reservations: IReservation[],
  ): ITableGroup[] {
    return capacity.map((tableGroup) => {
      const numOfTableReservations = reservations.reduce((acc, curr) => {
        if (curr.tableGroupId == tableGroup.id) {
          return (acc += 1);
        }
        return acc;
      }, 0);

      return {
        ...tableGroup,
        quantity: tableGroup.quantity - numOfTableReservations,
      };
    });
  }

  static createTimeSlot(tableGroups: ITableGroup[], timeframe: TimeFrame) {
    const slots: Slot[] = [];

    tableGroups.forEach((tableGroup) => {
      if (tableGroup.quantity < 1) return;

      const interations = tableGroup.max - tableGroup.min + 1;
      [...Array(interations).keys()].forEach((value) => {
        const partySize = tableGroup.min + value;
        const slotWithPartySize = slots.find(
          (slot) => slot.partySize === partySize,
        );
        if (slotWithPartySize) {
          slotWithPartySize.openSpots += tableGroup.quantity;
          slotWithPartySize.tableGroupId.push(tableGroup.id);
        } else {
          slots.push({
            openSpots: tableGroup.quantity,
            partySize: partySize,
            startTime: timeframe.from,
            endTime: timeframe.to,
            tableGroupId: [tableGroup.id],
          });
        }
      });
    });

    return slots;
  }
}
