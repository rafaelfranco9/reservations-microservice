import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationDateException extends HttpException {
  constructor() {
    super('The provided date is invalid', HttpStatus.BAD_REQUEST);
  }
}
