import { getRepository } from 'typeorm';
import { Movie } from '../../entities/Movie';
import { FastifyRequestHandler } from '../../types/fastify';

export const handler = (): FastifyRequestHandler => async (
  request,
  response,
) => {
  try {
    const movieId = request.params.movieId;
    const movie = await getRepository(Movie).findOne(movieId, {
      relations: ['comments'],
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
