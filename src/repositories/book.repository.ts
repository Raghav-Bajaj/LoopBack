import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {Many2ManyDataSource} from '../datasources';
import {Book, BookRelations, Language, Library} from '../models';
import {LibraryRepository} from './library.repository';
import {LanguageRepository} from './language.repository';

export class BookRepository extends DefaultCrudRepository<
  Book,
  typeof Book.prototype.id,
  BookRelations
> {

  public readonly languages: HasManyThroughRepositoryFactory<Language, typeof Language.prototype.id,
          Library,
          typeof Book.prototype.id
        >;

  constructor(
    @inject('datasources.many2many') dataSource: Many2ManyDataSource, @repository.getter('LibraryRepository') protected libraryRepositoryGetter: Getter<LibraryRepository>, @repository.getter('LanguageRepository') protected languageRepositoryGetter: Getter<LanguageRepository>,
  ) {
    super(Book, dataSource);
    this.languages = this.createHasManyThroughRepositoryFactoryFor('languages', languageRepositoryGetter, libraryRepositoryGetter,);
    this.registerInclusionResolver('languages', this.languages.inclusionResolver);
  }
}
