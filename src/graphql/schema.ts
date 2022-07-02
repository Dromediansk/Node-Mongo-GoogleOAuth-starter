import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import {
  createNote,
  deleteNote,
  editNote,
  getNoteById,
} from "../controllers/note";
import { createUser, getUserById, getUserNotes } from "../controllers/user";

const userType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    notes: {
      type: new GraphQLList(noteType),
      async resolve(parent, args) {
        return await getUserNotes(parent.id);
      },
    },
  }),
});

const noteType: GraphQLObjectType = new GraphQLObjectType({
  name: "Note",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    keywords: { type: new GraphQLList(GraphQLString) },
    category: { type: GraphQLString },
    publishedDate: { type: GraphQLString },
    user_id: { type: GraphQLID },
    user: {
      type: userType,
      async resolve(parent) {
        return await getUserById(parent.user_id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    note: {
      type: noteType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await getNoteById(args);
      },
    },
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await getUserById(args);
      },
    },
  },
});

const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    createNote: {
      type: noteType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        keywords: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        publishedDate: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const note = await createNote(args);
        return note;
      },
    },
    editNote: {
      type: noteType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        keywords: { type: new GraphQLList(GraphQLString) },
        category: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const note = await editNote(args);
        return note;
      },
    },
    deleteNote: {
      type: noteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const data = await deleteNote(args);
        return data;
      },
    },
    createUser: {
      type: userType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const user = await createUser(args);
        return user;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
