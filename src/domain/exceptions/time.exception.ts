import { HttpException, HttpStatus } from '@nestjs/common';

export class TimeFormatException extends HttpException {
  constructor() {
    super('Bad time format', HttpStatus.BAD_REQUEST);
  }
}
