import { FastifyInstance } from 'fastify';
import categoryRoutes from './category.routes';
import shopRoutes from './shop.routes';
import giftRoutes from './gift.routes';
import orderRoutes from './order.routes';
import { healthCheckSchema } from '../../schemas/system.schema';

export default async function routesV1(fastify: FastifyInstance) {
  // Health check endpoint
  fastify.get('/health', {
    schema: healthCheckSchema,
  }, async (request, reply) => {
    return { 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      service: 'Kenangan Commerce API',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };
  });

  // API Routes
  await fastify.register(categoryRoutes, { prefix: '/categories' });
  await fastify.register(shopRoutes, { prefix: '/shops' });
  await fastify.register(giftRoutes, { prefix: '/gifts' });
  await fastify.register(orderRoutes, { prefix: '/orders' });
}
