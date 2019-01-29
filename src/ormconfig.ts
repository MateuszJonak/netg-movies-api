import { ConnectionOptions } from 'typeorm';
import { env } from './config';

const connectionOptions: ConnectionOptions = {
  entities: [__dirname + '/entities/*.{ts,js}'],
  synchronize: true,
  type: 'postgres',
  url: env.DATABASE_URL,
};

export default connectionOptions;
