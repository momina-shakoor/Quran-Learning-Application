import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaHome, FaRegUser, FaBookOpen, FaPlay } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logoutUser } from "../redux/action";

const navigation = [
  { label: "Dashboard", to: "/Dashboard", icon: FaHome },
  { label: "Profile", to: "/studentprofile", icon: FaRegUser },
  { label: "Leaderboard", to: "/leaderboard", icon: FaBarsProgress },
];

const StudentQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let isActive = true;

    const fetchQuizzes = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/allquizes",
        );

        if (isActive) {
          setQuizzes(
            Array.isArray(response.data?.allQuizes)
              ? response.data.allQuizes
              : [],
          );
        }
      } catch {
        if (isActive) {
          setError("Quizzes couldn’t be loaded. Please try again.");
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchQuizzes();

    return () => {
      isActive = false;
    };
  }, [reload]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const getQuestionPreview = (question = "") => {
    if (question.length <= 170) return question;
    return `${question.slice(0, 170).trim()}…`;
  };

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-slate-800 lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#12372a] px-5 py-7 text-white lg:flex">
        <Link to="/" className="px-3 text-xl font-bold tracking-tight">
          Marfat-ul-Quran
        </Link>

        <p className="mt-12 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/60">
          Student menu
        </p>

        <nav className="mt-4 space-y-1" aria-label="Student navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
        >
          <RiLogoutCircleLine className="h-5 w-5" aria-hidden="true" />
          Log out
        </button>
      </aside>

      <header className="sticky top-0 z-30 border-b border-emerald-950/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold text-[#12372a]">
            Marfat-ul-Quran
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <RiLogoutCircleLine className="h-5 w-5" aria-hidden="true" />
            Log out
          </button>
        </div>

        <nav
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
          aria-label="Student navigation"
        >
          {navigation.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="shrink-0 rounded-full bg-[#f3f5ef] px-4 py-2 text-sm font-medium text-[#12372a] hover:bg-emerald-100"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-9 lg:px-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Practice and review
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a]">
              Your quizzes
            </h1>
            <p className="mt-2 text-slate-600">
              Choose a quiz to review what you’ve learned.
            </p>
          </div>

          <Link
            to="/Dashboard"
            className="rounded-lg border border-emerald-900/15 bg-white px-4 py-2.5 text-sm font-semibold text-[#12372a] transition hover:bg-emerald-50"
          >
            Back to dashboard
          </Link>
        </header>

        {!loading && !error && quizzes.length > 0 && (
          <div className="mt-7 flex items-center gap-3 rounded-xl border border-emerald-950/10 bg-white px-4 py-3 text-sm text-slate-600">
            <FaBookOpen
              className="h-5 w-5 text-emerald-800"
              aria-hidden="true"
            />
            <span>
              <strong className="text-[#12372a]">{quizzes.length}</strong>{" "}
              {quizzes.length === 1 ? "quiz" : "quizzes"} available
            </span>
          </div>
        )}

        {loading ? (
          <div
            className="mt-6 rounded-2xl border border-emerald-950/10 bg-white p-6 text-slate-600"
            role="status"
          >
            Loading quizzes…
          </div>
        ) : error ? (
          <div
            className="mt-6 rounded-2xl border border-red-200 bg-white p-6"
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
        ) : quizzes.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-emerald-950/10 bg-white p-8 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
              <FaBookOpen className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-bold text-[#12372a]">
              No quizzes available yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Check back when your teacher has added a quiz.
            </p>
          </div>
        ) : (
          <section
            className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            aria-label="Available quizzes"
          >
            {quizzes.map((quiz) => (
              <article
                key={quiz._id}
                className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                    <FaBookOpen className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                      {quiz.course?.courseName || "Quran learning"}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-[#12372a]">
                      {quiz.quizeTopic || "Untitled quiz"}
                    </h2>
                  </div>
                </div>

                {quiz.quizeQuestion && (
                  <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                    {getQuestionPreview(quiz.quizeQuestion)}
                  </p>
                )}

                <Link
                  to={`/attemptquiz/${quiz._id}`}
                  className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#12372a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
                >
                  <FaPlay className="h-3 w-3" aria-hidden="true" />
                  Start quiz
                </Link>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default StudentQuiz;
