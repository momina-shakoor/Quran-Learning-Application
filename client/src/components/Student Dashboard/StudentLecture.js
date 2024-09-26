import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaRegUser } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";

const StudentLecture = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/lessons"
        );
        setLessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchLessons();
  }, []);

  return (
    <div className="flex flex-wrap h-[100vh] ">
      <div className="bg-[#172285] text-white w-[20%] h-full fixed">
        <div className="text-2xl font-bold p-2 flex flex-wrap ">
          <h1>Dash</h1>
          <h1>Board</h1>
        </div>
        <div className="mt-10 ">
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
          <div className="mb-2 text-lg flex flex-wrap gap-2 py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b text-red-600 border-white hover-effect w-[80%]">
            <RiLogoutCircleLine className="mt-1" />
            Logout
          </div>
        </div>
      </div>
      <div className="w-[80%] ml-[20%] p-4">
        <h2 className="text-2xl font-bold mb-4">Available Lessons</h2>
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson._id}
              className="p-4 border border-gray-300 rounded"
            >
              <h3 className="text-xl font-bold">{lesson.lessonType} Lesson</h3>
              {lesson.lessonType === "text" && <p>{lesson.textLesson}</p>}
              {lesson.lessonType === "audio" && (
                <audio controls>
                  <source src={lesson.audioFile} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {lesson.lessonType === "file" && (
                <a href={lesson.otherFile} download>
                  Download File
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentLecture;
