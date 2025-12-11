import model from "../Courses/model.js";
import { v4 as uuidv4 } from "uuid";
export default function QuizzesDao() {
  async function findQuizzesForCourse(courseId) {
    const course = await model.findById(courseId);
    return course.quizzes;
  }
  async function createQuiz(courseId, quiz) {
    const newQuiz = { ...quiz, _id: uuidv4() };
    await model.updateOne(
      { _id: courseId },
      { $push: { quizzes: newQuiz } }
    );
    return newQuiz;
  }
  async function deleteQuiz(courseId, quizId) {
    const status = await model.updateOne(
      { _id: courseId },
      { $pull: { quizzes: { _id: quizId } } }
    );
    return status;
  }
  async function updateQuiz(courseId, quizId, quizUpdates) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);
    Object.assign(quiz, quizUpdates);
    quiz.points = (quiz.questions || []).reduce((sum, question) => sum + (question.points || 0), 0);
    await course.save();
    return quiz;
  }
  async function findQuizById(courseId, quizId) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);
    return quiz;
  }
  return {
    findQuizzesForCourse,
    createQuiz,
    deleteQuiz,
    updateQuiz,
    findQuizById,
  };
}