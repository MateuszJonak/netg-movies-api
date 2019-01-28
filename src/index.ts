import '@babel/polyfill';
import fastify from 'fastify';
import 'make-promises-safe';
import { env } from './config';

const app = fastify({
  logger: {
    level: env.isTest ? 'silent' : env.LOGGER_LEVEL,
  },
});

(async () => {
  app.log.debug('Registering plugins');

  await app.ready();

  app.log.debug('Starting server');
  await app.listen(env.SERVER_PORT, env.SERVER_HOST);
})().catch(error => {
  app.log.fatal(error);
  setImmediate(() => process.exit(1));
});
