import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationDateException extends HttpException {
  constructor() {
    super('The provided date is invalid', HttpStatus.BAD_REQUEST);
  }
}
export class ReservationDateSoFarException extends HttpException {
  constructor() {
    super(
      'The provided date is so far, it should be less than 60 days',
      HttpStatus.BAD_REQUEST,
    );
  }
}
