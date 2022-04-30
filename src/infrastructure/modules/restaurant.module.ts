import { RestaurantController } from '@application';
import { Area, Restaurant, Tables } from '@database';
import { RestaurantService } from '@domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from '@repositories';
import { ReservationModule } from './reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Area, Tables]),
    ReservationModule,
  ],
  controllers: [RestaurantController],
  providers: [RestaurantRepository, RestaurantService],
})
export class RestaurantModule {}
