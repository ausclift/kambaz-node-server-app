import { v4 as uuidv4 } from "uuid";
export default function EnrollmentsDao(db) {
  function addEnrollment(userId, courseId) {
    const exists = db.enrollments.some(e => e.user === userId && e.course === courseId);
    if (exists) return null;
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    db.enrollments.push(newEnrollment);
    return newEnrollment;
  }
  function removeEnrollment(userId, courseId) {
    const initialLength = db.enrollments.length;
    db.enrollments = db.enrollments.filter(e => !(e.user === userId && e.course === courseId));
    return db.enrollments.length < initialLength;
  }
  function fetchEnrollments() {
    return db.enrollments;
  }
  return {
    addEnrollment,
    removeEnrollment,
    fetchEnrollments,
  };
}
