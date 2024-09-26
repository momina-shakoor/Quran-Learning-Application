import React, { useState } from "react";
import { CiUser, CiLock, CiMail, CiSquareCheck } from "react-icons/ci";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password length and character requirements check
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    const isValidPassword = passwordRegex.test(data.password);

    if (!isValidPassword) {
      toast.warning(
        "Password must be 8-16 characters long and include at least one letter, one number, and one special character."
      );
      return;
    }

    // Password match check
    if (data.password !== data.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);

    try {
      // const response= await axios.post("http://localhost:8080/api/users/studentsignup",data);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          zIndex: 50,
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 relative">
          <Link to="/">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>

          <h1 className="text-3xl font-bold mb-6">Signup</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <CiUser className="text-2xl" />
              <input
                required
                type="text"
                name="firstName"
                value={data.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <CiUser className="text-2xl" />
              <input
                required
                type="text"
                name="lastName"
                value={data.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <CiMail className="text-2xl" />
              <input
                required
                type="text"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <CiLock className="text-2xl" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={handleTogglePassword}
              />
            </div>
            <div className="flex items-center space-x-2">
              <CiSquareCheck className="text-2xl" />
              <input
                required
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={handleTogglePassword}
              />
            </div>

            {!passwordMatch && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
            {!validEmail && (
              <p className="text-red-500 text-sm">Invalid email format.</p>
            )}
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
            >
              Signup
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
