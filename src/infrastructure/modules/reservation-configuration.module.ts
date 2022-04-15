import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationConfigurationController } from '@application';
import { ReservationConfiguration } from '@database';
import { ReservationConfigurationService } from '@domain';
import { ReservationConfigurationRepository } from '@repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationConfiguration])],
  controllers: [ReservationConfigurationController],
  providers: [
    ReservationConfigurationRepository,
    ReservationConfigurationService,
  ],
})
export class ReservationConfigurationModule {}
