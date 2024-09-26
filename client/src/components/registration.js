import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CiUser,
  CiLock,
  CiMail,
  CiSquareCheck,
  CiPhone,
  CiCalendar,
} from "react-icons/ci";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    role:"student"
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
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
    const isValidPassword = passwordRegex.test(formData.password);

    if (!isValidPassword) {
      toast.warning(
        "Password must be 8-16 characters long and include at least one letter, one number, and one special character."
      );
      return;
    }

    // Password match check
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    setPasswordMatch(true);

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidEmail(false);
      return;
    }
    setValidEmail(true);

    try {
    const response=  await axios.post("http://localhost:8080/api/users/authsignup", formData);
      toast.success(response.data.message);
    } catch (error) {
      
        console.log(error);
        toast.error(error.response.data.message);
    }
  };
  return (
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
        overflow: "hidden",
        padding: "0 10%",
      }}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-full md:w-96 lg:w-96 relative"
        style={{
          width: "100%", // Set width to 100%
          height: "100%", // Set height to 100%
          maxHeight: "80vh", // Adjust the maximum height as needed
          overflowY: "auto",
        }}
      >
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
        <h1 className="text-3xl font-bold mb-6">Registration</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <CiUser className="text-2xl" />
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
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
              value={formData.lastName}
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
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <CiPhone className="text-2xl" />
            <input
              required
              type="number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone No."
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <CiCalendar className="text-2xl" />
            <input
              required
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              placeholder="Date of Birth"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <div className="mt-1">
              <input
                type="radio"
                id="male"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="male" className="mr-4">
                Male
              </label>

              <input
                type="radio"
                id="female"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="female" className="mr-4">
                Female
              </label>

              <input
                type="radio"
                id="preferNotToSay"
                name="gender"
                value="Prefer not to say"
                checked={formData.gender === "Prefer not to say"}
                onChange={handleInputChange}
              />
              <label htmlFor="preferNotToSay">Prefer not to say</label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CiLock className="text-2xl" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {showPassword ? (
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={handleTogglePassword}
              />
            ) : (
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={handleTogglePassword}
              />
            )}
          </div>
          <div className="flex items-center space-x-2">
            <CiSquareCheck className="text-2xl" />
            <input
              required
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
            {showPassword ? (
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={handleTogglePassword}
              />
            ) : (
              <AiOutlineEye
                className="text-2xl cursor-pointer"
                onClick={handleTogglePassword}
              />
            )}
          </div>

          <div className="flex items-center space-x-2">
            <CiSquareCheck className="text-2xl" />
            <select
              required
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="" disabled>
                Select Course
              </option>
              <option value="Tafseer Course">Tafseer Course</option>
              <option value="Tajweed Course">Tajweed Course</option>
              <option value="Seerah Course">Seerah Course</option>
              <option value="Tarjuma Course">Sunnah Course</option>
            </select>
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
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
