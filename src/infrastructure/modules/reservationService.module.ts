import { ReservationServiceController } from '@application';
import { ReservationService } from '@database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationServiceRepository } from '../repositories/reservation-service.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationService])],
  controllers: [ReservationServiceController],
  providers: [ReservationServiceRepository],
})
export class ReservationServiceModule {}
