import fastify from "fastify";
import { sequelize } from "./models";
import routes from "./routes/v1";

const server = fastify({
  logger: true,
});

// Register plugins
server.register(require("@fastify/cors"), {
  origin: true,
});

server.register(require("@fastify/helmet"));

// Register routes
server.register(routes);

const start = async () => {
  try {
     await sequelize.sync({ alter: false });
     await sequelize.authenticate();
      console.log("Database connection established successfully.");

      // Initialize associations
      // Associations already initialized in models/index.ts

      // Sync database (development only)
      if (process.env.NODE_ENV !== "production") {
        await sequelize.sync();
      }
      server.log.info("Database synchronized successfully.");

      // Start listening
      const port = Number(process.env.PORT) || 3000;
      const host = process.env.HOST || "0.0.0.0";
      await server.listen({ port, host });
      const displayHost = host === "0.0.0.0" ? "localhost" : host;
      server.log.info(`Server running at http://${displayHost}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
