import { Schema, model } from "mongoose";

export interface Fish {
  id: string;
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
