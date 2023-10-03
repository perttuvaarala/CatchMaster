import { Schema, model } from "mongoose";

interface Fish {
  name: string;
}

const fishSchema = new Schema<Fish>({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
});

export default model<Fish>("Fish", fishSchema);
