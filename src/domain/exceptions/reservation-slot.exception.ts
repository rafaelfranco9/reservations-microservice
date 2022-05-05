import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationSlotException extends HttpException {
  constructor() {
    super(
      'The reservation slot provided is not more valid, please try another hour',
      HttpStatus.FORBIDDEN,
    );
  }
}
