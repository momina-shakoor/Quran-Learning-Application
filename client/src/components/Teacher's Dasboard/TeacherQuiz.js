import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";
import { FaCalendarAlt, FaClipboardList, FaPlus } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

const API_URL = "http://localhost:8080/api/users";

const emptyQuiz = {
  quizeTopic: "",
  deadline: "",
  quizeQuestion: "",
  course: "",
};

const TeacherQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [newQuiz, setNewQuiz] = useState(emptyQuiz);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAttemptsDialog, setShowAttemptsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingAttempts, setIsLoadingAttempts] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/allcourses`);
      setCourses(data.allcourses || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load courses.");
    }
  };

  const fetchQuizzes = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/allquizes`);
      setQuizzes(data.allQuizes || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load quizzes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchQuizzes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((current) => ({ ...current, [name]: value }));
  };

  const closeCreateDialog = () => {
    setShowCreateDialog(false);
    setNewQuiz(emptyQuiz);
  };

  const handleSubmitQuiz = async (e) => {
    e.preventDefault();

    if (
      !newQuiz.quizeTopic.trim() ||
      !newQuiz.quizeQuestion.trim() ||
      !newQuiz.course
    ) {
      toast.error("Complete the quiz title, question, and course.");
      return;
    }

    setIsCreating(true);
    try {
      const { data } = await axios.post(`${API_URL}/addquize`, {
        ...newQuiz,
        quizeTopic: newQuiz.quizeTopic.trim(),
        quizeQuestion: newQuiz.quizeQuestion.trim(),
      });

      toast.success(data.message || "Quiz created.");
      closeCreateDialog();
      await fetchQuizzes();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create quiz.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleViewAttempts = async (quiz) => {
    setShowAttemptsDialog(true);
    setIsLoadingAttempts(true);
    setAttempts([]);

    try {
      const { data } = await axios.get(`${API_URL}/attemptofquize/${quiz._id}`);
      setAttempts(data.quizAttempts || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not load quiz attempts.",
      );
    } finally {
      setIsLoadingAttempts(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Not set";
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? "Not set"
      : parsedDate.toLocaleDateString();
  };

  return (
    <main className="min-h-screen bg-[#f4f7f2] text-slate-800">
      <header className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/TeacherDashboard"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50"
          >
            <IoChevronBackSharp aria-hidden="true" />
            Dashboard
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Teacher workspace
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Assessments
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
              Quizzes
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Create quizzes and review student submissions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateDialog(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
          >
            <FaPlus aria-hidden="true" />
            Create quiz
          </button>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#12372a]">Quiz list</h2>
            <span className="text-sm text-slate-500">
              {quizzes.length} {quizzes.length === 1 ? "quiz" : "quizzes"}
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-emerald-950/10 bg-white px-5 py-12 text-center text-slate-500">
              Loading quizzes…
            </div>
          ) : quizzes.length === 0 ? (
            <div className="rounded-2xl border border-emerald-950/10 bg-white px-5 py-12 text-center">
              <MdOutlineQuiz className="mx-auto text-4xl text-emerald-700" />
              <p className="mt-3 font-semibold text-slate-700">
                No quizzes available
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Create a quiz to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {quizzes.map((quiz) => (
                <article
                  key={quiz._id}
                  className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <MdOutlineQuiz className="text-2xl" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-[#12372a]">
                        {quiz.quizeTopic}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {quiz.course?.courseName ||
                          courses.find((course) => course._id === quiz.course)
                            ?.courseName ||
                          "Course not specified"}
                      </p>
                    </div>
                  </div>

                  {quiz.quizeQuestion && (
                    <p className="mt-4 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                      {quiz.quizeQuestion}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FaCalendarAlt aria-hidden="true" />
                      Created {formatDate(quiz.createdAt)}
                    </span>
                    {quiz.deadline && (
                      <span className="inline-flex items-center gap-1.5">
                        <FaCalendarAlt aria-hidden="true" />
                        Due {formatDate(quiz.deadline)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleViewAttempts(quiz)}
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-800/20 px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <FaClipboardList aria-hidden="true" />
                    View submissions
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {showCreateDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeCreateDialog();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-quiz-title"
            className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="create-quiz-title"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Create a quiz
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add the quiz details for your students.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCreateDialog}
                aria-label="Close"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <RxCross1 aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmitQuiz} className="space-y-4 p-5 sm:p-7">
              <div>
                <label
                  htmlFor="quizeTopic"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Quiz title
                </label>
                <input
                  id="quizeTopic"
                  name="quizeTopic"
                  value={newQuiz.quizeTopic}
                  onChange={handleInputChange}
                  maxLength={120}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  placeholder="Enter a quiz title"
                />
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={newQuiz.course}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
                {courses.length === 0 && (
                  <p className="mt-2 text-sm text-amber-700">
                    No courses found. Add a course before creating a quiz.
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="deadline"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Deadline (optional)
                </label>
                <input
                  id="deadline"
                  type="datetime-local"
                  name="deadline"
                  value={newQuiz.deadline}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </div>

              <div>
                <label
                  htmlFor="quizeQuestion"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Question
                </label>
                <textarea
                  id="quizeQuestion"
                  name="quizeQuestion"
                  value={newQuiz.quizeQuestion}
                  onChange={handleInputChange}
                  rows={5}
                  maxLength={5000}
                  required
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  placeholder="Enter the quiz question"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeCreateDialog}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || courses.length === 0}
                  className="rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isCreating ? "Creating…" : "Create quiz"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {showAttemptsDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="attempts-title"
            className="my-8 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="attempts-title"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Quiz submissions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Review responses submitted by students.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowAttemptsDialog(false);
                  setSelectedSubmission(null);
                }}
                aria-label="Close submissions"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <RxCross1 aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 p-5 sm:p-7">
              {isLoadingAttempts ? (
                <p className="py-10 text-center text-slate-500">
                  Loading submissions…
                </p>
              ) : attempts.length === 0 ? (
                <p className="py-10 text-center text-slate-500">
                  No submissions available for this quiz.
                </p>
              ) : (
                attempts.map((submission) => (
                  <button
                    key={submission._id}
                    type="button"
                    onClick={() => setSelectedSubmission(submission)}
                    className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-800/30 hover:bg-emerald-50/50"
                  >
                    <span className="block font-semibold text-slate-800">
                      {submission.attemptBy
                        ? `${submission.attemptBy.firstName || ""} ${
                            submission.attemptBy.lastName || ""
                          }`.trim() || "Student"
                        : "Student"}
                    </span>
                    <span className="mt-1 block line-clamp-2 text-sm text-slate-600">
                      {submission.quizAnswer || "No response text"}
                    </span>
                    <span className="mt-2 block text-xs text-slate-500">
                      Submitted {formatDate(submission.createdAt)}
                    </span>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>
      )}

      {selectedSubmission && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/60 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="response-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2
                id="response-title"
                className="text-lg font-bold text-[#12372a]"
              >
                Student response
              </h2>
              <button
                type="button"
                onClick={() => setSelectedSubmission(null)}
                aria-label="Close response"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <RxCross1 aria-hidden="true" />
              </button>
            </div>
            <div className="p-5">
              <p className="mb-2 text-sm font-medium text-slate-500">
                {selectedSubmission.attemptBy
                  ? `${selectedSubmission.attemptBy.firstName || ""} ${
                      selectedSubmission.attemptBy.lastName || ""
                    }`.trim() || "Student"
                  : "Student"}
              </p>
              <p className="whitespace-pre-wrap break-words leading-7 text-slate-700">
                {selectedSubmission.quizAnswer || "No response text"}
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default TeacherQuiz;
