import { HttpException, HttpStatus } from '@nestjs/common';

export class RestaurantOperationHoursException extends HttpException {
  constructor(timeOverflow = false) {
    super(
      timeOverflow
        ? 'The provided close hour has day overflow, so the close time should be before or equal the open time'
        : 'The provided close hour should be after the open time and bigger than the average meal duration ',
      HttpStatus.BAD_REQUEST,
    );
  }
}
