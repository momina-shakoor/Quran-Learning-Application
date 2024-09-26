import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/home";
import TeacherDashboard from "./components/Teacher's Dasboard/TeacherDashboard";
import QuranStreaks from "./components/Student Dashboard/Qstreaks";
import Dashboard from "./components/Student Dashboard/dashboard";
import QuranVerses from "./components/Student Dashboard/quran";
import StudentProfile from "./components/Student Dashboard/studentProfile";
import Assignments from "./components/Teacher's Dasboard/Assignments";
import TeacherQuiz from "./components/Teacher's Dasboard/TeacherQuiz";
import NamazStreaks from "./components/Student Dashboard/Nstreaks";
import Qna from "./components/Teacher's Dasboard/Qna";
import Signup from "./components/signup";
import Leaderboard from "./components/Student Dashboard/leaderboard";
import Registration from "./components/registration";
import Login from "./components/login";
import TeacherLecture from "./components/Teacher's Dasboard/TeacherLecture";
import StudentFeedback from "./components/Student Dashboard/StudentFeedback";
import StudentAssignment from "./components/Student Dashboard/StudentAssignment";
import StudentQuiz from "./components/Student Dashboard/StudentQuiz";
import StudentQna from "./components/Student Dashboard/StudentQna";
import AdminDashbaord from "./components/Admin Dashboard/adminDashbaord";
import AdminTeacher from "./components/Admin Dashboard/teacher";
import AdminStudent from "./components/Admin Dashboard/student";
import AdminCourse from "./components/Admin Dashboard/courses";
import AdminProfile from "./components/Admin Dashboard/profile";
import AttemptAssignment from "./components/Student Dashboard/attemptAssignment";
import AttemptQuiz from "./components/Student Dashboard/attemptquiz";
import AdminLogin from "./components/Admin Dashboard/adminlogin";
import StudentLecture from "./components/Student Dashboard/StudentLecture";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TeacherDashboard" element={<TeacherDashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/QuranStreaks" element={<QuranStreaks />} />
          <Route path="/NamazStreaks" element={<NamazStreaks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentquiz" element={<StudentQuiz />} />
          <Route path="/quran" element={<QuranVerses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/teacherquiz" element={<TeacherQuiz />} />
          <Route path="/teacherqna" element={<Qna />} />
          <Route path="/studentfeedback" element={<StudentFeedback />} />
          <Route path="/teacherslecture" element={<TeacherLecture />} />
          <Route path="/studentassignment" element={<StudentAssignment />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="studentqna" element={<StudentQna />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/admindashboard" element={<AdminDashbaord />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/teacher" element={<AdminTeacher />} />
          <Route path="/student" element={<AdminStudent />} />
          <Route path="/courses" element={<AdminCourse />} />
          <Route path="/profile" element={<AdminProfile />} />
          <Route path="/attemptassignment" element={<AttemptAssignment />} />
          <Route path="/attemptquiz/:id" element={<AttemptQuiz />} />
          <Route path="/studentlecture" element={<StudentLecture />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
