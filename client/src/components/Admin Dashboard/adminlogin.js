import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch} from 'react-redux';
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/action";
const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
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
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/adminlogin",
        data
      );
      const userfound=response.data.user;
     
     
      console.log(response);
      dispatch(loginUser(userfound));
      toast.success(response.data.message);
       navigate("/AdminDashboard");
    
    } catch (error) {
      setError("Problem in Logging in");
      toast.error("Problem in Logging in");
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

        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <CiUser className="text-2xl" />
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
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
