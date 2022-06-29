import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
import {
  getPostByUserId,
  getPosts,
  createPost,
  deletePost,
} from "../controllers/post";
import { getUserById } from "../controllers/user";

const userType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    posts: {
      type: new GraphQLList(postType),
      async resolve(parent, args) {
        return await getPostByUserId(parent.id);
      },
    },
  }),
});

const postType: GraphQLObjectType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
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
    post: {
      type: postType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await getPostByUserId(args);
      },
    },
    posts: {
      type: new GraphQLList(postType),
      async resolve(parent, args) {
        return await getPosts();
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
    createPost: {
      type: postType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(GraphQLString) },
        publishedDate: { type: new GraphQLNonNull(GraphQLString) },
        user_id: { type: GraphQLID },
      },
      async resolve(parent, args) {
        console.log("args", args);
        const data = await createPost(args);
        return data;
      },
    },
    deletePost: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const data = await deletePost(args);
        return data;
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
