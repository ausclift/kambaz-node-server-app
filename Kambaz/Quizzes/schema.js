import mongoose from "mongoose";
import questionSchema from "../Questions/schema.js";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    quiz_type: String,
    points: Number,
    assignment_group: String,
    shuffle_answers: Boolean,
    time_limit: Number,
    multiple_attempts: Boolean,
    show_correct_answers: String,
    access_code: String,
    one_question_at_a_time: Boolean,
    webcam_required: Boolean,
    lock_after_answering: Boolean,
    due_date: String,
    available_date: String,
    until_date: String,
    published: Boolean,
    questions: [questionSchema],
  }
);
export default schema;
