import { HttpException, HttpStatus } from '@nestjs/common';

export class ReservationAreaOrTableException extends HttpException {
  constructor() {
    super(
      'The provided areaId or tableId are not valids',
      HttpStatus.FORBIDDEN,
    );
  }
}
