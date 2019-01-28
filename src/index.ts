import '@babel/polyfill';
import cors from 'cors';
import fastify from 'fastify';
import 'make-promises-safe';
import { env } from './config';
import db from './db';
import movies from './routes/movies';
import { FastifyMiddleware } from './types/fastify';

const app = fastify({
  logger: {
    level: env.isTest ? 'silent' : env.LOGGER_LEVEL,
  },
});

(async () => {
  // TODO: do on the same time
  await db();
  app.use(cors() as FastifyMiddleware);

  app.log.debug('Registering plugins');
  app.register(movies());

  await app.ready();

  app.log.debug('Starting server');
  await app.listen(env.SERVER_PORT, env.SERVER_HOST);
})().catch(error => {
  app.log.fatal(error);
  setImmediate(() => process.exit(1));
});
