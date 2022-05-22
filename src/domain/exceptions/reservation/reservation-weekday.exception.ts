import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationWeekdayException extends HttpException {
  constructor(weekdays: string) {
    super(
      `The restaurant does not accept reservations on ${weekdays}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
