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
exports.mongoDisconnect = exports.mongoConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../utils/config"));
const MONGO_URI = config_1.default.MONGO_URI;
mongoose_1.default.connection.once("open", () => {
    console.log("MongoDB connection ready!");
});
mongoose_1.default.connection.on("error", (err) => {
    throw new Error(err);
});
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(MONGO_URI);
});
exports.mongoConnect = mongoConnect;
const mongoDisconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
});
exports.mongoDisconnect = mongoDisconnect;
//# sourceMappingURL=mongo.js.map