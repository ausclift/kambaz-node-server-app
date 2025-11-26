import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: Number,
    due_date: String,
    available_date: String,
    until_date: String,
    assignment_group: String,
    display_grade_as: String,
    submission_type: String,
  }
);
export default schema;
