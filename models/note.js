import mongoose, { Schema } from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: "sign" 
    },
    restore: { 
      type: Boolean,
      default: false 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Note", NoteSchema);

