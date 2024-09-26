const express = require("express");
const router = express.Router();

// Import controllers
const {
  AuthSignup,
  updateAuth,
  ChangePassword,
  forgotPassword,
  AuthLogin,
  AllAuths,
  DeleteAuth,
} = require("../controllers/Auth/auth");
const {
  AddCourse,
  Allcourses,
  DeleteCourse,
} = require("../controllers/Courses/courses");
const {
  AddAssignment,
  AllAssignments,
} = require("../controllers/Assignment/assignment");

const {
  Attemptassignment,
  getAllassignmentAttemps,
  GetAllassignmentAttemps,
} = require("../controllers/AttemptAssignment/attemptassignment");

const {
  AddQuize,
  AllQuizes,
  getSingleQuiz,
} = require("../controllers/Quize/quize");

const {
  Attemptquize,
  getAllQuizAttemps,
  getAllQuizAttemptsWithDetails,
  getQuizAttemptsByQuizId,
} = require("../controllers/AttemptQuize/attemptquize");

const { AdminSignup, AdminLogin } = require("../controllers/Admin/admin");
const { upload } = require("../middlewares/multer.middleware");
const {
  createLesson,
  getLessons,
  deleteLesson,
} = require("../controllers/Lesson/lesson");
const { getLeaderboard } = require("../controllers/Leaderboard/leaderboard");
const {
  getQuestions,
  addQuestion,
  getAnswers,
  addAnswer,
} = require("../controllers/QnA/qna");

// Auth Routes
router.post("/authsignup", AuthSignup);
router.post("/authlogin", AuthLogin);
router.get("/allauths", AllAuths);
router.post("/updatepersonaldata", updateAuth);
router.post("/forgotpassword", forgotPassword);
router.patch("/changepassword", ChangePassword);
router.delete("/deleteAuth/:id", DeleteAuth);

// Course Routes
router.post("/addcourse", AddCourse);
router.get("/allcourses", Allcourses);
router.delete("/deletecourse/:id", DeleteCourse);

// Assignment Routes
router.post("/addassignment", AddAssignment);
router.get("/allassignments", AllAssignments);
router.post("/submittassignment", Attemptassignment);
router.get("/allassignmentattempts", GetAllassignmentAttemps); // Ensure this matches your implementation

/// Quiz Routes
router.post("/addquize", AddQuize);
router.get("/allquizes", AllQuizes);
router.get("/singlequize/:id", getSingleQuiz);
router.post("/attemptquize", Attemptquize);
router.get("/attemptofquize/:id", getQuizAttemptsByQuizId);
router.get("/allquizesattempts", getAllQuizAttemptsWithDetails);

// Admin Routes
router.post("/adminsignup", AdminSignup);
router.post("/adminlogin", AdminLogin);

// Lesson Routes
router.post("/lessons", upload.single("audioFile"), createLesson);
router.get("/lessons", getLessons);
router.delete("/lessons/:id", deleteLesson);

// Leaderboard Route
router.get("/leaderboard", getLeaderboard);

// QnA Routes
router.get("/questions", getQuestions);
router.post("/questions", addQuestion);
router.get("/answers", getAnswers);
router.post("/answers", addAnswer);
module.exports = router;
