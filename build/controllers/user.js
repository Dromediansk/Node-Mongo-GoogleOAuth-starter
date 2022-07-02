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
exports.getUserNotes = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const note_1 = __importDefault(require("../models/note"));
const createUser = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new user_1.default(req);
        const savedUser = yield user.save();
        return savedUser;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.createUser = createUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
        return users;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.getUsers = getUsers;
const getUserById = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params ? req.params.id : "";
        const user = yield user_1.default.findById(userId);
        return user;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.getUserById = getUserById;
const getUserNotes = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params ? req.params.userId : "";
        const notes = yield note_1.default.find({ user_id: userId });
        return notes;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.getUserNotes = getUserNotes;
//# sourceMappingURL=user.js.map