import auth, { BasicAuthResult } from 'basic-auth';
import { env } from '~/config';
import { FastifyMiddleware } from '../types/fastify';

const validate = (credentials: BasicAuthResult) =>
  credentials.name === env.BASIC_AUTH_USERNAME &&
  credentials.pass === env.BASIC_AUTH_PASSWORD;

const basicAuthMiddleware: FastifyMiddleware = (request, reply, done) => {
  const credentials = auth(request as any);

  if (!credentials || !validate(credentials)) {
    reply.code(401).header('WWW-Authenticate', 'Basic');
    done(new Error('Access denied'));
  }
  done();
};

export default basicAuthMiddleware;
