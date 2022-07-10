import { Schema, model } from "mongoose";

const ObjectId = Schema.Types.ObjectId;

const noteSchema = new Schema({
  id: { type: ObjectId },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  keywords: {
    tags: [{ type: String, required: true }],
  },
  category: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
  },
  services: {
    type: Map,
    of: String,
  },
});

const Note = model("Note", noteSchema);

export default Note;
