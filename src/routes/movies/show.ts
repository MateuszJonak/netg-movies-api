import { getRepository } from 'typeorm';
import * as schemas from '~/schemas';
import { Movie } from '../../entities/Movie';
import { FastifyRequestHandler } from '../../types/fastify';

export const schema = {
  summary: 'Info for a specific movie',
  params: {
    type: 'object',
    properties: {
      movieId: { type: 'string' },
    },
  },
  response: {
    200: {
      description: 'Expected response to a valid request',
      ...schemas.showedmovie,
    },
    '404': {
      ...schemas.defaultError,
      description: 'Movie not found',
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
    const movieId = request.params.movieId;
    const movie = await getRepository(Movie).findOne(movieId, {
      relations: ['comments', 'omdb', 'omdb.ratings'],
    });

    if (!movie) {
      return response.code(404);
    }

    return movie;
  } catch (exception) {
    request.log.error(exception);
    throw new Error();
  }
};
