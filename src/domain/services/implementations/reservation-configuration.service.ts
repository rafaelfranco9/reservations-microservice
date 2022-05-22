import {
  IReservationConfiguration,
  IReservationConfigurationRepository,
  IReservationConfigurationService as IReservationConfigurationService,
} from '@domain';
import { Inject, Injectable } from '@nestjs/common';
import { ReservationConfigurationRepository } from '@repositories';

@Injectable()
export class ReservationConfigurationService
  implements IReservationConfigurationService
{
  constructor(
    @Inject(ReservationConfigurationRepository)
    private readonly reservationServiceRepository: IReservationConfigurationRepository,
  ) {}

  getAll(): Promise<IReservationConfiguration[]> {
    return this.reservationServiceRepository.getAll();
  }

  getOne(id: number): Promise<IReservationConfiguration> {
    return this.reservationServiceRepository.getOne(id);
  }

  create(item: IReservationConfiguration): Promise<IReservationConfiguration> {
    return this.reservationServiceRepository.create(item);
    //TODO: VALIDAR TIMEFRAME PARA QUE ESTE DENTRO DE LAS OPERATIONS HOURS DEL RESTORANTE
  }

  update(
    id: number,
    item: IReservationConfiguration,
  ): Promise<IReservationConfiguration> {
    return this.reservationServiceRepository.update(id, item);
  }

  delete(id: number): Promise<IReservationConfiguration> {
    return this.reservationServiceRepository.delete(id);
  }

  getByRestaurantId(id: number): Promise<IReservationConfiguration> {
    return this.reservationServiceRepository.getByRestaurantId(id);
  }
  //TODO: AGREGAR METODO QUE VALIDE SI EL EXISTE EL RESTAURANT ID ANTES DE INTENTAR CREAR
}
