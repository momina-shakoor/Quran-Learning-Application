import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    courseName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:8080/api/users/addcourse",
        form
      );
      // Update the courses state with the newly added course
      setCourses([...courses, data.data.newCourse]);
      // Clear the form
      setForm({ courseName: "" });
      toast.success(data.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const AllCourses = async () => {
    try {
      const data = await axios.get(
        "http://localhost:8080/api/users/allcourses"
      );
      setCourses(data.data.allcourses);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AllCourses();
  }, []);

  const editCourse = (course) => {
    setForm(course);
  };

  const deleteCourse = async (id) => {
    try {
      const deletecourse = await axios.delete(
        `http://localhost:8080/api/users/deletecourse/${id}`
      );
      const filtercourse = courses.filter((item) => item._id !== id);
      setCourses(filtercourse);
      toast.success(deletecourse.data.message);
    } catch (error) {
      toast.error("Error in deleting Course");
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="courseName"
                value={form.courseName}
                onChange={handleChange}
                placeholder="Course Name"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full md:w-auto p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              {form._id ? "Update" : "Add"} Course
            </button>
          </form>

          <div className="overflow-x-auto h-64">
            <table className="w-full table-auto bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2 border-b">Course Name</th>
                  <th className="p-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="p-2 border-b">{course.courseName}</td>
                    <td className="p-2 border-b space-x-2">
                      <button
                        onClick={() => editCourse(course)}
                        className="p-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
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

export default AdminCourse;
