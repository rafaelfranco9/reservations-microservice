import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationPartySizeException extends HttpException {
  constructor() {
    super('Invalid party size for the provided table', HttpStatus.FORBIDDEN);
  }
}
