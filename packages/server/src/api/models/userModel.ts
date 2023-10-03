import { Schema, model } from "mongoose";

interface User {
  username: string;
  birthdate: string;
  favouriteFishingStyle: string;
  baits: string[];
}

const userSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  birthdate: {
    type: String,
    required: true,
  },
  favouriteFishingStyle: {
    type: String,
    required: true,
  },
  baits: {
    type: [String],
    required: true,
  },
});

export default model<User>("User", userSchema);
