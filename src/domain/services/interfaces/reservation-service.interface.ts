import {
  CreateReservationServiceDto,
  ICrudOperations,
  IReservationService,
  UpdateReservationServiceDto,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReservationServiceService
  extends ICrudOperations<
    IReservationService,
    CreateReservationServiceDto,
    UpdateReservationServiceDto
  > {}
