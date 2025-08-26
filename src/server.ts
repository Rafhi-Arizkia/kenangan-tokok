import fastify from "fastify";
import { sequelize } from "./models";
import { registerSwagger } from "./plugins/swagger";
import { registerScalar } from "./plugins/scalar.plugin";
import routesV1 from "./routes/v1/index.routes";

const server = fastify({
  logger: true,
});

const startServer = async () => {
  try {

    // Register swagger dan routes dalam shared context
    await server.register(async function sharedContext(fastifyInstance) {
      // Daftar swagger langsung dalam context ini
      await fastifyInstance.register(require('@fastify/swagger'), {
        openapi: {
          info: {
            title: 'Kenangan Commerce API',
            description: 'Commerce API for Kenangan platform',
            version: '1.0.0',
          },
          tags: [
            { name: 'System', description: 'System endpoints' },
            { name: 'Category', description: 'Category endpoints' },
            { name: 'Shop', description: 'Shop endpoints' },
            { name: 'Gift', description: 'Gift endpoints' },
            { name: 'Order', description: 'Order endpoints' },
          ],
        },
        hideUntagged: false,
        exposeRoute: true,
      });
      
      // Daftar routes dalam context yang sama
      await fastifyInstance.register(routesV1, { prefix: '/v1' });
      
      // Tambahkan endpoint OpenAPI dalam context yang sama
      fastifyInstance.get('/openapi.json', async (request, reply) => {
        return fastifyInstance.swagger();
      });
    });
    
    await server.register(registerScalar);
  } catch (error: any) {
    server.log.error(
      "Failed to register plugins/routes:",
      error.message || error
    );
    throw error;
  }
};

const start = async () => {
  try {
    await startServer();

    // Authenticate database
    await sequelize.authenticate();

    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || "0.0.0.0";
    await server.listen({ port, host });
    const displayHost = host === "0.0.0.0" ? "localhost" : host;
    console.log(`Server listening at http://${displayHost}:${port}`);
    console.log(`API Docs (Scalar) at http://${displayHost}:${port}/scalar`);
    console.log(`OpenAPI spec at http://${displayHost}:${port}/openapi.json`);
  } catch (err: any) {
    console.error(err);
    process.exit(1);
  }
};

start();
