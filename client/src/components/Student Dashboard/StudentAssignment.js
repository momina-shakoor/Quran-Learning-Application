import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";

const FeedbackModal = ({ feedback, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg max-w-md w-full">
        <h2 className="text-2xl mb-4">Feedback</h2>
        <p>{feedback}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const StudentAssignment = () => {
  const [Assignments, setAssignments] = useState();
  const fecthAssignmnets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/users/allassignmnets"
      );
      setAssignments(response.data.allassignments);
    } catch (error) {}
  };

  useEffect(() => {
    fecthAssignmnets();
  }, []);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const assignmentHistory = [
    {
      date: "2024-05-28",
      totalXp: "40",
      obtainedXp: "35",
      courseName: "Introduction to Quranic Arabic",
      feedback: "The course was very informative and well-structugreen.",
    },
    {
      date: "2024-05-29",
      totalXp: "30",
      obtainedXp: "28",
      courseName: "Tajweed Basics",
      feedback: "Great course with clear explanations and practice sessions.",
    },
    {
      date: "2024-05-30",
      totalXp: "35",
      obtainedXp: "32",
      courseName: "Memorization Techniques",
      feedback: "Helpful techniques but could use more examples.",
    },
    {
      date: "2024-05-31",
      totalXp: "40",
      obtainedXp: "37",
      courseName: "Understanding Quranic Grammar",
      feedback: "Excellent course with thorough grammar lessons.",
    },
    {
      date: "2024-06-01",
      totalXp: "25",
      obtainedXp: "20",
      courseName: "Quranic Tafseer",
      feedback: "In-depth and detailed, but sometimes felt too fast-paced.",
    },
  ];

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const closeFeedbackModal = () => {
    setSelectedFeedback(null);
  };
  const capitalizeFirstLetterOfEachWord = (string) => {
    if (!string) return "";
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-wrap h-[100vh] ">
      <div className="bg-green-500 text-white  w-[20%] h-full fixed">
        <div className="text-2xl  font-bold p-2 flex flex-wrap  ">
          <h1>Dash</h1>
          <h1>Board</h1>
        </div>
        <div className=" mt-10 ">
          <Link to="/Dashboard">
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
          <div className="mb-2 text-lg flex flex-wrap gap-2  py-2 lg:px-4 md:px-4 md:mx-2 lg:mx-2 ml-1 border-b text-red-600  border-white hover-effect w-[80%]">
            <RiLogoutCircleLine className="mt-1" />
            Logout
          </div>
        </div>
      </div>
      <div className="w-[80%] p-3 ml-[20%] ">
        <h1 className="text-2xl text-green-800">Assignments</h1>
        <div className="bg-green-500 p-2 flex flex-wrap item-center mb-2 text-white">
          <div className=" w-[70%]">
            {Assignments?.map((item) => {
              return (
                <div className="flex justify-between">
                  <div className="">
                    <h1>
                      Subject:
                      {capitalizeFirstLetterOfEachWord(item.course?.courseName)}
                    </h1>

                    <h2>
                      Topic:
                      {capitalizeFirstLetterOfEachWord(item.assignmentTopic)}
                    </h2>
                    <h2>Question:{item.assignmentQuestion}</h2>
                  </div>
                  <div>
                    <Link
                      to="/attemptassignment"
                      className="m-8 px-2 text-xl bg-white text-green-500 rounded-lg hover:scale-105 transition-transform duration-300"
                    >
                      Attempt
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" p-2">
          <h1 className="text-green-500 text-2xl">Previous Assignments</h1>
          {assignmentHistory.map((item, key) => (
            <div
              key={key}
              className="p-2 bg-green-500 mb-2 text-white flex flex-wrap items-center "
            >
              <div className="w-[60%]">
                <div>Date: {item.date} </div>
                <div>Total Xp: {item.totalXp} </div>
                <div>Obtained Xp: {item.obtainedXp} </div>
                <div>Course Name: {item.courseName} </div>
              </div>
              <div
                className="text-green-500 bg-white px-2 rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleFeedbackClick(item.feedback)}
              >
                View Feedback
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedFeedback && (
        <FeedbackModal
          feedback={selectedFeedback}
          onClose={closeFeedbackModal}
        />
      )}
    </div>
  );
};

export default StudentAssignment;
