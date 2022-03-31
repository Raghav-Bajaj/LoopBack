import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Library} from '../models';
import {LibraryRepository} from '../repositories';

export class LibraryController {
  constructor(
    @repository(LibraryRepository)
    public libraryRepository : LibraryRepository,
  ) {}

  @post('/libraries')
  @response(200, {
    description: 'Library model instance',
    content: {'application/json': {schema: getModelSchemaRef(Library)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Library, {
            title: 'NewLibrary',
            
          }),
        },
      },
    })
    library: Library,
  ): Promise<Library> {
    return this.libraryRepository.create(library);
  }

  @get('/libraries/count')
  @response(200, {
    description: 'Library model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Library) where?: Where<Library>,
  ): Promise<Count> {
    return this.libraryRepository.count(where);
  }

  @get('/libraries')
  @response(200, {
    description: 'Array of Library model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Library, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Library) filter?: Filter<Library>,
  ): Promise<Library[]> {
    return this.libraryRepository.find(filter);
  }

  @patch('/libraries')
  @response(200, {
    description: 'Library PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Library, {partial: true}),
        },
      },
    })
    library: Library,
    @param.where(Library) where?: Where<Library>,
  ): Promise<Count> {
    return this.libraryRepository.updateAll(library, where);
  }

  @get('/libraries/{id}')
  @response(200, {
    description: 'Library model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Library, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Library, {exclude: 'where'}) filter?: FilterExcludingWhere<Library>
  ): Promise<Library> {
    return this.libraryRepository.findById(id, filter);
  }

  @patch('/libraries/{id}')
  @response(204, {
    description: 'Library PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Library, {partial: true}),
        },
      },
    })
    library: Library,
  ): Promise<void> {
    await this.libraryRepository.updateById(id, library);
  }

  @put('/libraries/{id}')
  @response(204, {
    description: 'Library PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() library: Library,
  ): Promise<void> {
    await this.libraryRepository.replaceById(id, library);
  }

  @del('/libraries/{id}')
  @response(204, {
    description: 'Library DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.libraryRepository.deleteById(id);
  }
}
