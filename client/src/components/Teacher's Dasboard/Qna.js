import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Qna = () => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [reply, setReply] = useState("");
  const [questions, setQuestions] = useState([]);
  const teacherId = localStorage.getItem("teacherId"); // Get teacher ID from local storage

  useEffect(() => {
    fetch("http://localhost:8080/api/users/questions") // Updated URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setQuestions(data))
      .catch((error) => {
        console.error("Fetch error:", error); // Log fetch error
        toast.error("Error fetching questions: " + error.message);
      });
  }, []);

  const handleReplyClick = (question) => {
    setSelectedQuestion(question);
    setShowReplyBox(true);
  };

  const handleCloseReplyBox = () => {
    setShowReplyBox(false);
    setSelectedQuestion(null);
    setReply("");
  };

  const handleSubmitReply = () => {
    fetch("http://localhost:8080/api/users/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ansby: teacherId,
        question: selectedQuestion._id,
        answer: reply,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Answer submitted successfully!");
        setQuestions(
          questions.map((q) =>
            q._id === selectedQuestion._id ? { ...q, reply: data.answer } : q
          )
        );
        handleCloseReplyBox();
      })
      .catch((error) => {
        toast.error("Error submitting answer: " + error.message);
        console.error("Submit error:", error); // Debugging line
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="w-[90%] p-2 mx-2 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-[50%]">
          <h1 className="p-2">All Questions</h1>
          <Link to="/TeacherDashboard">
            <RxCross1 />
          </Link>
        </div>

        <div className="border-blue-500 border-2 text-center">
          <div className="flex flex-column gap-10 bg-blue-500 text-white py-4">
            <div className="w-[10rem] ml-7">Student</div>
            <div className="w-[29rem]">Question</div>
            <div className="w-[3rem]">Reply</div>
            <div className="w-[6rem]">Waiting since</div>
            <div className="w-[4rem]">Action</div>
          </div>
          {Array.isArray(questions) && questions.length > 0 ? (
            questions.map((item) => (
              <div
                key={item._id}
                className="flex item-center justify-center gap-10 border-b-2 text-blue-900 py-2 border-blue-500"
              >
                <div className="w-[10rem] ml-7 flex gap-2 justify-center">
                  <div>{item.askby?.firstName || "No Name"}</div>
                </div>
                <div className="w-[29rem] flex items-center justify-center">
                  {item.question}
                </div>
                <div className="w-[3rem] flex items-center justify-center">
                  {item.reply}
                </div>
                <div className="w-[6rem] flex items-center justify-center">
                  {new Date(item.waitingSince).toLocaleDateString()}
                </div>
                <div className="w-[4rem] flex items-center justify-center">
                  <button
                    onClick={() => handleReplyClick(item)}
                    className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>No questions available.</div>
          )}
        </div>

        {showReplyBox && selectedQuestion && (
          <div className="mt-4">
            <textarea
              className="w-full h-24 p-2 border rounded-lg"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply here..."
            />
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={handleSubmitReply}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
              <button
                onClick={handleCloseReplyBox}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Qna;
