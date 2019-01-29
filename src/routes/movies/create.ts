import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Movie } from '~/entities/Movie';
import { FastifyRequestHandler } from '~/types/fastify';
import { convertValidationErrors } from '~/validators/utils';

export const handler = (): FastifyRequestHandler => async (
  request,
  response,
) => {
  try {
    const repository = getRepository(Movie);
    const movie = repository.create(request.body);
    const errors = await validate(movie);
    if (errors.length > 0) {
      response.code(400);

      return new Error(convertValidationErrors(errors));
    }

    const savedMovie = await repository.save(movie);
    response.code(201);

    return savedMovie;
  } catch (error) {
    request.log.error(error);
    throw error;
  }
};
