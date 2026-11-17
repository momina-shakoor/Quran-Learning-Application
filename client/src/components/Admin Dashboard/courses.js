import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { FaBookOpen, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/users";

const AdminCourse = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/allcourses`);
      setCourses(response.data.allcourses || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load courses.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setCourseName("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = courseName.trim();
    if (!trimmedName) {
      toast.error("Enter a course name.");
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const response = await axios.put(
          `${API_URL}/updatecourse/${editingId}`,
          { courseName: trimmedName },
        );

        const updatedCourse =
          response.data.course || response.data.updatedCourse;

        if (updatedCourse) {
          setCourses((current) =>
            current.map((course) =>
              course._id === editingId ? updatedCourse : course,
            ),
          );
        } else {
          await fetchCourses();
        }

        toast.success(response.data.message || "Course updated.");
      } else {
        const response = await axios.post(`${API_URL}/addcourse`, {
          courseName: trimmedName,
        });

        setCourses((current) =>
          [...current, response.data.newCourse].filter(Boolean),
        );

        toast.success(response.data.message || "Course added.");
      }

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (editingId ? "Could not update course." : "Could not add course."),
      );
    } finally {
      setIsSaving(false);
    }
  };

  const startEditing = (course) => {
    setCourseName(course.courseName || "");
    setEditingId(course._id);
  };

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/deletecourse/${id}`);
      setCourses((current) => current.filter((course) => course._id !== id));
      if (editingId === id) resetForm();
      toast.success(response.data.message || "Course deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete course.");
    }
  };

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f7f2]">
      <div className="mx-auto min-h-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <Link
            to="/admindashboard"
            aria-label="Close course management"
            className="rounded-full border border-emerald-900/10 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <RxCross1 aria-hidden="true" />
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Admin workspace
          </span>
        </header>

        <section className="mb-8">
          <div className="flex items-center gap-3 text-emerald-800">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <FaBookOpen className="text-xl" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                Curriculum
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
                Manage courses
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-slate-600">
            Add courses to the catalog, update their names, or remove entries.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[#12372a]">
              {editingId ? "Edit course" : "Add a course"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Use a clear name students can recognize.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="courseName">
              Course name
            </label>
            <input
              id="courseName"
              type="text"
              name="courseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="For example, Tajweed Basics"
              required
              maxLength={100}
              className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
            />

            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {!editingId && <FaPlus aria-hidden="true" />}
              {isSaving ? "Saving…" : editingId ? "Save changes" : "Add course"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
            <div>
              <h2 className="font-semibold text-[#12372a]">Course catalog</h2>
              <p className="mt-1 text-sm text-slate-500">
                {courses.length} {courses.length === 1 ? "course" : "courses"}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="px-5 py-12 text-center text-slate-500">
              Loading courses…
            </div>
          ) : courses.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <FaBookOpen className="mx-auto text-3xl text-emerald-700" />
              <p className="mt-3 font-medium text-slate-700">No courses yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Add a course above to start building the catalog.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                      <FaBookOpen aria-hidden="true" />
                    </span>
                    <span className="truncate font-medium text-slate-800">
                      {course.courseName}
                    </span>
                  </div>

                  <div className="flex gap-2 sm:shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditing(course)}
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-800/20 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    >
                      <FaEdit aria-hidden="true" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCourse(course._id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                      <FaTrash aria-hidden="true" />
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminCourse;
