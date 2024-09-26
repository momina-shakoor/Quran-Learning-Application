import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const StudentQna = () => {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuestions(data); // Set the fetched data to state
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, []);

  const handleSubmitQuestion = () => {
    if (!question.trim()) {
      toast.error("Question cannot be empty.");
      return;
    }

    fetch("http://localhost:8080/api/users/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: question,
        askby: "6490f25d68aebc7f913b8a57", // Replace with actual user ID
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Question submitted successfully!");
        setQuestions((prevQuestions) => [...prevQuestions, data]); // Update state with new question
        setQuestion(""); // Clear the input
      })
      .catch((error) =>
        toast.error("Error submitting question: " + error.message)
      );
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
      <div className="w-[90%] p-2 mx-2 bg-white rounded-lg shadow-lg">
        <div className="flex flex-wrap gap-[50%]">
          <h1 className="p-2">Ask a Question</h1>
          <Link to="/Dashboard">
            <RxCross1 />
          </Link>
          <div className="flex flex-wrap gap-8">
            <div className="p-2 hover:border-b-2 border-blue-500 hover:text-blue-500">
              All({questions.length})
            </div>
          </div>
        </div>

        <div className="border-blue-500 border-2 text-center">
          <div className="flex flex-column gap-10 bg-blue-500 text-white py-4">
            <div className="w-[10rem] ml-7">Student</div>
            <div className="w-[29rem]">Question</div>
            <div className="w-[3rem]">Reply</div>
            <div className="w-[6rem]">Waiting since</div>
          </div>
          {questions.map((item) => (
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
                {item.reply || "No Reply"}
              </div>
              <div className="w-[6rem] flex items-center justify-center">
                {item.waitingSince
                  ? new Date(item.waitingSince).toLocaleDateString()
                  : "N/A"}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <textarea
            className="w-full h-24 p-2 border rounded-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question here..."
          />
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={handleSubmitQuestion}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQna;
