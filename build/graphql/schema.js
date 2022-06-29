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
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const post_1 = require("../controllers/post");
const user_1 = require("../controllers/user");
const userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        posts: {
            type: new graphql_1.GraphQLList(postType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, post_1.getPostByUserId)(parent.id);
                });
            },
        },
    }),
});
const postType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        category: { type: graphql_1.GraphQLString },
        publishedDate: { type: graphql_1.GraphQLString },
        user_id: { type: graphql_1.GraphQLID },
        user: {
            type: userType,
            resolve(parent) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, user_1.getUserById)(parent.user_id);
                });
            },
        },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        post: {
            type: postType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, post_1.getPostByUserId)(args);
                });
            },
        },
        posts: {
            type: new graphql_1.GraphQLList(postType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, post_1.getPosts)();
                });
            },
        },
        user: {
            type: userType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, user_1.getUserById)(args);
                });
            },
        },
    },
});
const Mutations = new graphql_1.GraphQLObjectType({
    name: "Mutations",
    fields: {
        createPost: {
            type: postType,
            args: {
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                body: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                category: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                publishedDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                user_id: { type: graphql_1.GraphQLID },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("args", args);
                    const data = yield (0, post_1.createPost)(args);
                    return data;
                });
            },
        },
        deletePost: {
            type: postType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield (0, post_1.deletePost)(args);
                    return data;
                });
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutations,
});
//# sourceMappingURL=schema.js.map