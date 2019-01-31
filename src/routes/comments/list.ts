import { getRepository } from 'typeorm';
import * as schemas from '~/schemas';
import { Comment } from '../../entities/Comment';
import { FastifyRequestHandler } from '../../types/fastify';

export const schema = {
  summary: 'List all comments',
  response: {
    200: {
      description: 'Array of all comments',
      type: 'array',
      items: schemas.listedComment,
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
    return await getRepository(Comment)
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.movie', 'movie')
      .select(['comment', 'movie.id'])
      .getMany();
  } catch (exception) {
    request.log.error(exception);
    throw new Error();
  }
};
