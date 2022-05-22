//T -> main entity types
//C, U -> create and update dtos
export interface ICrudOperations<T, C, U> {
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T>;
  create(item: C): Promise<T>;
  update(id: number, item: U): Promise<T>;
  delete(id: number): Promise<T>;
}
