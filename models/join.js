import mongoose from "mongoose";

const joinschema = new mongoose.Schema({
  email: { type: String, required: true },
  street: { type: String, required: true },
  village: { type: String, required: true },
  fullAddress: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

export default mongoose.model("join", joinschema);