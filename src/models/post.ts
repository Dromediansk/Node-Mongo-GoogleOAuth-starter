import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  user_id: {
    type: ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
});

const Post = model("Post", postSchema);

export default Post;
