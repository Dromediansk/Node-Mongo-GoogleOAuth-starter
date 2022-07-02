import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: "http://localhost:3000",
});

app.register(helmet, {
  contentSecurityPolicy:
    process.env.NODE_ENV === "production" ? undefined : false,
});

export default app;
