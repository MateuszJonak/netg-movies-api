import {
  DefaultBody,
  DefaultHeaders,
  DefaultParams,
  DefaultQuery,
  FastifyInstance,
  FastifyMiddleware,
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

export type Plugin<T> = (
  instance: IFastifyInstanceDecorated,
  opts: T,
  callback: (err?: Error) => void,
) => void;

export type FastifyPlugin = Plugin<FastifyRegisterOptions>;

export type Middleware = Middleware<Server, IncomingMessage, ServerResponse>;

type CustomFastifyMiddleware = FastifyMiddleware<
  Server,
  IncomingMessage,
  ServerResponse
>;
export type FastifyMiddleware = CustomFastifyMiddleware;

export interface IFastifyInstanceDecorated extends FastifyInstance {
  auth: (middlewares: CustomFastifyMiddleware[]) => CustomFastifyMiddleware;
  basicAuth: CustomFastifyMiddleware;
  register<T extends FastifyRegisterOptions>(
    plugin: Plugin<T>,
    opts?: T,
  ): IFastifyInstanceDecorated;
}
