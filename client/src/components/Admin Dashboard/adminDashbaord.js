import { React } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";

const AdminDashboard = () => {
  return (
    <div className="flex flex-wrap h-[100vh] ">
      <div className="bg-[#172285] text-white lg:w-[20%] sm:w-[25%] h-full fixed">
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
          <Link to="/teacher">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <FaChalkboardTeacher className="mt-1" />
              Teachers
            </div>
          </Link>
          <Link to="/student">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <PiStudent className="mt-1" />
              Students
            </div>
          </Link>
          <Link to="/">
            <div className="mb-2 text-lg flex flex-wrap gap-2  py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b text-red-600  border-white hover-effect w-[80%]">
              <RiLogoutCircleLine className="mt-1" />
              Logout
            </div>
          </Link>
        </div>
      </div>
      <div className=" w-[80%] p-3 lg:ml-[20%] ml-[25%] ">
        <div className=" lg:mr-[5%] flex flex-wrap justify-end">
          <div className=" bg-slate-300 w-32 rounded-xl  lg:ml-[80%] text-lg text-center flex flex-wrap justify-center gap-2 p-2">
            <h1>Username </h1>
            <FaRegUserCircle className="mt-1" />
          </div>
        </div>
        <div className="lg:px-[20%] py-12 px-2">
          <Link to="/teacher">
            <div className="flex flex-wrap justify-center items-center gap-2 rounded-lg lg:mr-5   w-full  py-2 px-5 bg-blue-300 mb-2 text-white text-xl hover:scale-105 transition-transform duration-300 ">
              <FaChalkboardTeacher className="text-3xl" />
              Teacher
            </div>
          </Link>
          <Link to="/student">
            <div className="flex flex-wrap justify-center items-center gap-2 rounded-lg lg:mr-5   w-full  py-2 px-5 bg-blue-300 mb-2 text-white text-xl hover:scale-105 transition-transform duration-300 ">
              <PiStudent className="text-3xl" />
              Student
            </div>
          </Link>
          <Link to="/courses">
            <div className="flex flex-wrap justify-center items-center gap-2 rounded-lg lg:mr-5   w-full  py-2 px-5 bg-blue-300 mb-2 text-white text-xl hover:scale-105 transition-transform duration-300 ">
              <GiTeacher className="text-3xl" />
              Courses
            </div>
          </Link>
          <Link to="/profile">
            <div className="flex flex-wrap justify-center items-center gap-2 rounded-lg lg:mr-5   w-full  py-2 px-5 bg-blue-300 mb-2 text-white text-xl hover:scale-105 transition-transform duration-300 ">
              <ImProfile className="text-3xl" />
              Profile
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
