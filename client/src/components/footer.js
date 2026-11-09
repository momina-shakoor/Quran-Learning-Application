import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#10291f] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a
              href="/#home"
              className="inline-flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300"
            >
              <img
                src={`${process.env.PUBLIC_URL}/images/logo-s.png`}
                className="h-10 w-10 object-contain"
                alt=""
              />
              <span className="text-xl font-bold tracking-tight">
                Marfat-ul-Quran
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-emerald-50/70">
              A place to explore Quran courses, guided lessons, and learning
              activities.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
              Explore
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50/75">
              <li>
                <a className="transition hover:text-white" href="/#home">
                  Home
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="/#courses">
                  Courses
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="/#learning">
                  Learning features
                </a>
              </li>
              <li>
                <a className="transition hover:text-white" href="/#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-300">
              Your account
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-emerald-50/75">
              <li>
                <Link className="transition hover:text-white" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="transition hover:text-white"
                  to="/registration"
                >
                  Create an account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-6 text-sm text-emerald-50/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2024 Marfat-ul-Quran. All rights reserved.</p>

          <a
            href="/#home"
            className="w-fit transition hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
