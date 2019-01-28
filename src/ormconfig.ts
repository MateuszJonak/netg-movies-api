import { ConnectionOptions } from 'typeorm';
import { env } from './config';

const connectionOptions: ConnectionOptions = {
  database: env.MYSQL_URL.split('/').pop(),
  entities: [__dirname + '/entities/*.{ts,js}'],
  synchronize: true,
  type: 'mysql',
  url: env.MYSQL_URL,
};

export default connectionOptions;
