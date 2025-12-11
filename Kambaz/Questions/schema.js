import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    type: {
      type: String,
      enum: ["Multiple Choice", "True or False", "Fill in the Blank"],
      required: true,
    },
    prompt: { type: String, required: true },
    options: [String], // Multiple Choice
    correct_option: Number, // Multiple Choice
    correct_answer_tf: Boolean, // True/False
    correct_answer_text: [String], // Fill in the blank
    points: { type: Number, default: 1 },
  }
);
export default schema;
