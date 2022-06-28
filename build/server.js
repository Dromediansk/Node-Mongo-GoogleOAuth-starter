"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const app_1 = __importDefault(require("./app"));
const mongo_1 = require("./services/mongo");
const PORT = config_1.default.PORT;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, mongo_1.mongoConnect)();
        app_1.default.listen({ port: PORT });
        app_1.default.log.info(`Listening on port ${PORT}`);
    }
    catch (err) {
        app_1.default.log.error(err);
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=server.js.map