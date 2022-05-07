import {
  IReservation,
  CreateReservationDto,
  UpdateReservationDto,
  ICrudOperations,
  TimeFrame,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReservationService
  extends ICrudOperations<
    IReservation,
    CreateReservationDto,
    UpdateReservationDto
  > {
  getByTablesIdAndDateTime(
    tablesId: number,
    date: string,
    timeframe: TimeFrame,
  ): Promise<IReservation[]>;
}
