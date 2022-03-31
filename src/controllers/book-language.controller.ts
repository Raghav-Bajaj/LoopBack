import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Book,
Library,
Language,
} from '../models';
import {BookRepository} from '../repositories';

export class BookLanguageController {
  constructor(
    @repository(BookRepository) protected bookRepository: BookRepository,
  ) { }

  @get('/books/{id}/languages', {
    responses: {
      '200': {
        description: 'Array of Book has many Language through Library',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Language)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Language>,
  ): Promise<Language[]> {
    return this.bookRepository.languages(id).find(filter);
  }

  @post('/books/{id}/languages', {
    responses: {
      '200': {
        description: 'create a Language model instance',
        content: {'application/json': {schema: getModelSchemaRef(Language)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Book.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Language, {
            title: 'NewLanguageInBook',
            exclude: ['id'],
          }),
        },
      },
    }) language: Omit<Language, 'id'>,
  ): Promise<Language> {
    return this.bookRepository.languages(id).create(language);
  }

  @patch('/books/{id}/languages', {
    responses: {
      '200': {
        description: 'Book.Language PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Language, {partial: true}),
        },
      },
    })
    language: Partial<Language>,
    @param.query.object('where', getWhereSchemaFor(Language)) where?: Where<Language>,
  ): Promise<Count> {
    return this.bookRepository.languages(id).patch(language, where);
  }

  @del('/books/{id}/languages', {
    responses: {
      '200': {
        description: 'Book.Language DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Language)) where?: Where<Language>,
  ): Promise<Count> {
    return this.bookRepository.languages(id).delete(where);
  }
}
