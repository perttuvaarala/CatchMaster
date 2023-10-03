import { Schema, model } from "mongoose";

interface Bait {
  name: string;
  brand: string;
  color: string;
  weight: number;
}

const baitSchema = new Schema<Bait>({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  brand: {
    type: String,
    required: true,
    minlength: 3,
  },
  color: {
    type: String,
    required: true,
    minlength: 3,
  },
  weight: {
    type: Number,
    required: true,
  },
});

export default model<Bait>("Bait", baitSchema);
