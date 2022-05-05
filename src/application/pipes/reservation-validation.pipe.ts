import {
  CreateReservationDto,
  IReservationService,
  ReservationService,
  ReservationSlotException,
} from '@domain';
import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ReservationValidationPipe implements PipeTransform {
  constructor(
    @Inject(ReservationService)
    private readonly reservationService: IReservationService,
  ) {}

  async transform(value: CreateReservationDto, metadata: ArgumentMetadata) {
    const validReservation =
      await this.reservationService.validIncomingReservation(value);
    if (validReservation) return value;
  }
}
