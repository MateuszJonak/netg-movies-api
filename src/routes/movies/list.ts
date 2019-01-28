import { FastifyRequestHandler } from '../../types/fastify';

import { getRepository } from 'typeorm';
import { Movie } from '../../entities/Movie';

export const handler = (): FastifyRequestHandler => async (
  request,
  response,
) => {
  try {
    return await getRepository(Movie).find();
  } catch (exception) {
    request.log.error(exception);
    throw new Error();
  }
};
