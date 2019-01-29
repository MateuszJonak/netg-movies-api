import { cleanEnv, host, port, str } from 'envalid';

export const env = cleanEnv(
  process.env,
  {
    BASIC_AUTH_PASSWORD: str(),
    BASIC_AUTH_USERNAME: str(),
    DATABASE_URL: str(),
    HOST: host({ default: '0.0.0.0' }),
    LOGGER_LEVEL: str({
      choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      default: 'fatal',
    }),
    PORT: port({ default: 3000 }),
  },
  { strict: true },
);
