import { FastifySchema } from 'fastify';

// Health Check Schema
export const healthCheckSchema = {
  summary: 'Health check endpoint',
  description: 'Check the health and status of the API service',
  tags: ['System'],
  response: {
    200: {
      type: 'object',
      properties: {
        status: { 
          type: 'string', 
          example: 'OK',
          description: 'Service status' 
        },
        timestamp: { 
          type: 'string', 
          format: 'date-time',
          description: 'Current server timestamp' 
        },
        service: { 
          type: 'string', 
          example: 'Kenangan Commerce API',
          description: 'Service name' 
        },
        version: { 
          type: 'string', 
          example: '1.0.0',
          description: 'API version' 
        },
        uptime: {
          type: 'number',
          description: 'Server uptime in seconds'
        },
        environment: {
          type: 'string',
          description: 'Current environment'
        },
      },
      required: ['status', 'timestamp', 'service', 'version'],
    },
  },
};
