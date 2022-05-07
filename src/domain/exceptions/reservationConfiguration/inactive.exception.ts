import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantReservationsInactive extends HttpException {
  constructor() {
    super(
      'Sorry but the restaurant is not accepting reservations at the moment.',
      HttpStatus.FORBIDDEN,
    );
  }
}
