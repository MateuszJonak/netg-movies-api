import { FastifyPlugin } from '~/types/fastify';
import * as create from './create';
import * as list from './list';

export interface ICreateBody {
  content: string;
}

export default (): FastifyPlugin => (app, options, next) => {
  app.addHook('preHandler', app.auth([app.basicAuth]));

  app.post('/comments', { schema: create.schema }, create.handler());
  app.get('/comments', { schema: list.schema }, list.handler());

  next();
};
