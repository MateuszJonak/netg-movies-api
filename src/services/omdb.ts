import { deserialize } from 'serializr';
import { env } from '../config';
import { MovieOMDb } from '../entities/MovieOMDb';
import { fetchJSON } from '../utilities/fetch';

const getQuery = (params: { [key: string]: string }) =>
  Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&');

export const call = async (params: { [key: string]: string }) => {
  const queryParams = getQuery({
    apikey: env.OMDB_API_KEY,
    ...params,
  });
  const url = `http://www.omdbapi.com/?${queryParams}`;
  const data = await fetchJSON(url, { method: 'GET' });

  return data;
};

export const getData = async (title: string) => {
  const response = await call({ t: title, type: 'movie' });
  return deserialize(MovieOMDb, response);
};
