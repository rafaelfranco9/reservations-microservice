import {
  CreateRestaurantDto,
  IRestaurantService,
  RestaurantService,
  UpdateRestaurantDto,
} from '@domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantService)
    private readonly restaurantService: IRestaurantService,
  ) {}

  @Get()
  getAll() {
    return this.restaurantService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.restaurantService.getOne(+id);
  }

  @Get(':id/reservations')
  getReservations(@Param('id') id: string) {
    return this.restaurantService.getAllReservations(+id);
  }

  @Get(':id/reservations/:date')
  getReservationsByDate(@Param('id') id: string, @Param('date') date: string) {
    return this.restaurantService.getAllReservationsByDate(+id, date);
  }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(+id, updateRestaurantDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.restaurantService.delete(+id);
  }
}
