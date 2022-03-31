import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Many2ManyDataSource} from '../datasources';
import {Language, LanguageRelations} from '../models';

export class LanguageRepository extends DefaultCrudRepository<
  Language,
  typeof Language.prototype.id,
  LanguageRelations
> {
  constructor(
    @inject('datasources.many2many') dataSource: Many2ManyDataSource,
  ) {
    super(Language, dataSource);
  }
}
