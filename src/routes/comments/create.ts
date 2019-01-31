import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Comment } from '~/entities/Comment';
import * as schemas from '~/schemas';
import { FastifyRequestHandler } from '~/types/fastify';
import { convertValidationErrors } from '~/validators/utils';
import { ICreateBody } from './index';

export const schema = {
  summary: 'Create a comment',
  body: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
      },
      movie: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
    required: ['content', 'movie'],
  },
  response: {
    201: {
      description: 'Successful response',
      ...schemas.createdComment,
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
    const repository = getRepository(Comment);
    const comment = repository.create(request.body);
    const errors = await validate(comment);
    if (errors.length > 0) {
      response.code(400);

      return new Error(convertValidationErrors(errors));
    }

    const savedComment = await repository.save(comment);
    response.code(201);

    return savedComment;
  } catch (error) {
    request.log.error(error);
    throw error;
  }
};
