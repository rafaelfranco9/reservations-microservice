import { ReservationServiceController } from '@application';
import { ReservationService } from '@database';
import { ReservationServiceService } from '@domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationServiceRepository } from '@repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationService])],
  controllers: [ReservationServiceController],
  providers: [ReservationServiceRepository, ReservationServiceService],
})
export class ReservationServiceModule {}
