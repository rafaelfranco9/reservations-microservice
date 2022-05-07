import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationTableException extends HttpException {
  constructor() {
    super('The provided tableId is not valid', HttpStatus.FORBIDDEN);
  }
}
