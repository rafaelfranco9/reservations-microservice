import {
  CreateReservationDto,
  IReservationService,
  ReservationService,
  UpdateReservationDto,
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
  UsePipes,
} from '@nestjs/common';
import { ReservationValidationPipe } from '../pipes/reservation-validation.pipe';

@Controller('reservation')
export class ReservationController {
  constructor(
    @Inject(ReservationService)
    private readonly reservationRepository: IReservationService,
  ) {}

  @Get()
  getAll() {
    return this.reservationRepository.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.reservationRepository.getOne(+id);
  }

  @Post()
  create(
    @Body(ReservationValidationPipe) createReservationDto: CreateReservationDto,
  ) {
    return this.reservationRepository.create(createReservationDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationRepository.update(+id, updateReservationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservationRepository.delete(+id);
  }
}
