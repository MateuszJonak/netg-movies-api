import { FastifyRequestHandler } from '../../types/fastify';

import { getRepository } from 'typeorm';
import { Comment } from '../../entities/Comment';

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
