import { FastifyPlugin } from '~/types/fastify';
import { handler } from './post';

export default (): FastifyPlugin => (app, options, next) => {
  app.post('/movies', handler());

  next();
};
