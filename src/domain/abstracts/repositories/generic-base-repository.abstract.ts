export abstract class IGenericBaseRepository<T, C, U> {
  abstract getAll(): Promise<T[]>;
  abstract getOne(id: number): Promise<T>;
  abstract create(item: C): Promise<T>;
  abstract update(id: number, item: U): Promise<T>;
  abstract delete(id: number): Promise<T>;
}
