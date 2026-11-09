import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let isActive = true;

    const fetchLeaderboard = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/leaderboard",
        );

        if (isActive) {
          setStudents(Array.isArray(response.data) ? response.data : []);
        }
      } catch {
        if (isActive) {
          setError("The leaderboard couldn’t be loaded. Please try again.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchLeaderboard();

    return () => {
      isActive = false;
    };
  }, [reload]);

  const topStudents = students.slice(0, 3);
  const remainingStudents = students.slice(3);

  const getRankStyle = (index) => {
    if (index === 0) return "bg-amber-100 text-amber-800";
    if (index === 1) return "bg-slate-200 text-slate-700";
    if (index === 2) return "bg-orange-100 text-orange-800";
    return "bg-emerald-50 text-emerald-800";
  };

  const StudentRow = ({ student, index }) => {
    const name =
      [student.firstName, student.lastName].filter(Boolean).join(" ") ||
      "Student";

    return (
      <li className="flex items-center gap-4 rounded-xl border border-emerald-950/10 bg-white p-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${getRankStyle(index)}`}
        >
          {index + 1}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-[#12372a]">{name}</p>
          <p className="text-sm text-slate-500">Rank #{index + 1}</p>
        </div>

        <p className="shrink-0 text-sm font-semibold text-emerald-800">
          {Number(student.score || 0).toLocaleString()} XP
        </p>
      </li>
    );
  };

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to dashboard
        </Link>

        <header className="mt-8 rounded-3xl bg-gradient-to-br from-[#12372a] to-emerald-800 p-6 text-white sm:p-9">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-300 text-[#12372a]">
              <FaTrophy className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                Student progress
              </p>
              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
                Leaderboard
              </h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl leading-7 text-emerald-50/80">
            See how learners are progressing and celebrate their achievements.
          </p>
        </header>

        <section className="mt-8" aria-label="Student rankings">
          {loading ? (
            <div
              className="rounded-2xl border border-emerald-950/10 bg-white p-6 text-slate-600"
              role="status"
            >
              Loading leaderboard…
            </div>
          ) : error ? (
            <div
              className="rounded-2xl border border-red-200 bg-white p-6"
              role="alert"
            >
              <p className="text-red-700">{error}</p>
              <button
                type="button"
                onClick={() => setReload((value) => value + 1)}
                className="mt-4 rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
              >
                Try again
              </button>
            </div>
          ) : students.length === 0 ? (
            <div className="rounded-2xl border border-emerald-950/10 bg-white p-6 text-slate-600">
              No student scores are available yet.
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {topStudents.map((student, index) => (
                  <StudentRow
                    key={student._id || student.id || index}
                    student={student}
                    index={index}
                  />
                ))}
              </div>

              {remainingStudents.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-lg font-bold text-[#12372a]">
                    More learners
                  </h2>
                  <ol className="space-y-3">
                    {remainingStudents.map((student, index) => (
                      <StudentRow
                        key={student._id || student.id || index + 3}
                        student={student}
                        index={index + 3}
                      />
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default Leaderboard;
