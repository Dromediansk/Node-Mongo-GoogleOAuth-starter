import { Schema, Document, model } from "mongoose";

export type UserDocument = Document & {
  id: string;
  googleId: string;
  email: string;
  familyName: string;
  givenName: string;
};

const userSchema = new Schema<UserDocument>({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
