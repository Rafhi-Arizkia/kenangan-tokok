import { FastifyInstance } from "fastify";
import ScalarApiReference from "@scalar/fastify-api-reference";

export const registerScalar = async (fastify: FastifyInstance) => {
  const isEnabled = process.env.API_DOCS_ENABLED !== "false";

  if (!isEnabled) {
    fastify.log.info("API documentation is disabled");
    return;
  }

  try {
    await fastify.register(ScalarApiReference, {
      routePrefix: "/scalar",
      configuration: {
        title: "Kenangan Commerce API Reference",
        layout: "classic",
        url: "/openapi.json",
        theme: "purple",
        metadata: {
          title: "Kenangan Commerce API",
          description:
            "Complete API documentation for Kenangan Commerce platform",
          version: "1.0.0",
        },
        showSidebar: true,
        searchHotKey: "k",
      },
    });
  } catch (error: any) {
    fastify.log.error(
      "Failed to register Scalar API Reference:",
      error.message || error
    );
    throw error;
  }
};
