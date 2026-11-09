import React from "react";

const courses = [
  {
    title: "Tajweed",
    subtitle: "Improve recitation step by step",
    description:
      "An introduction to the principles of Tajweed and the pronunciation rules used in Quranic recitation.",
    points: [
      "Learn foundational Tajweed principles",
      "Practice accurate pronunciation",
      "Explore the articulation of Arabic letters",
    ],
    image: `${process.env.PUBLIC_URL}/images/course-1.jpg`,
    imageAlt: "Quran open for recitation study",
    level: "Recitation",
  },
  {
    title: "Tafseer",
    subtitle: "Explore meaning and context",
    description:
      "A sample course path for exploring Quranic verses, their context, and the lessons readers draw from them.",
    points: [
      "Study selected Quranic verses",
      "Explore meaning and historical context",
      "Consider linguistic and practical insights",
    ],
    image: `${process.env.PUBLIC_URL}/images/course-2.avif`,
    imageAlt: "Materials arranged for Quranic study",
    level: "Understanding",
  },
  {
    title: "Seerah",
    subtitle: "Study the Prophet’s life",
    description:
      "An overview of the life of Prophet Muhammad (PBUH) and the events that shaped early Islamic history.",
    points: [
      "Explore historical and social context",
      "Learn about key events in his life",
      "Reflect on his character and teachings",
    ],
    image: `${process.env.PUBLIC_URL}/images/course-3.jpg`,
    imageAlt: "A mosque representing Islamic history",
    level: "Islamic history",
  },
  {
    title: "Tarjuma",
    subtitle: "Build understanding through translation",
    description:
      "A sample learning path focused on Quranic translation and understanding the meanings of its verses.",
    points: [
      "Explore translated Quranic passages",
      "Build familiarity with key terms",
      "Connect translations with broader teachings",
    ],
    image: `${process.env.PUBLIC_URL}/images/course-4.jpg`,
    imageAlt: "Quran displayed for translation study",
    level: "Translation",
  },
];

const Information = () => {
  return (
    <section className="bg-[#fbfaf5] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Sample course paths
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
            Explore what you can learn
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            These course summaries demonstrate how learning content could be
            presented in the Marfat-ul-Quran project.
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10">
          {courses.map((course, index) => (
            <article
              key={course.title}
              className="grid overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm lg:grid-cols-2"
            >
              <div
                className={`min-h-64 overflow-hidden bg-emerald-950/5 sm:min-h-80 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={course.image}
                  alt={course.imageAlt}
                  loading="lazy"
                  className="h-full min-h-64 w-full object-cover sm:min-h-80"
                />
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-900">
                  {course.level}
                </span>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-[#12372a] sm:text-3xl">
                  {course.title}
                </h3>
                <p className="mt-1 text-lg font-medium text-emerald-800">
                  {course.subtitle}
                </p>
                <p className="mt-4 leading-7 text-slate-600">
                  {course.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {course.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base"
                    >
                      <span
                        className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Information;
