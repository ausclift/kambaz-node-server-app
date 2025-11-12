import EnrollmentsDao from "./dao.js";
export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  const fetchEnrollments = (req, res) => {
    const enrollments = dao.fetchEnrollments();
    res.send(enrollments);
  }
  const addEnrollment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ error: "Missing courseId" });
    const newEnrollment = dao.addEnrollment(currentUser._id, courseId);
    if (!newEnrollment) return res.status(400).json({ error: "Already enrolled" });
    res.status(201).json(newEnrollment);
  };
  const removeEnrollment = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const { courseId } = req.params;
    if (!courseId) return res.status(400).json({ error: "Missing courseId" });
    const removed = dao.removeEnrollment(currentUser._id, courseId);
    if (!removed) return res.status(404).json({ error: "Enrollment not found" });
    res.json({ success: true, course: courseId });
  };
  app.get("/api/enrollments", fetchEnrollments);
  app.post("/api/enrollments", addEnrollment);
  app.delete("/api/enrollments/:courseId", removeEnrollment);
}
