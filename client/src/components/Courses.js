import React from "react";

const courses = [
  {
    title: "Tajweed Course",
    category: "Quranic recitation",
    description:
      "Learn the rules of Quranic recitation, including pronunciation and intonation.",
    image: `${process.env.PUBLIC_URL}/images/course-1.jpg`,
    alt: "Quran open on a wooden stand",
  },
  {
    title: "Tafseer Course",
    category: "Quranic understanding",
    description:
      "Explore the meanings, context, and wisdom behind Quranic verses.",
    image: `${process.env.PUBLIC_URL}/images/course-2.avif`,
    alt: "Quranic study materials",
  },
  {
    title: "Seerah Course",
    category: "Islamic history",
    description:
      "Learn about the life and teachings of Prophet Muhammad (PBUH).",
    image: `${process.env.PUBLIC_URL}/images/course-3.jpg`,
    alt: "A mosque and its surroundings",
  },
  {
    title: "Tarjuma Course",
    category: "Quranic translation",
    description:
      "Study Quranic translation and build a deeper understanding of its verses.",
    image: `${process.env.PUBLIC_URL}/images/course-4.jpg`,
    alt: "Quran displayed for study",
  },
];

const MultipleItems = () => {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Explore the curriculum
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
            Courses for your learning journey
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Build your Quranic knowledge through courses in recitation,
            understanding, history, and translation.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {courses.map((course) => (
            <article
              key={course.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-950/10 bg-[#fbfaf5] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[16/10] overflow-hidden bg-emerald-950/5">
                <img
                  src={course.image}
                  alt={course.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <span className="mb-3 w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                  {course.category}
                </span>

                <h3 className="text-xl font-bold text-[#12372a]">
                  {course.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {course.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MultipleItems;
