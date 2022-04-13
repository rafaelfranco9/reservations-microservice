import { IReservationService } from '@domain';
import { ICrudOperations } from './crud-operations.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReservationServiceService
  extends ICrudOperations<IReservationService> {}
