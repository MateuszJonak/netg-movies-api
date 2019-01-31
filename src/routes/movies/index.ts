import { FastifyPlugin } from '~/types/fastify';
import * as create from './create';
import * as list from './list';
import * as show from './show';

export interface ICreateBody {
  title: string;
}

export default (): FastifyPlugin => (app, options, next) => {
  app.addHook('preHandler', app.auth([app.basicAuth]));

  app.post('/movies', { schema: create.schema }, create.handler());
  app.get('/movies', { schema: list.schema }, list.handler());
  app.get('/movies/:movieId', { schema: show.schema }, show.handler());

  next();
};
