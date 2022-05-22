import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationConfigurationController } from '@application';
import { ReservationConfiguration } from '@database';
import { ReservationConfigurationService } from '@domain';
import { ReservationConfigurationRepository } from '@repositories';
import { RestaurantModule } from './restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReservationConfiguration]),
    RestaurantModule,
  ],
  controllers: [ReservationConfigurationController],
  providers: [
    ReservationConfigurationRepository,
    ReservationConfigurationService,
  ],
  exports: [
    ReservationConfigurationRepository,
    ReservationConfigurationService,
  ],
})
export class ReservationConfigurationModule {}
