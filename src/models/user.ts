import { Schema, model } from "mongoose";

export type UserDocument = {
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
    required: false,
  },
  givenName: {
    type: String,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
