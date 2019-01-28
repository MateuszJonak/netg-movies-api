import { validate } from 'class-validator';
import { getRepository } from 'typeorm';
import { Comment } from '~/entities/Comment';
import { FastifyRequestHandler } from '~/types/fastify';
import { convertValidationErrors } from '~/validators/utils';

export const handler = (): FastifyRequestHandler => async (
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
