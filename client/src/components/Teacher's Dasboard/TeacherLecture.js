import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaHome, FaRegUser } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TeacherLecture = () => {
  const [lessonType, setLessonType] = useState("text"); // text, audio, file
  const [textLesson, setTextLesson] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/lessons"
      );
      setLessons(response.data);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("Failed to fetch lessons");
    }
  };

  const handleFileChange = (e) => {
    if (lessonType === "audio") {
      setAudioFile(e.target.files[0]);
    } else if (lessonType === "file") {
      setOtherFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e) => {
    setTextLesson(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("lessonType", lessonType);

    if (lessonType === "text") {
      formData.append("textLesson", textLesson);
    } else if (lessonType === "audio") {
      formData.append("audioFile", audioFile);
    } else if (lessonType === "file") {
      formData.append("otherFile", otherFile);
    }

    try {
      await axios.post("http://localhost:8080/api/users/lessons", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Lesson created successfully!");
      fetchLessons(); // Refresh the lesson list
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("Error creating lesson");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/lessons/${id}`);
      toast.success("Lesson deleted successfully!");
      fetchLessons(); // Refresh the lesson list
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("Error deleting lesson");
    }
  };

  return (
    <div className="flex flex-wrap h-[100vh]">
      <ToastContainer />
      <div className="bg-[#172285] text-white w-[20%] h-full fixed">
        <div className="text-2xl font-bold p-2 flex flex-wrap ">
          <h1>Dash</h1>
          <h1>Board</h1>
        </div>
        <div className="mt-10">
          <Link to="/TeacherDashboard">
            <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
              <IoChevronBackSharp className="mt-1" />
              Back
            </div>
          </Link>
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
          <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b border-white hover-effect w-[80%]">
            <RiLogoutCircleLine className="mt-1" />
            Logout
          </div>
        </div>
      </div>

      <div className="w-[80%] h-full ml-[20%] p-10">
        <h1 className="text-4xl font-bold mb-8">Create Lesson</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label
              htmlFor="lessonType"
              className="block text-lg font-medium mb-2"
            >
              Lesson Type
            </label>
            <select
              id="lessonType"
              value={lessonType}
              onChange={(e) => setLessonType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="file">File</option>
            </select>
          </div>

          {lessonType === "text" && (
            <div className="mb-4">
              <label
                htmlFor="textLesson"
                className="block text-lg font-medium mb-2"
              >
                Text Lesson
              </label>
              <textarea
                id="textLesson"
                value={textLesson}
                onChange={handleTextChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}

          {lessonType === "audio" && (
            <div className="mb-4">
              <label
                htmlFor="audioFile"
                className="block text-lg font-medium mb-2"
              >
                Audio File
              </label>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}

          {lessonType === "file" && (
            <div className="mb-4">
              <label htmlFor="file" className="block text-lg font-medium mb-2">
                File
              </label>
              <input
                type="file"
                accept="*/*"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Create Lesson
          </button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4">Lesson List</h2>
        <ul className="space-y-4">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <li
                key={lesson._id}
                className="p-4 border border-gray-300 rounded"
              >
                <p>Type: {lesson.lessonType}</p>
                {lesson.lessonType === "text" && (
                  <p>Text: {lesson.textLesson}</p>
                )}
                {lesson.lessonType === "audio" && (
                  <p>Audio File: {lesson.audioFile}</p>
                )}
                {lesson.lessonType === "file" && (
                  <p>File: {lesson.otherFile}</p>
                )}
                <button
                  onClick={() => handleDelete(lesson._id)}
                  className="mt-2 py-1 px-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No lessons available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeacherLecture;
