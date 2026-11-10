import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaQuran } from "react-icons/fa";

const QuranStreaks = () => {
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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-amber-300">
              <FaQuran className="h-7 w-7" aria-hidden="true" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Daily practice
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Quran reading streak
            </h1>
            <p className="mt-3 max-w-xl leading-7 text-emerald-50/80">
              A steady routine is built one day at a time. Keep making space for
              Quran reading in your day.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="rounded-2xl bg-[#fbfaf5] p-6 text-center sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Your current streak
              </p>

              <div className="mt-5 flex items-center justify-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-900">
                  <FaQuran className="h-7 w-7" aria-hidden="true" />
                </span>

                <div className="text-left">
                  <p className="text-4xl font-bold tracking-tight text-[#12372a] sm:text-5xl">
                    4
                  </p>
                  <p className="text-sm font-medium text-slate-600">days</p>
                </div>
              </div>

              <p className="mt-6 font-semibold text-[#12372a]">
                Great work! Keep your Quran reading streak going.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-center text-sm text-slate-600 sm:text-left">
                Every day is another opportunity to grow your habit.
              </p>

              <Link
                to="/quran"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#12372a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 sm:w-auto"
              >
                Read Quran
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default QuranStreaks;
