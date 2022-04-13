import { IReservationService } from '@domain';
import { Injectable } from '@nestjs/common';
import { ReservationServiceRepository } from '@repositories';
import { IReservationServiceService } from '../interfaces';

@Injectable()
export class ReservationServiceService implements IReservationServiceService {
  constructor(
    private readonly reservationServiceRepository: ReservationServiceRepository,
  ) {}

  getAll(): Promise<IReservationService[]> {
    return this.reservationServiceRepository.getAll();
  }

  getOne(id: number): Promise<IReservationService> {
    return this.reservationServiceRepository.getOne(id);
  }

  create(item: IReservationService): Promise<IReservationService> {
    return this.reservationServiceRepository.create(item);
  }

  update(id: number, item: IReservationService): Promise<IReservationService> {
    return this.reservationServiceRepository.update(id, item);
  }

  delete(id: number): Promise<IReservationService> {
    return this.reservationServiceRepository.delete(id);
  }
}
