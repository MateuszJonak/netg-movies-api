import { FastifyPlugin } from '~/types/fastify';
import { handler as createHandler } from './create';
import { handler as listHandler } from './list';
import { handler as showHandler } from './show';

// TODO: Add schema, pagination?
export default (): FastifyPlugin => (app, options, next) => {
  app.addHook('preHandler', app.auth([app.basicAuth]));

  app.post('/movies', createHandler());
  app.get('/movies', listHandler());

  app.get('/movies/:movieId', showHandler());

  next();
};
