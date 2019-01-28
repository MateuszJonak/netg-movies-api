import {
  DefaultBody,
  DefaultHeaders,
  DefaultParams,
  DefaultQuery,
  FastifyInstance,
  FastifyRequest,
  Middleware,
  RegisterOptions,
  RequestHandler,
} from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type FastifyRegisterCallback = (error?: Error) => void;
export type FastifyRegisterOptions = RegisterOptions<
  Server,
  IncomingMessage,
  ServerResponse
>;
export type FastifyRequestHandler<T = DefaultBody> = RequestHandler<
  IncomingMessage,
  ServerResponse,
  DefaultQuery,
  DefaultParams,
  DefaultHeaders,
  T
>;

export type FastifyRequest<T = DefaultBody> = FastifyRequest<
  IncomingMessage,
  DefaultQuery,
  DefaultParams,
  DefaultHeaders,
  T
>;

export type FastifyPlugin = (
  app: FastifyInstance,
  options: FastifyRegisterOptions,
  next: FastifyRegisterCallback,
) => void;

export type FastifyMiddleware = Middleware<
  Server,
  IncomingMessage,
  ServerResponse
>;
