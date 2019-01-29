import { Connection, createConnection } from 'typeorm';
import ormconfig from './ormconfig';

export default async (): Promise<Connection> => {
  return await createConnection(ormconfig);
};
