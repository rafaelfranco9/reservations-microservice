import { Inject, NotFoundException } from '@nestjs/common';
import { IReservationRepository } from '@domain';
import { Repository } from 'typeorm';
import { Reservation } from '@database';
import {
  CommonmExceptionMessages,
  CreateReservationDto,
  IReservation,
  UpdateReservationDto,
} from '@domain';

export class ReservationRepository implements IReservationRepository {
  constructor(
    @Inject(Reservation) private readonly repository: Repository<IReservation>,
  ) {}

  getAll(): Promise<IReservation[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<IReservation> {
    const reservation = await this.repository.findOne(id);
    if (!reservation) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('reservation', id),
      );
    }
    return reservation;
  }

  create(item: CreateReservationDto): Promise<IReservation> {
    const reservation = this.repository.create(item);
    return this.repository.save(reservation);
  }

  async update(id: number, item: UpdateReservationDto): Promise<IReservation> {
    const reservation = await this.repository.preload({
      id,
      ...item,
    });
    if (!reservation) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('reservation', id),
      );
    }
    return this.repository.save(reservation);
  }

  async delete(id: number): Promise<IReservation> {
    const reservation = await this.getOne(id);
    return this.repository.remove(reservation);
  }
}
