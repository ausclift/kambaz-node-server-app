import QuizzesDao from "../Quizzes/dao.js";
export default function QuizzesRoutes(app) {
  const dao = QuizzesDao();
  const findQuizzesForCourse = async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  }
  const findQuizById =  async (req, res) => {
    const { courseId, quizId } = req.params;
    const quiz = await dao.findQuizById(courseId, quizId);
    res.json(quiz);
  }
  const createQuizForCourse =  async (req, res) => {
    const { courseId } = req.params;
    const quiz = { ...req.body, };
    const newQuiz = await dao.createQuiz(courseId, quiz);
    res.json(newQuiz);
  }
  const updateQuiz =  async (req, res) => {
    const { courseId, quizId } = req.params;
    const quizUpdates = req.body;
    const status = await dao.updateQuiz(courseId, quizId, quizUpdates);
    res.json(status);
  }
  const deleteQuiz =  async (req, res) => {
    const { courseId, quizId } = req.params;
    const status = await dao.deleteQuiz(courseId, quizId);
    res.json(status);
  }
  app.put("/api/courses/:courseId/quizzes/:quizId", updateQuiz);
  app.delete("/api/courses/:courseId/quizzes/:quizId", deleteQuiz);
  app.post("/api/courses/:courseId/quizzes", createQuizForCourse);
  app.get("/api/courses/:courseId/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:courseId/quizzes/:quizId", findQuizById);
}
