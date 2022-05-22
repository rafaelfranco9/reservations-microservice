import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationConfigurationWeekdaysException extends HttpException {
  constructor() {
    super(
      'The reservation configuration need to have at least one active weekday',
      HttpStatus.BAD_REQUEST,
    );
  }
}
