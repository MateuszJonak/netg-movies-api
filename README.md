# Movies API

## Quick local setup

1. Clone project
3. Copy `.env.dist` to `.env` file and set a environment variables (for more information look to **Environments** section)
2. Run `npm install` or `yarn` command to install all dependencies
4. Run `npm run build` or `yarn build` command to build application
5. Run `npm run start` or `yarn start` command to launch the server. 


## Authentication

Every API route is authenticated with "Basic Auth". Password and username is provided by environment variables: *BASIC_AUTH_PASSWORD* and *BASIC_AUTH_USERNAME*.

## Documentation

Documentation for REST API is served by **swagger-ui** on `/docs` route.

## Environments

The application should be run with a several environment variables. They can be provided by `.env` file or execution command. Below I describe every of them:
* **BASIC_AUTH_PASSWORD** (required) - password to basic authentication<br>
* **BASIC_AUTH_USERNAME** (required) - username to basic authentication<br>
* **DATABASE_URL** (required) - url to postgres database for example: `postgres://user:password@host:port/db_name`<br>
* **OMDB_API_KEY** (required) - api key to connect with omdb service<br>
* **HOST** (default: '0.0.0.0') - Host on which application should be served<br>
* **LOGGER_LEVEL** (default: 'fatal') - the minimum logging level. It can be one of presented values: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']<br>
* **PORT** (default: 3000) - Port on which application should be served

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run watch`

Launch application in watch mode which means that every changes rebuild files and start for new.

### `npm run start`

Run the application from the built files.

### `npm run lint`

Run linter for checking files.

### `npm run lint:fix`

Run linter for checking files and fix them automatically.

### `npm run check-types`

Run typescript cli to check types in all files.

### `npm run check-types:watch`

Run typescript cli to check types in all files with watch mode.

### `npm run test:unit`

Launches the test unit runner.

### `npm run test:watch`

Launches the test runner in the interactive watch mode.
