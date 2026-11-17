import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoChevronBackSharp } from "react-icons/io5";
import { MdAssignment, MdDeleteOutline } from "react-icons/md";
import { FaCalendarAlt, FaPlus } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";

const API_URL = "http://localhost:8080/api/users";

const emptyAssignment = {
  assignmentTopic: "",
  deadline: "",
  assignmentQuestion: "",
  course: "",
};

const getId = (value) => {
  if (!value) return "";
  return typeof value === "object" ? value._id : value;
};

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [newAssignment, setNewAssignment] = useState(emptyAssignment);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchAssignments = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/allassignments`);
      setAssignments(data.allassignments || data.allAssignments || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not load assignments.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/allcourses`);
      setCourses(data.allcourses || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load courses.");
    }
  };

  useEffect(() => {
    fetchAssignments();
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment((current) => ({ ...current, [name]: value }));
  };

  const closeCreateDialog = () => {
    setShowCreateDialog(false);
    setNewAssignment(emptyAssignment);
  };

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();

    if (
      !newAssignment.assignmentTopic.trim() ||
      !newAssignment.assignmentQuestion.trim() ||
      !newAssignment.course
    ) {
      toast.error("Complete the title, course, and assignment details.");
      return;
    }

    setIsCreating(true);
    try {
      const { data } = await axios.post(`${API_URL}/addassignment`, {
        ...newAssignment,
        assignmentTopic: newAssignment.assignmentTopic.trim(),
        assignmentQuestion: newAssignment.assignmentQuestion.trim(),
      });

      toast.success(data.message || "Assignment created.");
      closeCreateDialog();
      await fetchAssignments();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not create assignment.",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleViewSubmissions = async (assignment) => {
    setSelectedAssignment(assignment);
    setSelectedSubmission(null);
    setShowSubmissionDialog(true);
    setIsLoadingSubmissions(true);
    setAttempts([]);

    try {
      const { data } = await axios.get(`${API_URL}/allassignmentattempts`);
      const allAttempts =
        data.allassignmentattempts ||
        data.allAssignmentAttempts ||
        data.assignmentAttempts ||
        [];

      const matchingAttempts = allAttempts.filter(
        (attempt) => getId(attempt.assignment) === assignment._id,
      );

      setAttempts(matchingAttempts);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Could not load submissions.",
      );
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  const handleDelete = async (id) => {
    // Your supplied routes did not show an assignment delete endpoint.
    // This handler is enabled only if that route is added to the backend.
    setDeletingId(id);
    try {
      const { data } = await axios.delete(`${API_URL}/deleteassignment/${id}`);
      setAssignments((current) =>
        current.filter((assignment) => assignment._id !== id),
      );
      toast.success(data.message || "Assignment deleted.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Could not delete assignment. Check that the delete route exists.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not set";
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime()) ? "Not set" : date.toLocaleDateString();
  };

  const getStudentName = (attempt) => {
    const student = attempt.attemptBy;
    if (!student || typeof student !== "object") return "Student";
    return (
      [student.firstName, student.lastName].filter(Boolean).join(" ") ||
      "Student"
    );
  };

  const getAnswer = (attempt) =>
    attempt.assignmentAnswer ||
    attempt.answer ||
    attempt.response ||
    "No answer provided";

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
              Student practice
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
              Assignments
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Create assignments and review student submissions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCreateDialog(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
          >
            <FaPlus aria-hidden="true" />
            Create assignment
          </button>
        </section>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#12372a]">
              Assignment list
            </h2>
            <span className="text-sm text-slate-500">
              {assignments.length}{" "}
              {assignments.length === 1 ? "assignment" : "assignments"}
            </span>
          </div>

          {isLoading ? (
            <div className="rounded-2xl border border-emerald-950/10 bg-white px-5 py-12 text-center text-slate-500">
              Loading assignments…
            </div>
          ) : assignments.length === 0 ? (
            <div className="rounded-2xl border border-emerald-950/10 bg-white px-5 py-12 text-center">
              <MdAssignment className="mx-auto text-4xl text-emerald-700" />
              <p className="mt-3 font-semibold text-slate-700">
                No assignments available
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Create an assignment to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {assignments.map((assignment) => (
                <article
                  key={assignment._id}
                  className="flex flex-col rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <MdAssignment className="text-2xl" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="break-words font-semibold text-[#12372a]">
                        {assignment.assignmentTopic}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {assignment.course?.courseName ||
                          courses.find(
                            (course) => course._id === getId(assignment.course),
                          )?.courseName ||
                          "Course not specified"}
                      </p>
                    </div>
                  </div>

                  {assignment.assignmentQuestion && (
                    <p className="mt-4 line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                      {assignment.assignmentQuestion}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FaCalendarAlt aria-hidden="true" />
                      Created {formatDate(assignment.createdAt)}
                    </span>
                    {assignment.deadline && (
                      <span className="inline-flex items-center gap-1.5">
                        <FaCalendarAlt aria-hidden="true" />
                        Due {formatDate(assignment.deadline)}
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleViewSubmissions(assignment)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-800/20 px-3 py-2.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <CiMoneyCheck1 className="text-lg" aria-hidden="true" />
                      Submissions
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(assignment._id)}
                      disabled={deletingId === assignment._id}
                      aria-label={`Delete ${assignment.assignmentTopic}`}
                      className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2.5 text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <MdDeleteOutline className="text-xl" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {showCreateDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-assignment-title"
            className="my-8 w-full max-w-2xl rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="create-assignment-title"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Create assignment
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add the assignment details for students.
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

            <form
              onSubmit={handleSubmitAssignment}
              className="space-y-4 p-5 sm:p-7"
            >
              <div>
                <label
                  htmlFor="assignmentTopic"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Assignment title
                </label>
                <input
                  id="assignmentTopic"
                  name="assignmentTopic"
                  value={newAssignment.assignmentTopic}
                  onChange={handleInputChange}
                  maxLength={120}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  placeholder="Enter an assignment title"
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
                  value={newAssignment.course}
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
                    Add a course before creating an assignment.
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
                  value={newAssignment.deadline}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </div>

              <div>
                <label
                  htmlFor="assignmentQuestion"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Assignment details
                </label>
                <textarea
                  id="assignmentQuestion"
                  name="assignmentQuestion"
                  value={newAssignment.assignmentQuestion}
                  onChange={handleInputChange}
                  rows={5}
                  maxLength={5000}
                  required
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  placeholder="Describe the assignment..."
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
                  {isCreating ? "Creating…" : "Create assignment"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {showSubmissionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="assignment-submissions-title"
            className="my-8 max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl"
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
              <div>
                <h2
                  id="assignment-submissions-title"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Submissions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedAssignment?.assignmentTopic}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowSubmissionDialog(false);
                  setSelectedSubmission(null);
                }}
                aria-label="Close submissions"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <RxCross1 aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 p-5 sm:p-7">
              {isLoadingSubmissions ? (
                <p className="py-10 text-center text-slate-500">
                  Loading submissions…
                </p>
              ) : attempts.length === 0 ? (
                <p className="py-10 text-center text-slate-500">
                  No submissions found for this assignment.
                </p>
              ) : (
                attempts.map((attempt) => (
                  <button
                    key={attempt._id}
                    type="button"
                    onClick={() => setSelectedSubmission(attempt)}
                    className="w-full rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-800/30 hover:bg-emerald-50/50"
                  >
                    <span className="block font-semibold text-slate-800">
                      {getStudentName(attempt)}
                    </span>
                    <span className="mt-1 block line-clamp-2 text-sm text-slate-600">
                      {getAnswer(attempt)}
                    </span>
                    <span className="mt-2 block text-xs text-slate-500">
                      Submitted {formatDate(attempt.createdAt)}
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
            aria-labelledby="submission-response-title"
            className="w-full max-w-xl rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h2
                  id="submission-response-title"
                  className="text-lg font-bold text-[#12372a]"
                >
                  Student response
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {getStudentName(selectedSubmission)}
                </p>
              </div>
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
              <p className="whitespace-pre-wrap break-words leading-7 text-slate-700">
                {getAnswer(selectedSubmission)}
              </p>
              <p className="mt-4 text-xs text-slate-500">
                Submitted {formatDate(selectedSubmission.createdAt)}
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Assignments;
