import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationConfigurationTimeframeException extends HttpException {
  constructor() {
    super(
      "The provided timeframe for the configuration is invalid. 'from hour' should be before 'to hour' and the they should have a difference > average meal duration",
      HttpStatus.FORBIDDEN,
    );
  }
}
