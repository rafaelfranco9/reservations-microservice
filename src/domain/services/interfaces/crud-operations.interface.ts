//T -> main entity types
//D, U -> create and update dtos
export interface ICrudOperations<T, D, U> {
  getAll(): Promise<T[]>;
  getOne(id: number): Promise<T>;
  create(item: D): Promise<T>;
  update(id: number, item: U): Promise<T>;
  delete(id: number): Promise<T>;
}
