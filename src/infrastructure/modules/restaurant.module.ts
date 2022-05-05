import { RestaurantController } from '@application';
import { Area, Restaurant, Tables } from '@database';
import { RestaurantService } from '@domain';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRepository } from '@repositories';
import { ReservationModule } from './reservation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Restaurant, Area, Tables]),
    forwardRef(() => ReservationModule),
  ],
  controllers: [RestaurantController],
  providers: [RestaurantRepository, RestaurantService],
  exports: [RestaurantRepository, RestaurantService],
})
export class RestaurantModule {}
