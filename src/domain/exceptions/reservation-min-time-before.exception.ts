import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationMinTimeBeforeException extends HttpException {
  constructor() {
    super(
      'Reservation time invalid. You should made a reservation at least 2 hours before',
      HttpStatus.FORBIDDEN,
    );
  }
}
