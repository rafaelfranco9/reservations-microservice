import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationTimeframeException extends HttpException {
  constructor() {
    super(
      'The reservation timeframe provided is invalid',
      HttpStatus.BAD_REQUEST,
    );
  }
}
