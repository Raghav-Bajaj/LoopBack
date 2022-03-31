import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Many2ManyDataSource} from '../datasources';
import {Library, LibraryRelations} from '../models';

export class LibraryRepository extends DefaultCrudRepository<
  Library,
  typeof Library.prototype.id,
  LibraryRelations
> {
  constructor(
    @inject('datasources.many2many') dataSource: Many2ManyDataSource,
  ) {
    super(Library, dataSource);
  }
}
