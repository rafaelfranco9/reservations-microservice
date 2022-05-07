import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '@database';
import { ReservationService } from '@domain';
import { ReservationRepository } from '@repositories';
import { ReservationController } from '@application';
import { RestaurantModule } from './restaurant.module';
import { ReservationConfigurationModule } from './reservation-configuration.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    forwardRef(() => RestaurantModule),
    ReservationConfigurationModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationRepository, ReservationService],
  exports: [ReservationRepository, ReservationService],
})
export class ReservationModule {}
