import { CreateRestaurantDto, Restaurant } from '@domain';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return createRestaurantDto;
  }
}
