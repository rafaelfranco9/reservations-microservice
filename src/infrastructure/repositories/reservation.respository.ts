import { Reservation } from '@database';
import {
  CommonmExceptionMessages,
  CreateReservationDto,
  IGenericRepository,
  UpdateReservationDto,
} from '@domain';
import { Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

export class ReservationRepository implements IGenericRepository<Reservation> {
  constructor(
    @Inject(Reservation) private readonly repository: Repository<Reservation>,
  ) {}

  getAll(): Promise<Reservation[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<Reservation> {
    const reservation = await this.repository.findOne(id);
    if (!reservation) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('reservation', id),
      );
    }
    return reservation;
  }

  create(item: CreateReservationDto): Promise<Reservation> {
    const reservation = this.repository.create(item);
    return this.repository.save(reservation);
  }

  async update(id: number, item: UpdateReservationDto): Promise<Reservation> {
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

  async delete(id: number): Promise<Reservation> {
    const reservation = await this.getOne(id);
    return this.repository.remove(reservation);
  }
}
