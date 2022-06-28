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
exports.deletePost = exports.createPost = exports.getPostByPostId = exports.getPosts = void 0;
const post_1 = __importDefault(require("../models/post"));
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find();
        return posts;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.getPosts = getPosts;
const getPostByPostId = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params ? req.params.id : "";
        const post = yield post_1.default.findById(postId);
        return post;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.getPostByPostId = getPostByPostId;
const createPost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = new post_1.default(req);
        const newPost = yield post.save();
        return newPost;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.createPost = createPost;
const deletePost = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params ? req.params.id : "";
        const post = yield post_1.default.findByIdAndRemove(postId);
        return post;
    }
    catch (err) {
        console.log("err", err);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=post.js.map