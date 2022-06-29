import Fastify from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import merciurius from "mercurius";
import schema from "./graphql/schema";

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

app.register(merciurius, {
  schema,
  graphiql: true,
});

export default app;
