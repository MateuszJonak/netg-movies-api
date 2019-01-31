import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Movie } from '~/entities/Movie';
import * as schemas from '~/schemas';
import { FastifyRequestHandler } from '~/types/fastify';
import { convertValidationErrors } from '~/validators/utils';
import { getData as getDataOMDb } from '../../services/omdb';
import { ICreateBody } from './index';

export const schema = {
  summary: 'Create a movie',
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
      },
    },
    required: ['title'],
  },
  response: {
    201: {
      description: 'Successful response',
      ...schemas.createdMovie,
    },
    400: {
      ...schemas.defaultError,
      description: 'Invalid input',
    },
    default: schemas.defaultError,
  },
  security: [
    {
      basicAuth: [],
    },
  ],
};

export const handler = (): FastifyRequestHandler<ICreateBody> => async (
  request,
  response,
) => {
  try {
    const omdb = await getDataOMDb(request.body.title);
    const repository = getRepository(Movie);
    const movie = repository.create({
      ...request.body,
      omdb,
    });
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
