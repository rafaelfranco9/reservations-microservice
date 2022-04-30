import { Injectable, NotFoundException } from '@nestjs/common';
import { IReservationRepository } from '@domain';
import { Repository } from 'typeorm';
import { Reservation } from '@database';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CommonExceptionMessages,
  CreateReservationDto,
  IReservation,
  UpdateReservationDto,
} from '@domain';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repository: Repository<IReservation>,
  ) {}

  getAll(): Promise<IReservation[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<IReservation> {
    const reservation = await this.repository.findOne(id);
    if (!reservation) {
      throw new NotFoundException(
        CommonExceptionMessages.itemNotFound('reservation', id),
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
        CommonExceptionMessages.itemNotFound('reservation', id),
      );
    }
    return this.repository.save(reservation);
  }

  async delete(id: number): Promise<IReservation> {
    const reservation = await this.getOne(id);
    return this.repository.remove(reservation);
  }

  async getByRestaurantId(id: number): Promise<IReservation[]> {
    return this.repository.find({
      where: { restaurantId: id },
    });
  }

  async getByRestaurantIdAndDate(
    id: number,
    date: string,
  ): Promise<IReservation[]> {
    return this.repository.find({
      where: { restaurantId: id, date: date },
    });
  }
}
