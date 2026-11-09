import React from "react";
import CountUp from "react-countup";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaUserGraduate,
} from "react-icons/fa";

const stats = [
  { id: 1, name: "Courses", value: 20, icon: FaBookOpen },
  { id: 2, name: "Instructors", value: 100, icon: FaChalkboardTeacher },
  { id: 3, name: "Learners", value: 300, icon: FaUserGraduate },
];

export default function Example() {
  return (
    <section className="bg-[#fbfaf5] px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Marfat-ul-Quran
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#12372a] sm:text-3xl">
            Learning at a glance
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            A growing community learning and teaching together.
          </p>
        </div>

        <dl className="grid overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-sm sm:grid-cols-3">
          {stats.map(({ id, name, value, icon: Icon }) => (
            <div
              key={id}
              className="flex items-center justify-center gap-4 border-b border-emerald-950/10 px-6 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:py-8 sm:last:border-r-0"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <div>
                <dt className="text-sm font-medium text-slate-600">{name}</dt>
                <dd className="mt-1 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
                  <CountUp end={value} duration={1.5} separator="," />+
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
