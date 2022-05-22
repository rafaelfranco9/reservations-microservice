import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationTableGroupException extends HttpException {
  constructor() {
    super('The provided tableGroupId is not valid', HttpStatus.FORBIDDEN);
  }
}
