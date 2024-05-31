import mongoose, { Schema, now } from "mongoose";

const signSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ConfirmPassword: {
    type: String,
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("sign", signSchema);
