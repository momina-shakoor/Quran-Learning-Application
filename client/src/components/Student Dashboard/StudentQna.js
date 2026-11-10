import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaArrowLeft, FaQuestionCircle, FaPaperPlane } from "react-icons/fa";

const API_URL = "http://localhost:8080/api/users";
const MAX_QUESTION_LENGTH = 1000;

const StudentQna = () => {
  const user = useSelector((state) => state.custom.user);

  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let isActive = true;

    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const [questionsResponse, answersResponse] = await Promise.all([
          fetch(`${API_URL}/questions`),
          fetch(`${API_URL}/answers`),
        ]);

        if (!questionsResponse.ok) {
          throw new Error("Questions couldn’t be loaded.");
        }

        const questionData = await questionsResponse.json();
        const answerData = answersResponse.ok
          ? await answersResponse.json()
          : [];

        const answersByQuestion = new Map();

        (Array.isArray(answerData) ? answerData : []).forEach((answer) => {
          const questionId =
            typeof answer.question === "object"
              ? answer.question?._id
              : answer.question;

          if (!questionId) return;

          const replies = answersByQuestion.get(questionId) || [];
          replies.push(answer);
          answersByQuestion.set(questionId, replies);
        });

        if (isActive) {
          const questionList = Array.isArray(questionData) ? questionData : [];

          setQuestions(
            questionList.map((item) => ({
              ...item,
              replies: answersByQuestion.get(item._id) || [],
            })),
          );
        }
      } catch (requestError) {
        if (isActive) {
          setError(
            requestError.message || "Questions couldn’t be loaded. Try again.",
          );
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      isActive = false;
    };
  }, [reload]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      toast.error("Write a question before submitting.");
      return;
    }

    if (trimmedQuestion.length > MAX_QUESTION_LENGTH) {
      toast.error(
        `Questions must be ${MAX_QUESTION_LENGTH} characters or fewer.`,
      );
      return;
    }

    if (!user?._id) {
      toast.error("Please log in again before submitting a question.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedQuestion,
          askby: user._id,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not submit your question.");
      }

      const savedQuestion = {
        ...result,
        askby: {
          firstName: user.firstName,
          lastName: user.lastName,
        },
        replies: [],
      };

      setQuestions((current) => [savedQuestion, ...current]);
      setQuestion("");
      toast.success("Your question was submitted.");
    } catch (requestError) {
      toast.error(requestError.message || "Could not submit your question.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to dashboard
        </Link>

        <header className="mt-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Learning support
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
            Questions and answers
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Ask a question about your learning and check back for a teacher’s
            response.
          </p>
        </header>

        <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]">
          <section
            className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6"
            aria-labelledby="questions-heading"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2
                  id="questions-heading"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Student questions
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  {questions.length}{" "}
                  {questions.length === 1 ? "question" : "questions"}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <FaQuestionCircle className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>

            {loading ? (
              <p
                className="mt-5 rounded-xl bg-[#fbfaf5] p-4 text-sm text-slate-600"
                role="status"
              >
                Loading questions…
              </p>
            ) : error ? (
              <div className="mt-5 rounded-xl bg-red-50 p-4" role="alert">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={() => setReload((value) => value + 1)}
                  className="mt-3 rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
                >
                  Try again
                </button>
              </div>
            ) : questions.length === 0 ? (
              <div className="mt-5 rounded-xl bg-[#fbfaf5] p-5">
                <p className="font-semibold text-[#12372a]">No questions yet</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Your submitted questions and teacher replies will appear here.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {questions.map((item) => (
                  <article
                    key={item._id}
                    className="rounded-xl border border-emerald-950/10 p-4 sm:p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-emerald-800">
                        {item.askby?.firstName
                          ? `Asked by ${item.askby.firstName}`
                          : "Student question"}
                      </p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.replies.length
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-amber-50 text-amber-800"
                        }`}
                      >
                        {item.replies.length
                          ? "Response available"
                          : "Awaiting response"}
                      </span>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap leading-7 text-slate-700">
                      {item.question}
                    </p>

                    {item.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="mt-4 rounded-lg bg-[#f3f5ef] p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                          Teacher response
                        </p>
                        <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                          {reply.answer}
                        </p>
                      </div>
                    ))}
                  </article>
                ))}
              </div>
            )}
          </section>

          <aside className="h-fit rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-[#12372a]">Ask a question</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Include enough detail for your teacher to understand what you need
              help with.
            </p>

            <form onSubmit={handleSubmit} className="mt-5">
              <label
                htmlFor="student-question"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Your question
              </label>
              <textarea
                id="student-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                maxLength={MAX_QUESTION_LENGTH}
                rows={6}
                placeholder="Write your question here…"
                className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                required
              />

              <p className="mt-2 text-right text-xs text-slate-500">
                {question.length}/{MAX_QUESTION_LENGTH}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#12372a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FaPaperPlane aria-hidden="true" />
                {submitting ? "Submitting…" : "Submit question"}
              </button>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default StudentQna;
