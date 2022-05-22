import { HttpException, HttpStatus } from '@nestjs/common';

export class TimeFormatException extends HttpException {
  constructor() {
    super(
      'Bad time format, please check that time is in minutes. eg: 9:30 = 9*60 + 30 = 570',
      HttpStatus.BAD_REQUEST,
    );
  }
}
