// import {notifyDiscord} from './discord_webhook';
import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';

export default async function KenanganOnResponse(
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  payload: unknown,
) {
   (reply as any).payload = payload; 
  // @ts-expect-error Need to create custom FastifyRequest that have noLogPrint
  if (request.noLogPrint) {
    return;
  }

  const prettyEnabled = process.env.NODE_ENV !== 'production';

  if (reply.statusCode >= 200 && reply.statusCode < 300) {
    printSuccessLog(fastify, request, reply, prettyEnabled);
    return;
  }

  printErrorLog(fastify, request, reply, prettyEnabled);

  const errorData = generateErrorData(request, payload);
  if (prettyEnabled) {
    fastify.log.debug(errorData);
  } else {
    fastify.log.error(errorData);
  }

  // @ts-expect-error Need to create custom FastifyRequest that have noLog
  if (request.noLog) {
    return;
  }

  // notifyDiscord({request, reply, errorData});
}

function printSuccessLog(
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  prettyEnabled: boolean,
) {
  // safe request id handling
  const rawId = typeof request.id === 'string' ? request.id : String(request.id ?? '-');
  const id = rawId.toUpperCase();

  const time = (reply as any).elapsedTime ?? (typeof (reply as any).getResponseTime === 'function'
    ? (reply as any).getResponseTime()
    : '-');

  const structured = {
    type: 'response',
    statusCode: reply.statusCode,
    req: { id, method: request.method, url: request.url },
    time,
  };

  if (prettyEnabled) {
    // print pretty block to stdout and keep structured at debug level
    const pretty = [
      `TYPE    : Response ${reply.statusCode} - ✅`,
      `ID      : ${id}`,
      `METHOD  : ${request.method}`,
      `URL     : ${request.url}`,
      `TIME    : ${time}`,
      '',
    ].join('\n');
    // eslint-disable-next-line no-console
    console.log(pretty);
  } else {
    fastify.log.info(structured, 'response');
  }
}

function printErrorLog(
  fastify: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  prettyEnabled: boolean,
) {

  const payload = (reply as any).payload;
  const errorMessage =
    (reply as any).error?.message ||
    (reply.statusCode >= 400 && (payload?.message || payload?.data));

  const rawId = typeof request.id === 'string' ? request.id : String(request.id ?? '-');
  const id = rawId.toUpperCase();

  const time = (reply as any).elapsedTime ?? (typeof (reply as any).getResponseTime === 'function'
    ? (reply as any).getResponseTime()
    : '-');

  const structured = {
    type: 'response',
    statusCode: reply.statusCode,
    req: { id, method: request.method, url: request.url },
    time,
    error: errorMessage || 'Unknown error',
  };

  if (prettyEnabled) {
    const pretty = [
      `TYPE    : Response ${reply.statusCode} - ❌`,
      `ID      : ${id}`,
      `METHOD  : ${request.method}`,
      `URL     : ${request.url}`,
      `TIME    : ${time}`,
      `ERROR   : ${errorMessage || 'Unknown error'}`,
      '',
    ].join('\n');
    // eslint-disable-next-line no-console
    console.log(pretty);
  } else {
    fastify.log.error(structured, 'response error');
  }
}

function generateErrorData(
  request: FastifyRequest & {
    user?: { id: string, username: string, email: string, name: string }
  },
  payload: unknown
): { request: unknown, response: unknown } {
  const safeBody = (() => {
    try {
      return request.body ? JSON.parse(JSON.stringify(request.body)) : {};
    } catch (e) {
      return {};
    }
  })();

  const errorData = {
    request: {
      method: request.method,
      url: request.url,
      user: {
        id: request.user?.id,
        username: request.user?.username,
        email: request.user?.email,
        name: request.user?.name,
        token: request.headers.authorization,
      },
      body: safeBody,
      routerMethod: (request as any).routeOptions?.method,
      routerPath: (request as any).routeOptions?.url,
    },
    response: payload,
  };

  const containedPasswordKey = Object.keys(errorData.request.body || {}).filter((k) =>
    k.includes('password')
  );
  containedPasswordKey.forEach((k) => {
    (errorData.request.body as any)[k] = null;
  });

  return errorData;
}
