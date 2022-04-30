import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '@database';
import { ReservationService } from '@domain';
import { ReservationRepository } from '@repositories';
import { ReservationController } from '@application';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReservationController],
  providers: [ReservationRepository, ReservationService],
  exports: [ReservationRepository],
})
export class ReservationModule {}
