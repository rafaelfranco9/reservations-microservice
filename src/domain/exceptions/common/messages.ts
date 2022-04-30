export class CommonExceptionMessages {
  static itemNotFound(entity: string, id: number): string {
    return `${entity.toUpperCase()} with id ${id} was not found`;
  }
}
