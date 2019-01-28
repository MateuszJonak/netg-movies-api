import { cleanEnv, host, port, str } from 'envalid';

export const env = cleanEnv(
  process.env,
  {
    LOGGER_LEVEL: str({
      choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'fatal',
    }),
    MYSQL_URL: str(),
    SERVER_HOST: host({ default: '0.0.0.0' }),
    SERVER_PORT: port({ default: 3000 }),
  },
  { strict: true },
);
