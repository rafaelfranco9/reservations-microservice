import { IHandler } from './handler.interface';

export abstract class AbstractHandler<T> implements IHandler<T> {
  private nextHandler: IHandler<T>;

  setNext(handler: IHandler<T>): IHandler<T> {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: T): T {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return request;
  }
}
