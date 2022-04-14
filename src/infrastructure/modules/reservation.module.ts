import { Reservation } from '@database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [],
  providers: [],
})
export class ReservationModule {}
