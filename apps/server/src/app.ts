import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify';

// Builds the Fastify application without starting it, so tests can call it
// with `app.inject()` and no network port.
export function buildApp(options: FastifyServerOptions = {}): FastifyInstance {
  const app = Fastify(options);

  app.get(
    '/api/health',
    {
      schema: {
        response: {
          200: {
            type: 'object',
            properties: { status: { type: 'string', const: 'ok' } },
            required: ['status'],
          },
        },
      },
    },
    async () => ({ status: 'ok' as const }),
  );

  return app;
}
