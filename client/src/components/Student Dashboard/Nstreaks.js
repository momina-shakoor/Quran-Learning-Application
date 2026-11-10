import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { PiMosqueFill } from "react-icons/pi";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

const NamazStreaks = () => {
  const [completedPrayers, setCompletedPrayers] = useState(() => new Set());

  const togglePrayer = (prayer) => {
    setCompletedPrayers((current) => {
      const updated = new Set(current);

      if (updated.has(prayer)) {
        updated.delete(prayer);
      } else {
        updated.add(prayer);
      }

      return updated;
    });
  };

  const completedCount = completedPrayers.size;
  const progress = (completedCount / prayers.length) * 100;

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/Dashboard"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 transition hover:text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        >
          <FaArrowLeft aria-hidden="true" />
          Back to dashboard
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-lg shadow-emerald-950/5">
          <div className="bg-gradient-to-br from-[#12372a] to-emerald-800 px-6 py-10 text-white sm:px-10 sm:py-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
              <PiMosqueFill className="h-7 w-7" aria-hidden="true" />
            </span>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Daily practice
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Namaz streak
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-emerald-50/80">
              Build a steady prayer routine, one day at a time.
            </p>
          </div>

          <div className="grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl bg-[#fbfaf5] p-6 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Current streak
              </p>
              <p className="mt-4 text-5xl font-bold tracking-tight text-[#12372a]">
                5
              </p>
              <p className="mt-1 font-medium text-slate-600">days</p>
              <p className="mt-5 leading-7 text-slate-600">
                Great work! Keep building your prayer habit.
              </p>
            </div>

            <div>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#12372a]">
                    Today’s prayers
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    Mark each prayer as you complete it.
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-emerald-800">
                  {completedCount} of {prayers.length}
                </span>
              </div>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-emerald-100"
                role="progressbar"
                aria-label="Prayers completed today"
                aria-valuemin={0}
                aria-valuemax={prayers.length}
                aria-valuenow={completedCount}
              >
                <div
                  className="h-full rounded-full bg-emerald-700 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <ul className="mt-5 space-y-3">
                {prayers.map((prayer) => {
                  const isComplete = completedPrayers.has(prayer);

                  return (
                    <li key={prayer}>
                      <button
                        type="button"
                        aria-pressed={isComplete}
                        onClick={() => togglePrayer(prayer)}
                        className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 ${
                          isComplete
                            ? "border-emerald-700/20 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-700/30 hover:bg-[#fbfaf5]"
                        }`}
                      >
                        <span className="font-semibold text-[#12372a]">
                          {prayer}
                        </span>

                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                            isComplete
                              ? "border-emerald-700 bg-emerald-700 text-white"
                              : "border-slate-300 bg-white"
                          }`}
                          aria-hidden="true"
                        >
                          {isComplete && (
                            <svg
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="none"
                            >
                              <path
                                d="m5 10 3 3 7-7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              {completedCount === prayers.length && (
                <p
                  className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-900"
                  role="status"
                >
                  All five prayers marked for today. MashaAllah!
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NamazStreaks;
