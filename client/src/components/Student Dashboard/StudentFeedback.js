import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookOpen,
  FaComments,
  FaRegCalendarAlt,
  FaTimes,
} from "react-icons/fa";

const feedbackItems = [
  {
    id: 1,
    courseName: "Tajweed Foundations",
    assessment: "Recitation Quiz 5",
    date: "May 11, 2024",
    teacherRemark:
      "Good progress with the pronunciation rules. Keep practicing the articulation points for the letters we reviewed.",
  },
  {
    id: 2,
    courseName: "Quranic Translation",
    assessment: "Vocabulary Assignment",
    date: "May 18, 2024",
    teacherRemark:
      "Your answers show a growing understanding of the vocabulary. Review the notes on the words discussed in class.",
  },
  {
    id: 3,
    courseName: "Surah Al-Fatihah",
    assessment: "Reading Practice",
    date: "May 24, 2024",
    teacherRemark:
      "Your recitation is becoming more consistent. Focus on maintaining a steady pace throughout the surah.",
  },
  {
    id: 4,
    courseName: "Quranic Grammar",
    assessment: "Quiz 3",
    date: "May 29, 2024",
    teacherRemark:
      "Well done identifying the examples from the lesson. Review the final question and try explaining your reasoning.",
  },
  {
    id: 5,
    courseName: "Memorization Practice",
    assessment: "Weekly Review",
    date: "June 3, 2024",
    teacherRemark:
      "You remembered most of the assigned passage. A short daily review can help strengthen your recall.",
  },
];

const StudentFeedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    if (!selectedFeedback) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedFeedback(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFeedback]);

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to dashboard
        </Link>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Learning support
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
              Teacher feedback
            </h1>
            <p className="mt-2 text-slate-600">
              Review remarks on your assessments and learning activities.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-950/10 bg-white px-4 py-3 text-sm text-slate-600">
            <FaComments className="text-emerald-800" aria-hidden="true" />
            <span>
              <strong className="text-[#12372a]">{feedbackItems.length}</strong>{" "}
              feedback items
            </span>
          </div>
        </header>

        <section className="mt-7 space-y-4" aria-label="Feedback list">
          {feedbackItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="flex min-w-0 items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                  <FaBookOpen className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h2 className="truncate text-lg font-bold text-[#12372a]">
                    {item.courseName}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.assessment}
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-500">
                    <FaRegCalendarAlt aria-hidden="true" />
                    {item.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedFeedback(item)}
                className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[#12372a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                See feedback
              </button>
            </article>
          ))}
        </section>
      </div>

      {selectedFeedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedFeedback(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-dialog-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
                  {selectedFeedback.assessment}
                </p>
                <h2
                  id="feedback-dialog-title"
                  className="mt-2 text-2xl font-bold text-[#12372a]"
                >
                  Teacher’s remarks
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedFeedback.courseName} · {selectedFeedback.date}
                </p>
              </div>

              <button
                type="button"
                autoFocus
                onClick={() => setSelectedFeedback(null)}
                aria-label="Close feedback"
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>

            <p className="mt-6 rounded-xl bg-[#f3f5ef] p-5 leading-7 text-slate-700">
              {selectedFeedback.teacherRemark}
            </p>
          </section>
        </div>
      )}
    </main>
  );
};

export default StudentFeedback;
