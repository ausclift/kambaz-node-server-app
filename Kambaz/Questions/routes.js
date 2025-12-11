import QuestionsDao from "../Questions/dao.js";
export default function QuestionsRoutes(app) {
  const questionDao = QuestionsDao();
  const findQuestionsForQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    const questions = await questionDao.findQuestionsForQuiz(courseId, quizId);
    res.json(questions);
  };
  const findQuestionById = async (req, res) => {
    const { courseId, quizId, questionId } = req.params;
    const question = await questionDao.findQuestionById(courseId, quizId, questionId);
    res.json(question);
  };
  const createQuestionForQuiz = async (req, res) => {
    const { courseId, quizId } = req.params;
    const question = req.body;
    const newQuestion = await questionDao.createQuestionForQuiz(courseId, quizId, question);
    res.json(newQuestion);
  };
  const deleteQuestion = async (req, res) => {
    const { courseId, quizId, questionId } = req.params;
    const status = await questionDao.deleteQuestion(courseId, quizId, questionId);
    res.json(status);
  };
  const updateQuestion = async (req, res) => {
    const { courseId, quizId, questionId } = req.params;
    const updatedQuestion = req.body;
    const status = await questionDao.updateQuestion(courseId, quizId, questionId, updatedQuestion);
    res.json(status);
  };
  app.get("/api/courses/:courseId/quizzes/:quizId/questions", findQuestionsForQuiz);
  app.get("/api/courses/:courseId/quizzes/:quizId/questions/:questionId", findQuestionById);
  app.post("/api/courses/:courseId/quizzes/:quizId/questions", createQuestionForQuiz);
  app.put("/api/courses/:courseId/quizzes/:quizId/questions/:questionId", updateQuestion);
  app.delete("/api/courses/:courseId/quizzes/:quizId/questions/:questionId", deleteQuestion);
}
