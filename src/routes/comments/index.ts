import { FastifyPlugin } from '~/types/fastify';
import { handler as createHandler } from './create';
import { handler as listHandler } from './list';

export default (): FastifyPlugin => (app, options, next) => {
  app.addHook('preHandler', app.auth([app.basicAuth]));

  app.post('/comments', createHandler());
  app.get('/comments', listHandler());

  next();
};
