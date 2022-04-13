import { ReservationService } from '@database';
import {
  CommonmExceptionMessages,
  CreateReservationServiceDto,
  IGenericRepository,
  UpdateReservationServiceDto,
} from '@domain';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationServiceRepository
  implements IGenericRepository<ReservationService>
{
  constructor(
    @InjectRepository(ReservationService)
    private readonly repository: Repository<ReservationService>,
  ) {}

  getAll(): Promise<ReservationService[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<ReservationService> {
    const reservationService = await this.repository.findOne(id);
    if (!reservationService) {
      throw new NotFoundException(
        CommonmExceptionMessages.itemNotFound('reservation service', id),
      );
    }
    return reservationService;
  }

  create(item: CreateReservationServiceDto): Promise<ReservationService> {
    const reservationService = this.repository.create(item);
    return this.repository.save(reservationService);
  }

  async update(
    id: number,
    item: UpdateReservationServiceDto,
  ): Promise<ReservationService> {
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

  async delete(id: number): Promise<ReservationService> {
    const reservationService = await this.getOne(id);
    return this.repository.remove(reservationService);
  }
}
