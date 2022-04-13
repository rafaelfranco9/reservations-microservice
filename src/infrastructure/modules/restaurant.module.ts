import { RestaurantController } from '@application';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from '../database/entities/area.entity';
import { Restaurant } from '../database/entities/restaurant.entity';
import { Tables } from '../database/entities/tables.entity';
import { RestaurantRepository } from '../repositories/restaurant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Area, Tables])],
  controllers: [RestaurantController],
  providers: [RestaurantRepository],
})
export class RestaurantModule {}
