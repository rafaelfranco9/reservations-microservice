import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationService } from '@database';
import {
  CommonmExceptionMessages,
  CreateReservationServiceDto,
  IReservationService,
  IReservationServiceRepository,
  UpdateReservationServiceDto,
} from '@domain';
@Injectable()
export class ReservationServiceRepository
  implements IReservationServiceRepository
{
  constructor(
    @InjectRepository(ReservationService)
    private readonly repository: Repository<IReservationService>,
  ) {}

  getAll(): Promise<IReservationService[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<IReservationService> {
    const reservationService = await this.repository.findOne(id);
    if (!reservationService) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('reservation service', id),
      );
    }
    return reservationService;
  }

  create(item: CreateReservationServiceDto): Promise<IReservationService> {
    const reservationService = this.repository.create(item);
    return this.repository.save(reservationService);
  }

  async update(
    id: number,
    item: UpdateReservationServiceDto,
  ): Promise<IReservationService> {
    const reservationService = await this.repository.preload({
      id,
      ...item,
    });
    if (!reservationService) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('reservation service', id),
      );
    }
    return this.repository.save(reservationService);
  }

  async delete(id: number): Promise<IReservationService> {
    const reservationService = await this.getOne(id);
    return this.repository.remove(reservationService);
  }
}
