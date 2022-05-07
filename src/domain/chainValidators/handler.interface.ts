export interface IHandler<T> {
  setNext(handler: IHandler<T>): IHandler<T>;
  handle(request: T): T;
}
