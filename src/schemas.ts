const commentProperties = {
  id: { type: 'number' },
  content: { type: 'string' },
  createdAt: { type: 'string', format: 'date-time' },
  updatedAt: { type: 'string', format: 'date-time' },
};

export const createdComment = {
  type: 'object',
  properties: {
    ...commentProperties,
    movie: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    },
  },
};
export const listedComment = createdComment;

const movieOMDb = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    year: { type: 'string' },
    rated: { type: 'string' },
    released: { type: 'string' },
    runtime: { type: 'string' },
    genre: { type: 'string' },
    director: { type: 'string' },
    writer: { type: 'string' },
    actors: { type: 'string' },
    plot: { type: 'string' },
    language: { type: 'string' },
    country: { type: 'string' },
    awards: { type: 'string' },
    poster: { type: 'string' },
    ratings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          source: { type: 'string' },
          value: { type: 'string' },
        },
      },
    },
    metascore: { type: 'string' },
    imdbRating: { type: 'string' },
    imdbVotes: { type: 'string' },
    imdbID: { type: 'string' },
    type: { type: 'string' },
    dvd: { type: 'string' },
    boxOffice: { type: 'string' },
    website: { type: 'string' },
  },
};

export const createdMovie = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    omdb: movieOMDb,
  },
};

export const listedMovie = createdMovie;

export const showedmovie = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    omdb: movieOMDb,
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: commentProperties,
      },
    },
  },
};

export const defaultError = {
  type: 'object',
  description: 'Unexpected error',
  properties: {
    code: {
      type: 'integer',
      format: 'int32',
    },
    message: {
      type: 'string',
    },
  },
};
