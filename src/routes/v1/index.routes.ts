import { FastifyInstance } from 'fastify';
import shopRoutes from './shop.routes';
import giftRoutes from './gift.routes';
import orderRoutes from './order.routes';

export default async function routesV1(fastify: FastifyInstance) {
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
  await fastify.register(shopRoutes, { prefix: '/shops' });
  await fastify.register(giftRoutes, { prefix: '/gifts' });
  await fastify.register(orderRoutes, { prefix: '/orders' });
}
