import {
  CreateReservationServiceDto,
  IReservationServiceService,
  ReservationServiceService,
  UpdateReservationServiceDto,
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

@Controller('reservation')
export class ReservationServiceController {
  constructor(
    @Inject(ReservationServiceService)
    private readonly reservationService: IReservationServiceService,
  ) {}

  @Get()
  getAll() {
    return this.reservationService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.reservationService.getOne(+id);
  }

  @Post()
  createReservation(
    @Body() createReservationServiceDto: CreateReservationServiceDto,
  ) {
    return this.reservationService.create(createReservationServiceDto);
  }

  @Put(':id')
  updateReservation(
    @Param('id') id: string,
    @Body() updateReservationServiceDto: UpdateReservationServiceDto,
  ) {
    return this.reservationService.update(+id, updateReservationServiceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationService.delete(+id);
  }
}
