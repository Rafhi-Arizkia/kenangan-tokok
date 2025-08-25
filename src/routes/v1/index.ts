import { FastifyInstance } from 'fastify';
import shopRoutes from './shop.routes';
import giftRoutes from './gift.routes';
import orderRoutes from './order.routes';

export default async function routes(fastify: FastifyInstance) {
  // Health check endpoint
  fastify.get('/health', async (request, reply) => {
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'Kenangan Commerce API',
      version: '1.0.0'
    };
  });

  // API Routes
  await fastify.register(shopRoutes, { prefix: '/v1/shops' });
  await fastify.register(giftRoutes, { prefix: '/v1/gifts' });
  await fastify.register(orderRoutes, { prefix: '/v1/orders' });
}
