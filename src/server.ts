import fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { sequelize } from "./database/connection";
// Import models index to initialize all models and associations
import "./models";
import { registerScalar } from "./plugins/scalar.plugin";
import routesV1 from "./routes/v1/index.routes";
import 'dotenv/config';

const server = fastify({
  logger: true,
});

const registerPluginAndRouting = async (fastifyInstance: typeof server) => {
  try {
  // Register swagger dan routes dalam shared context
  await fastifyInstance.register(async function sharedContext(fastifyInstance) {
      await fastifyInstance.register(require("@fastify/swagger"), {
        openapi: {
          info: {
            title: "Kenangan Commerce API",
            description: "Commerce API for Kenangan platform",
            version: "1.0.0",
          },
          tags: [
            { name: "System", description: "System endpoints" },
            { name: "Category", description: "Category endpoints" },
            { name: "Shop", description: "Shop endpoints" },
            { name: "Gift", description: "Gift endpoints" },
            { name: "Order", description: "Order endpoints" },
          ],
        },
        hideUntagged: false,
        exposeRoute: true,
      });

      await fastifyInstance.register(routesV1, { prefix: "/v1" });
      fastifyInstance.get("/openapi.json", async (request, reply) => {
        return (fastifyInstance as any).swagger();
      });
    });

    await fastifyInstance.register(registerScalar);
  } catch (error: any) {
    fastifyInstance.log.error(
      "Failed to register plugins/routes:",
      error.message || error
    );
    throw error;
  }
};

const registerSecurity = async (fastifyInstance: typeof server) => {
  await fastifyInstance.register(helmet, {
    contentSecurityPolicy: false,
  });

  await fastifyInstance.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(",") || ["*"],
    credentials: process.env.CORS_CREDENTIALS === "true",
  });

  try {
    const rateLimit = require("@fastify/rate-limit");
    await fastifyInstance.register(rateLimit, {
      global: true,
      max: parseInt(process.env.RATE_LIMIT_MAX || "100"),
      timeWindow: parseInt(process.env.RATE_LIMIT_WINDOW || "60000"), // 1 minute
      errorResponseBuilder: function (request: any, context: any) {
        return {
          success: false,
          message: "Too many requests, please try again later.",
        };
      },
    });
  } catch (err) {
    fastifyInstance.log.info("@fastify/rate-limit not available, skipping rate limiting");
  }

  try {
    const multipart = require('@fastify/multipart');
    await fastifyInstance.register(multipart, {
      limits: {
        fileSize: parseInt(process.env.MAX_UPLOAD_SIZE || '10485760'), // 10MB default
      },
    });
  } catch (err) {
    fastifyInstance.log.info('@fastify/multipart not available, file upload endpoints will fail');
  }
};

const startServer = async () => {
  await registerSecurity(server);
  await registerPluginAndRouting(server);
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
