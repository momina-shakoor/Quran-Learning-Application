import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentFeedback = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const feedback = [
    {
      courseName: "Surah Ibrahim",
      assessment: "Quiz 5",
      date: "5/11/23",
      teacherRemark: "Remark for quiz 5",
    },
    {
      courseName: "Surah Ibrahim",
      assessment: "Quiz 5",
      date: "5/11/23",
      teacherRemark: "Remark for quiz 5",
    },
    {
      courseName: "Surah Ibrahim",
      assessment: "Quiz 5",
      date: "5/11/23",
      teacherRemark: "Remark for quiz 5",
    },
    {
      courseName: "Surah Ibrahim",
      assessment: "Quiz 5",
      date: "5/11/23",
      teacherRemark: "Remark for quiz 5",
    },
    {
      courseName: "Surah Ibrahim",
      assessment: "Quiz 5",
      date: "5/11/23",
      teacherRemark: "Remark for quiz 5",
    },
  ];

  const openDialog = (feedback) => {
    setSelectedFeedback(feedback);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="lg:w-[50%] h-[60%] mx-2 p-2 bg-white rounded-lg shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center p-2">
          <h1 className="text-2xl text-yellow-600">Feedback</h1>
          <Link to="/Dashboard">
            <button className="text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="border-2 border-yellow-600 bg-yellow-600 text-yellow-200 flex flex-wrap gap-2 px-6 text-xl">
          <div className="mr-10">Course Name</div>
          <div className="mr-10">Assessment</div>
          <div className="mr-10">Date</div>
        </div>
        {feedback.map((item, key) => (
          <div
            key={key}
            className="border-b border-yellow-600 flex flex-wrap gap-2 px-6 text-gray-800 py-2"
          >
            <div className="mr-14">{item.courseName}</div>
            <div className="mr-24">{item.assessment}</div>
            <div className="mr-20">{item.date}</div>
            <div
              className="bg-yellow-600 px-2 rounded-lg hover:scale-105 transition-transform duration-300 text-yellow-200 cursor-pointer"
              onClick={() => openDialog(item)}
            >
              <button>See Feedback</button>
            </div>
          </div>
        ))}
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 z-60 flex justify-center items-center bg-opacity-75 bg-black">
          <div className="w-[80%] lg:w-[40%] bg-white p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-yellow-600">Teacher's Remarks</h2>
              <button className="text-gray-500" onClick={closeDialog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p>{selectedFeedback?.teacherRemark}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentFeedback;
