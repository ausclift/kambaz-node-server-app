import model from "../Courses/model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuestionsDao() {
  async function findQuestionsForQuiz(courseId, quizId) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);
    return quiz ? quiz.questions : [];
  }

  async function findQuestionById(courseId, quizId, questionId) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    return quiz.questions.id(questionId);
  }

  async function createQuestionForQuiz(courseId, quizId, question) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);

    const newQuestion = {
      ...question,
      _id: uuidv4(),
    };

    quiz.questions.push(newQuestion);
    await course.save();

    return newQuestion;
  }

  async function deleteQuestion(courseId, quizId, questionId) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    quiz.questions.pull({ _id: questionId });
    return await course.save();
  }

  async function updateQuestion(courseId, quizId, questionId, updates) {
    const course = await model.findById(courseId);
    const quiz = course.quizzes.id(quizId);
    if (!quiz) return null;

    const question = quiz.questions.id(questionId);
    if (!question) return null;

    Object.assign(question, updates);
    await course.save();

    return question;
  }

  return {
    findQuestionsForQuiz,
    findQuestionById,
    createQuestionForQuiz,
    deleteQuestion,
    updateQuestion,
  };
}
