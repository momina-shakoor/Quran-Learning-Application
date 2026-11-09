import React from "react";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaClipboardCheck,
  FaComments,
} from "react-icons/fa";

const features = [
  {
    number: "01",
    icon: FaBookOpen,
    title: "Structured Quran courses",
    description:
      "Explore courses in Quranic recitation, translation, Tafseer, and Seerah.",
  },
  {
    number: "02",
    icon: FaChalkboardTeacher,
    title: "Guided lessons",
    description:
      "Learn through lessons prepared by teachers and organized around each course.",
  },
  {
    number: "03",
    icon: FaClipboardCheck,
    title: "Practice and progress",
    description:
      "Strengthen your learning with quizzes, assignments, and teacher feedback.",
  },
  {
    number: "04",
    icon: FaComments,
    title: "Ask your teacher",
    description:
      "Share questions about your learning and follow replies in one place.",
  },
];

const Services = () => {
  return (
    <section className="bg-[#f3f5ef] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Learn • Practice • Grow
            </p>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#12372a] sm:text-4xl">
              A guided path to Quran learning
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-7 text-slate-600 lg:justify-self-end">
            Bring courses, teacher-led lessons, and learning activities together
            in one place, so you can keep building your understanding step by
            step.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:gap-6">
          {features.map(({ number, icon: Icon, title, description }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-emerald-950/10 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#12372a] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold tracking-wider text-emerald-800/40">
                  {number}
                </span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-[#12372a]">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{description}</p>

              <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
