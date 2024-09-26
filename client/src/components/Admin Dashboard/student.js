import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
const AdminStudent = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/users/authsignup",
        form
      );

      toast.success(data.message);

      setStudents((prevStudents) => [
        ...prevStudents,
        { ...form, _id: data.studentId },
      ]);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        dob: "",
        role: "student",
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getStudents = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/users/allauths"
      );
      const students = data.AllAuths.filter((item) => item.role === "student");
      setStudents(students);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const editStudent = (student) => {
    setForm(student);
  };

  const deleteStudent = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/users/deleteauth/${id}`
      );
      setStudents((prevStudents) =>
        prevStudents.filter((item) => item._id !== id)
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting Student");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="lg:w-[80%] w-full h-full p-2 mx-2 bg-white rounded-lg shadow-lg">
        <Link to="/admindashboard" className="text-gray-500">
          <RxCross1 />
        </Link>
        <div className="p-4 max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 bg-white rounded-lg shadow-md"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 py-2"
                >
                  {showPassword ? (
                    <FaRegEyeSlash className="h-6 w-6 text-gray-500" />
                  ) : (
                    <FaRegEye className="h-6 w-6 text-gray-500" />
                  )}
                </button>
              </div>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                placeholder="Date of Birth"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full md:w-auto p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {form.id ? "Update" : "Add"} Student
            </button>
          </form>

          <div className="overflow-x-auto h-64">
            <table className="w-full table-auto bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border-b">First Name</th>
                  <th className="p-2 border-b">Last Name</th>
                  <th className="p-2 border-b">Email</th>
                  <th className="p-2 border-b">Date of Birth</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students?.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{student.firstName}</td>
                    <td className="p-2 border-b">{student.lastName}</td>
                    <td className="p-2 border-b">{student.email}</td>
                    <td className="p-2 border-b">{student.dob}</td>
                    <td className="p-2 border-b space-x-2">
                      <button
                        onClick={() => editStudent(student)}
                        className="p-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteStudent(student._id)}
                        className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudent;
