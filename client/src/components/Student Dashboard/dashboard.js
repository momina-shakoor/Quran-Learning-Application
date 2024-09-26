import React, { useEffect, useState } from "react";
import { PiMosqueFill } from "react-icons/pi";
import {
  FaQuran,
  FaQuestion,
  FaBookReader,
  FaRegUserCircle,
  FaHome,
  FaRegUser,
} from "react-icons/fa";

import {
  MdFeedback,
  MdQuiz,
  MdAssignment,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/action";
import axios from "axios";

const Dashboard = () => {
  const [Courses, setCoures] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.custom.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not a student
    if (user?.role !== "student") {
      navigate("/login");
    }
  }, [user, navigate]);

  const fecthcourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/allcourses"
      );
      setCoures(response.data.allcourses);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  useEffect(() => {
    fecthcourses();
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const capitalizeFirstLetterOfEachWord = (string) => {
    if (!string) return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-wrap h-[100vh] ">
      <div className="bg-[#7194f3] text-white w-[20%] h-full fixed">
        <div className="text-2xl font-bold p-2 flex flex-wrap">
          <h1>Dash</h1>
          <h1>Board</h1>
        </div>
        <div className="mt-10">
          <Link to="/">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <FaHome className="mt-1" />
              Home
            </div>
          </Link>
          <Link to="/studentprofile">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <FaRegUser className="mt-1" />
              Profile
            </div>
          </Link>
          <Link to="/leaderboard">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <FaBarsProgress className="mt-1" />
              LeaderBoard
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b text-red-600 border-white hover-effect w-[80%]"
          >
            <RiLogoutCircleLine className="mt-1" />
            Logout
          </button>
        </div>
      </div>
      <div className="w-[80%] p-3 ml-[20%]">
        <div className="lg:mr-[5%] flex flex-wrap justify-end">
          <div className="bg-slate-300 rounded-xl lg:ml-[70%] text-lg text-center flex flex-wrap justify-center gap-2 py-2">
            <h1>{user?.firstName}</h1>
            <FaRegUserCircle className="mt-1" />
          </div>
        </div>
        <div className="lg:h-40 lg:w-[90%] sm:w-full m-2 p-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white">
          <h1 className="text-4xl mb-1">Welcome Back, {user?.firstName}!</h1>
          <h2 className="text-lg mb-1">
            You have completed 40% of your course!
          </h2>
          <h3>Keep up the good work!</h3>
        </div>
        <div className="lg:gap-1 lg:justify-start lg:flex lg:flex-wrap sm:block md:flex md:flex-wrap md:justify-center md:gap-3 p-2">
          <Link to="/studentquiz">
            <div className="rounded-lg lg:mr-5 my-1 lg:w-[10rem] lg:h-[6rem] p-2 bg-green-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <MdQuiz className="text-3xl" />
              Quiz
            </div>
          </Link>
          <Link to="/NamazStreaks">
            <div className="rounded-lg lg:mr-5 my-1 lg:w-[10rem] lg:h-[6rem] p-2 bg-pink-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <PiMosqueFill className="text-3xl" />
              Namaz Streaks
            </div>
          </Link>
          <Link to="/QuranStreaks">
            <div className="rounded-lg lg:mr-5 my-1 lg:w-[10rem] lg:h-[6rem] p-2 bg-yellow-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <FaQuran className="text-3xl" />
              Quran Streaks
            </div>
          </Link>

          <Link to="/studentfeedback">
            <div className="rounded-lg lg:mr-5 my-1 lg:w-[10rem] lg:h-[6rem] p-2 bg-teal-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <MdFeedback className="text-3xl" />
              Teacher's Feedback
            </div>
          </Link>
        </div>
        <div className="lg:flex lg:flex-wrap md:flex md:flex-wrap gap-3 lg:h-[30vh] md:h-[30vh] sm:w-full mb-4">
          <div className="w-full lg:w-[69%]">
            <div className="bg-indigo-400 rounded-lg text-white lg:flex lg:flex-wrap md:flex md:flex-wrap gap-3 lg:h-[100%] md:h-[100%] p-3">
              <div className="sm:w-full bg-teal-600 rounded-lg p-1 lg:w-[70%] md:w-[60%]">
                <h1 className="text-2xl font-medium">My Courses</h1>
                <div className="flex flex-wrap gap-3">
                  {Courses?.map((item) => (
                    <div key={item._id}>
                      <h1>
                        {capitalizeFirstLetterOfEachWord(item.courseName)}
                      </h1>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center text-xl text-center gap-1 p-2">
                  <div className="px-2 border-r-2 border-white">
                    <h2>2</h2>
                    <h3 className="text-sm">Courses</h3>
                  </div>
                  <div className="px-2 border-r-2 border-white">
                    <h2>2</h2>
                    <h3 className="text-sm">Completed</h3>
                  </div>
                  <div className="px-2">
                    <h2>1</h2>
                    <h3 className="text-sm">Points</h3>
                  </div>
                </div>
              </div>
              <div className="lg:w-[28%] md:w-[28%] p-2">
                <Link
                  to="/studentlecture"
                  className="flex flex-wrap gap-4 rounded-lg bg-pink-600 hover:scale-105 transition-transform duration-300 p-2 mb-3"
                >
                  <h1>Start Lesson</h1>
                  <MdOutlinePlayLesson className="mt-1" />
                </Link>
                <div className="flex flex-wrap gap-4 rounded-lg bg-yellow-600 hover:scale-105 transition-transform duration-300 p-2 mb-3">
                  <h1>Course Outline</h1>
                  <FaBookReader className="mt-1" />
                </div>
                <Link to="/studentqna">
                  <div className="flex flex-wrap gap-4 rounded-lg bg-green-600 hover:scale-105 transition-transform duration-300 p-2">
                    <h1>Ask Question</h1>
                    <FaQuestion className="mt-1" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="py-2 lg:w-[20%] w-full text-white text-lg">
            <Link to="/studentassignment">
              <div className="h-[49%] mb-1 rounded-lg bg-red-400 p-2 flex flex-wrap sm:gap-2 lg:gap-1 md:gap-0 hover:scale-105 transition-transform duration-300">
                <MdAssignment className="mt-1" />
                <h5>Assignments</h5>
                <h2 className="text-red-700 text-md hover:underline">
                  1 Assignment pending
                </h2>
              </div>
            </Link>
            <Link to="/quran">
              <div className="h-[49%] mb-1 rounded-lg bg-lime-400 text-2xl p-2 flex flex-wrap justify-center gap-2 text-center items-center hover:scale-105 transition-transform duration-300">
                <FaQuran className="mt-1" />
                <h5>Read Quran</h5>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
