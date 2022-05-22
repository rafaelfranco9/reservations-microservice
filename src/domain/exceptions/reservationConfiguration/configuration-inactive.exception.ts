import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationConfigurationInactiveException extends HttpException {
  constructor() {
    super(
      'Sorry but the restaurant is not accepting reservations at the moment.',
      HttpStatus.FORBIDDEN,
    );
  }
}
