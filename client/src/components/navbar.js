import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-950/10 bg-[#fbfaf5] shadow-sm">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <img
              src="/images/logo.png"
              className="h-10 w-10 object-contain"
              alt=""
            />
            <span className="text-lg font-bold tracking-tight text-[#12372a] sm:text-xl">
              Marfat-ul-Quran
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="/#courses"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-800"
            >
              Courses
            </a>
            <a
              href="/#learning"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-800"
            >
              Our approach
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-800"
            >
              Contact
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#12372a] transition hover:bg-emerald-950/5 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              Login
            </Link>
            <Link
              to="/registration"
              className="rounded-lg bg-[#12372a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
            >
              Create account
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#12372a] transition hover:bg-emerald-950/5 focus:outline-none focus:ring-2 focus:ring-emerald-700 md:hidden"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-emerald-950/10 py-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              <a
                href="/#courses"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-950/5 hover:text-emerald-800"
              >
                Courses
              </a>
              <a
                href="/#learning"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-950/5 hover:text-emerald-800"
              >
                Our approach
              </a>
              <a
                href="/#contact"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-950/5 hover:text-emerald-800"
              >
                Contact
              </a>

              <div className="mt-3 flex gap-3 border-t border-emerald-950/10 pt-4">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex-1 rounded-lg border border-emerald-900/20 px-4 py-2.5 text-center text-sm font-semibold text-[#12372a] hover:bg-emerald-950/5"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  onClick={closeMenu}
                  className="flex-1 rounded-lg bg-[#12372a] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-900"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
