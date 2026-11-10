import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowLeft, FaClipboardList } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/users";

const AttemptAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.custom.user);

  const [assignment, setAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?._id) {
      navigate("/login", { replace: true });
      return;
    }

    let isActive = true;

    const fetchAssignment = async () => {
      setLoading(true);
      setError("");

      try {
        // The current backend has an all-assignments endpoint, so find this
        // assignment in its response by the ID from the URL.
        const response = await axios.get(`${API_URL}/allassignments`);
        const assignments = response.data?.allassignments || [];
        const selectedAssignment = assignments.find((item) => item._id === id);

        if (!selectedAssignment) {
          throw new Error("This assignment couldn’t be found.");
        }

        if (isActive) {
          setAssignment(selectedAssignment);
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError.response?.data?.message ||
              requestError.message ||
              "Could not load this assignment.",
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchAssignment();

    return () => {
      isActive = false;
    };
  }, [id, user?._id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedAnswer = answer.trim();

    if (!trimmedAnswer) {
      toast.error("Write your answer before submitting.");
      return;
    }

    if (!user?._id) {
      toast.error("Please log in again before submitting.");
      navigate("/login");
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(`${API_URL}/submittassignment`, {
        assignmentAnswer: trimmedAnswer,
        assignment: assignment._id,
        attemptBy: user._id,
      });

      toast.success(response.data?.message || "Assignment submitted.");
      navigate("/studentassignment");
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        "Could not submit your answer. Please try again.";

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/studentassignment"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to assignments
        </Link>

        {loading ? (
          <div
            className="mt-7 rounded-2xl border border-emerald-950/10 bg-white p-6 text-slate-600"
            role="status"
          >
            Loading assignment…
          </div>
        ) : error ? (
          <div
            className="mt-7 rounded-2xl border border-red-200 bg-white p-6"
            role="alert"
          >
            <p className="text-red-700">{error}</p>
          </div>
        ) : assignment ? (
          <section className="mt-7 overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-[#12372a] to-emerald-800 p-6 text-white sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-amber-300">
                <FaClipboardList className="h-6 w-6" aria-hidden="true" />
              </span>

              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                {assignment.course?.courseName || "Course assignment"}
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                {assignment.assignmentTopic || "Assignment"}
              </h1>
            </div>

            <div className="p-6 sm:p-8">
              <div className="rounded-2xl bg-[#fbfaf5] p-5 sm:p-6">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
                  Question
                </h2>
                <p className="mt-3 whitespace-pre-wrap text-base leading-7 text-slate-700">
                  {assignment.assignmentQuestion ||
                    "No question details are available."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7">
                <label
                  htmlFor="assignment-answer"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your answer
                </label>
                <textarea
                  id="assignment-answer"
                  value={answer}
                  onChange={(event) => setAnswer(event.target.value)}
                  required
                  minLength={2}
                  maxLength={5000}
                  rows={8}
                  placeholder="Write your answer here…"
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                />

                <p className="mt-2 text-right text-xs text-slate-500">
                  {answer.length}/5000
                </p>

                <button
                  type="submit"
                  disabled={submitting || !answer.trim()}
                  className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#12372a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48"
                >
                  {submitting ? "Submitting…" : "Submit assignment"}
                </button>
              </form>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default AttemptAssignment;
