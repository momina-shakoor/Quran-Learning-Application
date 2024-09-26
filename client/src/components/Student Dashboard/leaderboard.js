import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/leaderboard"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-black">
        <div className="lg:w-[40%] p-6 mx-2 bg-white rounded-lg shadow-lg">
          <div className="flex flex-wrap justify-between items-center w-full gap-2 mb-4">
            <div className="flex gap-2">
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <Link to="/Dashboard">
                <RxCross1 className="mt-2" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {students.map((student, index) => (
              <div
                key={student.id}
                className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold">
                    {student.firstName} {student.lastName}
                  </h2>
                  <p className="text-gray-600">XP: {student.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
