"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const cors_1 = __importDefault(require("@fastify/cors"));
const mercurius_1 = __importDefault(require("mercurius"));
const schema_1 = __importDefault(require("./graphql/schema"));
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(cors_1.default, {
    origin: "http://localhost:3000",
});
app.register(helmet_1.default);
app.register(mercurius_1.default, {
    schema: schema_1.default,
    graphiql: true,
});
exports.default = app;
//# sourceMappingURL=app.js.map