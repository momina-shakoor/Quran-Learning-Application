import React, { useState } from "react";

const AttemptAssignment = () => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answer:", answer);
    setAnswer("");
  };

  return (
    <div className="max-w-lg mx-auto my-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Assignment Question
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        What are the key components of the MERN stack?
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label
          className="text-sm font-medium text-gray-900 mb-2"
          htmlFor="answer"
        >
          Your Answer:
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          rows="10"
          className="p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AttemptAssignment;
