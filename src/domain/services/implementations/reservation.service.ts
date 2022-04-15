import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository } from '@repositories';
import { IReservationService } from '../interfaces/reservation-service.interface';
import {
  IReservation,
  CreateReservationDto,
  UpdateReservationDto,
  IReservationRepository,
} from '@domain';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @Inject(ReservationRepository)
    private readonly reservationRepository: IReservationRepository,
  ) {}

  getAll(): Promise<IReservation[]> {
    return this.reservationRepository.getAll();
  }

  getOne(id: number): Promise<IReservation> {
    return this.reservationRepository.getOne(id);
  }

  create(item: CreateReservationDto): Promise<IReservation> {
    return this.reservationRepository.create(item);
  }

  update(id: number, item: UpdateReservationDto): Promise<IReservation> {
    return this.reservationRepository.update(id, item);
  }

  delete(id: number): Promise<IReservation> {
    return this.reservationRepository.delete(id);
  }
}
