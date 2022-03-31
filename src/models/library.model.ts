import {Entity, model, property} from '@loopback/repository';

@model()
export class Library extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  bookId?: number;

  @property({
    type: 'number',
  })
  languageId?: number;

  constructor(data?: Partial<Library>) {
    super(data);
  }
}

export interface LibraryRelations {
  // describe navigational properties here
}

export type LibraryWithRelations = Library & LibraryRelations;
