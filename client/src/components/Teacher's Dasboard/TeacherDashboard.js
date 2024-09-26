import React, { useEffect } from "react";
import { MdOutlineQuiz } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../redux/action";
const TeacherDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.custom.user);
  useEffect(() => {
    if (user?.role !== "teacher") {
      navigate("/login");
    }
  });
  const handleLogout = () => {
    dispatch(logoutUser());

    navigate("/");
  };
  return (
    <div className="flex flex-wrap h-[100vh] ">
      <div className="bg-[#172285] text-white  w-[20%] h-full fixed">
        <div className="text-2xl  font-bold p-2 flex flex-wrap  ">
          <h1>Dash</h1>
          <h1>Board</h1>
        </div>
        <div className=" mt-10 ">
          <Link to="/">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <FaHome className="mt-1" />
              Home
            </div>
          </Link>
          <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
            <FaRegUser className="mt-1" />
            Profile
          </div>
          <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
            <FaBarsProgress className="mt-1" />
            Progress
          </div>
          <div
            onClick={handleLogout}
            className="mb-2 text-lg flex flex-wrap gap-2  py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b text-red-600  border-white hover-effect w-[80%]"
          >
            <RiLogoutCircleLine className="mt-1" />
            Logout
          </div>
        </div>
      </div>
      <div className=" w-[80%] p-3 ml-[20%] ">
        <div className=" lg:mr-[5%] flex flex-wrap justify-end">
          <div className=" bg-slate-300 w-32 rounded-xl  lg:ml-[80%] text-lg text-center flex flex-wrap justify-center gap-2 p-2">
            <h1>{user?.firstName}</h1>
            <FaRegUserCircle className="mt-1" />
          </div>
        </div>
        <div className="lg:h-40 lg:w-[90%] sm:w-full m-2 p-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg text-white">
          <h1 className="text-4xl mb-1">Welcome Back, {user?.firstName} !</h1>
        </div>
        <div className="lg:gap-1 lg:justify-start lg:flex lg:flex-wrap sm:block md:flex md:flex-wrap md:justify-center md:gap-3 p-2 ">
          <Link to="/teacherslecture">
            <div className="rounded-lg lg:mr-5 my-1  lg:w-[13rem] lg:h-[6rem] py-2 px-5 bg-green-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <FaChalkboardTeacher className="text-3xl  " />
              Lectures
            </div>
          </Link>

          <Link to="/teacherquiz">
            <div className="rounded-lg lg:mr-5 my-1  lg:w-[13rem] lg:h-[6rem] py-2 px-5 bg-pink-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <MdOutlineQuiz className="text-3xl " />
              Quizes
            </div>
          </Link>

          <Link to="/assignments">
            <div className=" rounded-lg lg:mr-5 my-1  lg:w-[13rem] lg:h-[6rem] py-2 px-5 bg-yellow-400 text-white text-xl hover:scale-105 transition-transform duration-300 ">
              <MdAssignment className="text-3xl" />
              Assignments
            </div>
          </Link>

          <Link to="/teacherqna">
            <div className="rounded-lg lg:mr-5 my-1  lg:w-[13rem] lg:h-[6rem] py-2 px-5 bg-blue-400 text-white text-xl hover:scale-105 transition-transform duration-300">
              <FaRegQuestionCircle className="text-3xl" />
              QnA
            </div>
          </Link>
        </div>
        <div className="lg:flex lg:flex-wrap md:flex md:flex-wrap   gap-3 lg:h-[30vh] md:h-[30vh] sm:w-full mb-4 ">
          <div className=" w-full lg:w-[69%] flex flex-wrap justify-center gap-4  rounded-lg text-white">
            <div className="w-full  rounded-lg lg:w-[48%] lg:mb-2 p-8 bg-emerald-500 ">
              <h1 className="text-lg">Course Name 1</h1>
              <h2>Students Enrolled: 46</h2>
              <h2>View Course Outline</h2>
            </div>
            <div className="w-full rounded-lg  lg:w-[48%] mb-2 p-8 bg-emerald-500 ">
              <h1 className="text-lg">Course Name 1</h1>
              <h2>Students Enrolled: 46</h2>
              <h2>View Course Outline</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
