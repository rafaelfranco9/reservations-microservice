import {
  CreateReservationConfigurationDto,
  IReservationConfiguration,
  UpdateReservationConfigurationDto,
} from '@domain';
import { IGenericBaseRepository } from './generic-base-repository.abstract';

export abstract class IReservationConfigurationRepository extends IGenericBaseRepository<
  IReservationConfiguration,
  CreateReservationConfigurationDto,
  UpdateReservationConfigurationDto
> {
  abstract getByRestaurantId(id: number): Promise<IReservationConfiguration>;
}
