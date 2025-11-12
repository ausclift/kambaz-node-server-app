import "dotenv/config";
import express from "express";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import db from "./Kambaz/Database/index.js";
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import session from "express-session";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};


if (process.env.SERVER_ENV === "development") {
  sessionOptions.cookie = {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  };
}

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// Routes
UserRoutes(app, db);
CourseRoutes(app, db);
EnrollmentRoutes(app, db);
ModuleRoutes(app, db);
AssignmentRoutes(app, db);
Lab5(app);

app.listen(4000);