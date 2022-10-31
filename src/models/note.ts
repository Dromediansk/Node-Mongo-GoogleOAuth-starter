import { Schema, model, Types } from "mongoose";

export type NoteDocument = {
  id: Types.ObjectId;
  title: string;
  body: string;
  keywords: string[];
  category: string;
  publishedDate: string;
  user_id: Types.ObjectId;
  services: Types.Map<string>;
};

const noteSchema = new Schema<NoteDocument>({
  id: { type: Schema.Types.ObjectId },
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
    type: Schema.Types.ObjectId,
    required: true,
  },
  services: {
    type: Map,
    of: String,
  },
});

const Note = model("Note", noteSchema);

export default Note;
