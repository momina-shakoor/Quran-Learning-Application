import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBookOpen, FaFileAlt, FaHeadphones, FaTrash } from "react-icons/fa";
import { IoChevronBackSharp } from "react-icons/io5";

const API_URL = "http://localhost:8080/api/users";

const TeacherLecture = () => {
  const [lessonType, setLessonType] = useState("text");
  const [textLesson, setTextLesson] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${API_URL}/lessons`);
      const lessonData = Array.isArray(response.data)
        ? response.data
        : response.data.lessons || [];

      setLessons(lessonData);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load lessons.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleLessonTypeChange = (e) => {
    setLessonType(e.target.value);
    setAudioFile(null);
    setOtherFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lessonType === "text" && !textLesson.trim()) {
      toast.error("Enter the lesson text.");
      return;
    }

    if (lessonType === "audio" && !audioFile) {
      toast.error("Choose an audio file.");
      return;
    }

    if (lessonType === "file" && !otherFile) {
      toast.error("Choose a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("lessonType", lessonType);

    if (lessonType === "text") {
      formData.append("textLesson", textLesson.trim());
    } else if (lessonType === "audio") {
      formData.append("audioFile", audioFile);
    } else {
      formData.append("otherFile", otherFile);
    }

    setIsSaving(true);
    try {
      const response = await axios.post(`${API_URL}/lessons`, formData);
      toast.success(response.data.message || "Lesson created successfully.");
      setTextLesson("");
      setAudioFile(null);
      setOtherFile(null);
      e.target.reset();
      await fetchLessons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create lesson.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      const response = await axios.delete(`${API_URL}/lessons/${id}`);
      setLessons((current) => current.filter((lesson) => lesson._id !== id));
      toast.success(response.data.message || "Lesson deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete lesson.");
    } finally {
      setDeletingId(null);
    }
  };

  const lessonTypeLabel = (type) => {
    if (type === "audio") return "Audio lesson";
    if (type === "file") return "File lesson";
    return "Text lesson";
  };

  const LessonIcon = ({ type }) => {
    if (type === "audio") return <FaHeadphones aria-hidden="true" />;
    if (type === "file") return <FaFileAlt aria-hidden="true" />;
    return <FaBookOpen aria-hidden="true" />;
  };

  return (
    <main className="min-h-screen bg-[#f4f7f2] text-slate-800">
      <ToastContainer position="top-right" />

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
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Lesson library
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
            Create and manage lessons
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Add written lessons, audio, or downloadable learning materials.
          </p>
        </section>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7">
            <h2 className="text-xl font-semibold text-[#12372a]">New lesson</h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a content type and provide its material.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="lessonType"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Lesson type
                </label>
                <select
                  id="lessonType"
                  value={lessonType}
                  onChange={handleLessonTypeChange}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                >
                  <option value="text">Text</option>
                  <option value="audio">Audio</option>
                  <option value="file">File</option>
                </select>
              </div>

              {lessonType === "text" && (
                <div>
                  <label
                    htmlFor="textLesson"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Lesson content
                  </label>
                  <textarea
                    id="textLesson"
                    value={textLesson}
                    onChange={(e) => setTextLesson(e.target.value)}
                    rows={7}
                    maxLength={10000}
                    placeholder="Write the lesson content..."
                    className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-6 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                  />
                  <p className="mt-1 text-right text-xs text-slate-500">
                    {textLesson.length}/10000
                  </p>
                </div>
              )}

              {lessonType === "audio" && (
                <div>
                  <label
                    htmlFor="audioFile"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Audio file
                  </label>
                  <input
                    id="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    className="block w-full rounded-xl border border-slate-300 text-sm file:mr-4 file:border-0 file:bg-emerald-50 file:px-4 file:py-3 file:font-medium file:text-emerald-900 hover:file:bg-emerald-100"
                  />
                  {audioFile && (
                    <p className="mt-2 truncate text-sm text-slate-500">
                      Selected: {audioFile.name}
                    </p>
                  )}
                </div>
              )}

              {lessonType === "file" && (
                <div>
                  <label
                    htmlFor="otherFile"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Learning material
                  </label>
                  <input
                    id="otherFile"
                    type="file"
                    onChange={(e) => setOtherFile(e.target.files?.[0] || null)}
                    className="block w-full rounded-xl border border-slate-300 text-sm file:mr-4 file:border-0 file:bg-emerald-50 file:px-4 file:py-3 file:font-medium file:text-emerald-900 hover:file:bg-emerald-100"
                  />
                  {otherFile && (
                    <p className="mt-2 truncate text-sm text-slate-500">
                      Selected: {otherFile.name}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {isSaving ? "Creating lesson…" : "Create lesson"}
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-emerald-950/10 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
              <h2 className="font-semibold text-[#12372a]">Lesson list</h2>
              <p className="mt-1 text-sm text-slate-500">
                {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
              </p>
            </div>

            {isLoading ? (
              <p className="px-5 py-12 text-center text-slate-500">
                Loading lessons…
              </p>
            ) : lessons.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <FaBookOpen className="mx-auto text-3xl text-emerald-700" />
                <p className="mt-3 font-medium text-slate-700">
                  No lessons available
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Create your first lesson using the form.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {lessons.map((lesson) => (
                  <li
                    key={lesson._id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:px-7"
                  >
                    <div className="flex min-w-0 gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                        <LessonIcon type={lesson.lessonType} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#12372a]">
                          {lessonTypeLabel(lesson.lessonType)}
                        </p>
                        {lesson.lessonType === "text" && (
                          <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                            {lesson.textLesson}
                          </p>
                        )}
                        {lesson.lessonType === "audio" && lesson.audioFile && (
                          <audio
                            controls
                            className="mt-3 w-full max-w-md"
                            src={lesson.audioFile}
                          >
                            Your browser does not support audio playback.
                          </audio>
                        )}
                        {lesson.lessonType === "file" && lesson.otherFile && (
                          <a
                            href={lesson.otherFile}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block break-all text-sm font-medium text-emerald-800 underline"
                          >
                            Open learning material
                          </a>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(lesson._id)}
                      disabled={deletingId === lesson._id}
                      className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:shrink-0"
                    >
                      <FaTrash aria-hidden="true" />
                      {deletingId === lesson._id ? "Deleting…" : "Delete"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default TeacherLecture;
