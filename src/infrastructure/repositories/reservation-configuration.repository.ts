import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationConfiguration } from '@database';
import {
  CommonExceptionMessages,
  CreateReservationConfigurationDto,
  IReservationConfiguration,
  IReservationConfigurationRepository,
  UpdateReservationConfigurationDto,
} from '@domain';

@Injectable()
export class ReservationConfigurationRepository
  implements IReservationConfigurationRepository
{
  constructor(
    @InjectRepository(ReservationConfiguration)
    private readonly repository: Repository<IReservationConfiguration>,
  ) {}

  getAll(): Promise<IReservationConfiguration[]> {
    return this.repository.find();
  }

  async getOne(id: number): Promise<IReservationConfiguration> {
    const reservationService = await this.repository.findOne(id);
    if (!reservationService) {
      throw new NotFoundException(
        CommonExceptionMessages.itemNotFound('reservation service', id),
      );
    }
    return reservationService;
  }

  create(
    item: CreateReservationConfigurationDto,
  ): Promise<IReservationConfiguration> {
    const reservationService = this.repository.create(item);
    return this.repository.save(reservationService);
  }

  async update(
    id: number,
    item: UpdateReservationConfigurationDto,
  ): Promise<IReservationConfiguration> {
    const reservationService = await this.repository.preload({
      id,
      ...item,
    });
    if (!reservationService) {
      throw new NotFoundException(
        CommonExceptionMessages.itemNotFound('reservation service', id),
      );
    }
    return this.repository.save(reservationService);
  }

  async delete(id: number): Promise<IReservationConfiguration> {
    const reservationService = await this.getOne(id);
    return this.repository.remove(reservationService);
  }

  async getByRestaurantId(id: number): Promise<IReservationConfiguration> {
    return this.repository.findOne({
      where: { restaurantId: id },
    });
  }
}
