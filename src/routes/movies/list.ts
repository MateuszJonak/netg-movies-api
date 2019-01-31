import { getRepository } from 'typeorm';
import * as schemas from '~/schemas';
import { Movie } from '../../entities/Movie';
import { FastifyRequestHandler } from '../../types/fastify';

export const schema = {
  summary: 'List all movies',
  response: {
    200: {
      description: 'Array of all movies',
      type: 'array',
      items: schemas.listedMovie,
    },
    default: schemas.defaultError,
  },
  security: [
    {
      basicAuth: [],
    },
  ],
};

export const handler = (): FastifyRequestHandler => async (
  request,
  response,
) => {
  try {
    return await getRepository(Movie).find({
      relations: ['omdb', 'omdb.ratings'],
    });
  } catch (exception) {
    request.log.error(exception);
    throw new Error();
  }
};
