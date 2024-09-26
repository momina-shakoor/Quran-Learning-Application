import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="#home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/images/logo.png" className="h-8" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Marfat-ul-Quran
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/login">
              <button className="text-sm text-gray-500 dark:text-white hover:underline">
                Login
              </button>
            </Link>
            <Link to="/registration">
              <button className="text-sm text-gray-500 dark:text-white hover:underline">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-900 dark:text-white
                  hover:underline"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="#home"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#home"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Contact
                </a>
              </li>
              {/* <li>
                <Link to="/dashboard">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/TeacherDashboard">Teacher Dashboard</Link>
              </li> */}
              {/* <li>
                <Link to="/admin">Admin Dashboard</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
