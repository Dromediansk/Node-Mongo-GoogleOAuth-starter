import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
