import {
  CreateReservationConfigurationDto,
  IReservationConfiguration,
  UpdateReservationConfigurationDto,
  ICrudOperations,
} from '@domain';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReservationConfigurationService
  extends ICrudOperations<
    IReservationConfiguration,
    CreateReservationConfigurationDto,
    UpdateReservationConfigurationDto
  > {}
