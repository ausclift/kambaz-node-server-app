import model from "../Courses/model.js";
import { v4 as uuidv4 } from "uuid";
export default function AssignmentsDao() {
  async function findAssignmentsForCourse(courseId) {
    const course = await model.findById(courseId);
    return course.assignments;
  }
  async function createAssignment(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    await model.updateOne(
      { _id: courseId },
      { $push: { assignments: newAssignment } }
    );
    return newAssignment;
  }
  async function deleteAssignment(courseId, assignmentId) {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { assignments: { _id: assignmentId } } }
    );
    return status;
  }
  async function updateAssignment(courseId, assignmentId, assignmentUpdates) {
    const course = await model.findById(courseId);
    const assignment = course.assignments.id(assignmentId);
    Object.assign(assignment, assignmentUpdates);
    await course.save();
    return assignment;
  }
  async function findAssignmentById(courseId, assignmentId) {
    const course = await model.findById(courseId);
    const assignment = course.assignments.id(assignmentId);
    return assignment;
  }
  return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment,
    findAssignmentById,
  };
}