import { FastifyInstance } from 'fastify';
import categoryRoutes from './category.routes';
import shopRoutes from './shop.routes';
import shopAddressRoutes from './shopAddress.routes';
import giftRoutes from './gift.routes';
import giftImageRoutes from './giftImage.routes';
import giftReviewRoutes from './giftReview.routes';
import giftSpecificationRoutes from './giftSpecification.routes';
import giftVariantRoutes from './giftVariant.routes';
import orderRoutes from './order.routes';
import orderGroupRoutes from './orderGroup.routes';
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
  await fastify.register(shopAddressRoutes, { prefix: '/shop-addresses' });
  await fastify.register(giftRoutes, { prefix: '/gifts' });
  await fastify.register(giftImageRoutes, { prefix: '/gift-images' });
  await fastify.register(giftReviewRoutes, { prefix: '/gift-reviews' });
  await fastify.register(giftSpecificationRoutes, { prefix: '/gift-specifications' });
  await fastify.register(giftVariantRoutes, { prefix: '/gift-variants' });
  await fastify.register(orderRoutes, { prefix: '/orders' });
  await fastify.register(orderGroupRoutes, { prefix: '/order-groups' });
}
