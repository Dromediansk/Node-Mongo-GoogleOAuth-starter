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
const note_1 = require("../controllers/note");
const user_1 = require("../controllers/user");
const userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        firstName: { type: graphql_1.GraphQLString },
        lastName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        notes: {
            type: new graphql_1.GraphQLList(noteType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, user_1.getUserNotes)(parent.id);
                });
            },
        },
    }),
});
const noteType = new graphql_1.GraphQLObjectType({
    name: "Note",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        title: { type: graphql_1.GraphQLString },
        body: { type: graphql_1.GraphQLString },
        keywords: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
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
        note: {
            type: noteType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield (0, note_1.getNoteById)(args);
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
        createNote: {
            type: noteType,
            args: {
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                body: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                keywords: { type: new graphql_1.GraphQLNonNull(new graphql_1.GraphQLList(graphql_1.GraphQLString)) },
                category: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                publishedDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                user_id: { type: graphql_1.GraphQLID },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const note = yield (0, note_1.createNote)(args);
                    return note;
                });
            },
        },
        editNote: {
            type: noteType,
            args: {
                title: { type: graphql_1.GraphQLString },
                body: { type: graphql_1.GraphQLString },
                keywords: { type: new graphql_1.GraphQLList(graphql_1.GraphQLString) },
                category: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const note = yield (0, note_1.editNote)(args);
                    return note;
                });
            },
        },
        deleteNote: {
            type: noteType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const data = yield (0, note_1.deleteNote)(args);
                    return data;
                });
            },
        },
        createUser: {
            type: userType,
            args: {
                firstName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                lastName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield (0, user_1.createUser)(args);
                    return user;
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