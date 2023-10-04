import mongoose from "mongoose";

export interface Post {
  id: string;
  lon: number;
  lat: number;
  content: string;
  timestamp: string;
  imagelink: string;
  baitID: string;
  userID: string;
  fishID: string;
  weatherCondition: string;
}

const postSchema = new mongoose.Schema<Post>({
  lon: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
  },
  timestamp: {
    type: String,
    required: true,
  },
  imagelink: {
    type: String,
    required: true,
  },
  baitID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  fishID: {
    type: String,
    required: true,
  },
  weatherCondition: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Post>("Post", postSchema);
