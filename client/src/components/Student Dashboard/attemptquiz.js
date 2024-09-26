// src/AttemptQuiz.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const AttemptQuiz = () => {
  const user = useSelector((state) => state.custom.user);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizData, setQuizData] = useState({});
  const { id } = useParams(); // Getting the id from the URL

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/singlequize/${id}`
        );
        setQuizData(response.data.quiz);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/attemptquize",
        {
          quizAnswer: selectedOption,
          quiz: id,
          attemptBy: user._id,
        }
      );
      console.log(response.data);
      setSelectedOption("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <Link to="/studentquiz">
        <RxCross1 />
      </Link>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {quizData?.quizeTopic}
      </h1>

      <p className="text-lg text-gray-700 mb-6">{quizData?.quizeQuestion}</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-sm font-medium text-gray-900 mb-2">
          Your Answer:
        </label>
        <textarea
          className="border"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="py-2 mt-4 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttemptQuiz;
