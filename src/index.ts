import '@babel/polyfill';
import cors from 'cors';
import fastify from 'fastify';
import fastifyAuth from 'fastify-auth';
import fastifySwagger from 'fastify-swagger';
import 'make-promises-safe';
import { env } from './config';
import db from './db';
import basicAuthMiddleware from './middlewares/basicAuth';
import comments from './routes/comments';
import movies from './routes/movies';
import { IFastifyInstanceDecorated, Middleware } from './types/fastify';

const app = fastify({
  logger: {
    level: env.isTest ? 'silent' : env.LOGGER_LEVEL,
  },
}) as IFastifyInstanceDecorated;

app.decorate('basicAuth', basicAuthMiddleware);

(async () => {
  await db();
  app.use(cors() as Middleware);

  app.log.debug('Registering plugins');
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Movie API',
        version: '0.1.0',
      },
      securityDefinitions: {
        BasicAuth: {
          type: 'basic',
          name: 'basicAuth',
        },
      },
    },
    routePrefix: '/docs',
    exposeRoute: true,
  });
  app.register(fastifyAuth);
  app.register(movies());
  app.register(comments());

  await app.ready();

  app.log.debug('Starting server');
  await app.listen(env.PORT, env.HOST);
})().catch(error => {
  app.log.fatal(error);
  setImmediate(() => process.exit(1));
});
