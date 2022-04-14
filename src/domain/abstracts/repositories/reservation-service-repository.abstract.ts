import {
  CreateReservationServiceDto,
  IReservationService,
  UpdateReservationServiceDto,
} from '@domain';
import { IGenericBaseRepository } from './generic-base-repository.abstract';

export abstract class IReservationServiceRepository extends IGenericBaseRepository<
  IReservationService,
  CreateReservationServiceDto,
  UpdateReservationServiceDto
> {}
