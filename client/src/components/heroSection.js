import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const backgroundImage = `url("${process.env.PUBLIC_URL}/images/bg-img.jpg")`;

  return (
    <section
      className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-[#12372a] text-white sm:min-h-[620px] lg:min-h-[calc(100vh-5rem)]"
      style={{ backgroundImage }}
    >
      {/* Background image and overlays */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#10291f]/95 via-[#10291f]/75 to-[#10291f]/30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#10291f]/45 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 backdrop-blur-sm sm:text-sm">
            A thoughtful path to Quran learning
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Build a lasting connection with the{" "}
            <span className="text-amber-300">Quran</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            Learn to read and understand the Quran through guided lessons,
            courses, and practice at your own pace.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/registration"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-amber-300 px-6 py-3 text-sm font-bold text-[#183428] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-[#12372a] sm:text-base"
            >
              Start learning
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>

            <a
              href="/#courses"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/35 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#12372a] sm:text-base"
            >
              Explore courses
            </a>
          </div>

          <p className="mt-6 text-sm text-white/70">
            Learn step by step, wherever you are.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
