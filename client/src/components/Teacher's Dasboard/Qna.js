import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { FaRegQuestionCircle, FaReply } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/users";

const Qna = () => {
  const teacher = useSelector((state) => state.custom.user);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/questions`);
      const questionList = Array.isArray(data)
        ? data
        : data.questions || data.allQuestions || [];

      setQuestions(questionList);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load questions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const openReply = (question) => {
    setSelectedQuestion(question);
    setReply("");
  };

  const closeReply = () => {
    setSelectedQuestion(null);
    setReply("");
  };

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    if (!teacher?._id) {
      toast.error(
        "Your teacher session could not be found. Please sign in again.",
      );
      return;
    }

    const answerText = reply.trim();
    if (!answerText) {
      toast.error("Write a reply before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post(`${API_URL}/answers`, {
        ansby: teacher._id,
        question: selectedQuestion._id,
        answer: answerText,
      });

      const savedAnswer =
        typeof data.answer === "string"
          ? data.answer
          : data.answer?.answer || answerText;

      setQuestions((current) =>
        current.map((question) =>
          question._id === selectedQuestion._id
            ? { ...question, reply: savedAnswer }
            : question,
        ),
      );

      toast.success(data.message || "Reply submitted.");
      closeReply();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not submit reply.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Date unavailable";
    const date = new Date(dateValue);
    return Number.isNaN(date.getTime())
      ? "Date unavailable"
      : date.toLocaleDateString();
  };

  return (
    <main className="min-h-screen bg-[#f4f7f2] text-slate-800">
      <header className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/TeacherDashboard"
            className="rounded-full border border-emerald-900/10 p-3 text-slate-600 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900"
            aria-label="Back to teacher dashboard"
          >
            <RxCross1 aria-hidden="true" />
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Teacher workspace
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Student support
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
            Questions & answers
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            Review questions from students and share helpful replies.
          </p>
        </section>

        <section className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <h2 className="font-semibold text-[#12372a]">
                Student questions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {questions.length}{" "}
                {questions.length === 1 ? "question" : "questions"}
              </p>
            </div>
          </div>

          {isLoading ? (
            <p className="px-5 py-12 text-center text-slate-500">
              Loading questions…
            </p>
          ) : questions.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <FaRegQuestionCircle className="mx-auto text-4xl text-emerald-700" />
              <p className="mt-3 font-medium text-slate-700">
                No questions available
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Student questions will appear here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {questions.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col gap-4 px-5 py-5 sm:px-7"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-[#12372a]">
                          {[item.askby?.firstName, item.askby?.lastName]
                            .filter(Boolean)
                            .join(" ") || "Student"}
                        </p>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            item.reply
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {item.reply ? "Answered" : "Awaiting reply"}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Asked {formatDate(item.waitingSince || item.createdAt)}
                      </p>
                    </div>

                    {!item.reply && (
                      <button
                        type="button"
                        onClick={() => openReply(item)}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
                      >
                        <FaReply aria-hidden="true" />
                        Reply
                      </button>
                    )}
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="whitespace-pre-wrap break-words leading-7 text-slate-700">
                      {item.question}
                    </p>
                  </div>

                  {item.reply && (
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
                        Reply
                      </p>
                      <p className="whitespace-pre-wrap break-words leading-7 text-slate-700">
                        {item.reply}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="reply-dialog-title"
            className="my-8 w-full max-w-xl rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="reply-dialog-title"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Reply to student
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedQuestion.askby?.firstName || "Student"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeReply}
                aria-label="Close reply dialog"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <RxCross1 aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmitReply} className="space-y-4 p-5 sm:p-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                  {selectedQuestion.question}
                </p>
              </div>

              <div>
                <label
                  htmlFor="reply"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Your reply
                </label>
                <textarea
                  id="reply"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={5}
                  maxLength={3000}
                  required
                  placeholder="Write a helpful response..."
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 leading-6 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeReply}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send reply"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Qna;
