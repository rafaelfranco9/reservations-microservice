import {
  IReservation,
  CreateReservationDto,
  UpdateReservationDto,
  ICrudOperations,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReservationService
  extends ICrudOperations<
    IReservation,
    CreateReservationDto,
    UpdateReservationDto
  > {}
