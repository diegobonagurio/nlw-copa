import Fastify from "fastify";
import cors from "@fastify/cors";
import { poolRoutes } from "./routes/pool";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";

import jwt from "@fastify/jwt";

async function bootstap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  // colocar no .env
  await fastify.register(jwt, {
    secret: "nlwcopa123@@",
  });

  await fastify.register(poolRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(userRoutes);
  await fastify.register(authRoutes);

  await fastify.listen({
    port: 3333,
    host: "0.0.0.0",
  });
}

bootstap();
