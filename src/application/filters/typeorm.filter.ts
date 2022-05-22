import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError, TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeORMExceptionFilter<T extends TypeORMError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let error;

    if (exception instanceof QueryFailedError) {
      error = exception.driverError?.detail;
    } else {
      error = exception.message;
    }

    response.json({
      status: HttpStatus.FORBIDDEN,
      message: error,
    });
  }
}
