import { AbstractHandler } from './abstract-handler.abstract';

export class ChainInitializer<T> extends AbstractHandler<T> {
  public handle(request: T): T {
    return super.handle(request);
  }
}
