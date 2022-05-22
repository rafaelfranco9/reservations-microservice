import {
  CreateReservationConfigurationDto,
  IReservationConfigurationService,
  ReservationConfigurationService,
  UpdateReservationConfigurationDto,
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
import { ReservationConfigurationValidationPipe } from '../pipes/reservation-configuration-validation.pipe';

@Controller('configuration')
export class ReservationConfigurationController {
  constructor(
    @Inject(ReservationConfigurationService)
    private readonly reservationService: IReservationConfigurationService,
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
    @Body(ReservationConfigurationValidationPipe)
    createReservationServiceDto: CreateReservationConfigurationDto,
  ) {
    return this.reservationService.create(createReservationServiceDto);
  }

  @Put(':id')
  updateReservation(
    @Param('id') id: string,
    @Body() updateReservationServiceDto: UpdateReservationConfigurationDto,
  ) {
    return this.reservationService.update(+id, updateReservationServiceDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationService.delete(+id);
  }
}
