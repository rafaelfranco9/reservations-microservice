import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationAreaException extends HttpException {
  constructor() {
    super('The provided areaId is not valid', HttpStatus.FORBIDDEN);
  }
}
