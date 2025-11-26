import AssignmentsDao from "../Assignments/dao.js";
export default function AssignmentsRoutes(app) {
  const dao = AssignmentsDao();
  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  }
  const findAssignmentById =  async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const assignment = await dao.findAssignmentById(courseId, assignmentId);
    res.json(assignment);
  }
  const createAssignmentForCourse =  async (req, res) => {
    const { courseId } = req.params;
    const assignment = { ...req.body, };
    const newAssignment = await dao.createAssignment(courseId, assignment);
    res.json(newAssignment);
  }
  const updateAssignment =  async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await dao.updateAssignment(courseId, assignmentId, assignmentUpdates);
    res.json(status);
  }
  const deleteAssignment =  async (req, res) => {
    const { courseId, assignmentId } = req.params;
    const status = await dao.deleteAssignment(courseId, assignmentId);
    res.json(status);
  }
  app.put("/api/courses/:courseId/assignments/:assignmentId", updateAssignment);
  app.delete("/api/courses/:courseId/assignments/:assignmentId", deleteAssignment);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.get("/api/courses/:courseId/assignments/:assignmentId", findAssignmentById);
}
