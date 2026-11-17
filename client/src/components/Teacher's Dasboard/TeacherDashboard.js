import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineQuiz, MdAssignment } from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaRegQuestionCircle,
  FaRegUserCircle,
} from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { logoutUser } from "../redux/action";

const dashboardLinks = [
  {
    to: "/teacherslecture",
    label: "Lectures",
    description: "Create and manage lesson content",
    icon: FaChalkboardTeacher,
  },
  {
    to: "/teacherquiz",
    label: "Quizzes",
    description: "Prepare learning checks for students",
    icon: MdOutlineQuiz,
  },
  {
    to: "/assignments",
    label: "Assignments",
    description: "Create and review assignments",
    icon: MdAssignment,
  },
  {
    to: "/teacherqna",
    label: "Questions & answers",
    description: "Respond to student questions",
    icon: FaRegQuestionCircle,
  },
];

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.custom.user);

  useEffect(() => {
    if (user?.role !== "teacher") {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  const teacherName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Teacher";

  return (
    <div className="min-h-screen bg-[#f4f7f2] text-slate-800">
      <aside className="hidden min-h-screen w-64 flex-col bg-[#12372a] text-white md:fixed md:inset-y-0 md:flex">
        <Link to="/TeacherDashboard" className="px-6 py-7">
          <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Marfat-ul-Quran
          </span>
          <span className="mt-1 block text-2xl font-bold">Teacher portal</span>
        </Link>

        <nav className="mt-4 flex-1 px-4" aria-label="Main navigation">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-emerald-50 transition hover:bg-white/10"
          >
            <FaHome aria-hidden="true" />
            Home
          </Link>
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="m-4 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-red-200 transition hover:bg-white/10 hover:text-white"
        >
          <RiLogoutCircleLine aria-hidden="true" />
          Log out
        </button>
      </aside>

      <div className="md:pl-64">
        <header className="flex items-center justify-between border-b border-emerald-950/10 bg-white px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="font-semibold text-[#12372a] md:hidden">
            Marfat-ul-Quran
          </Link>
          <span className="hidden text-sm text-slate-500 md:block">
            Teacher workspace
          </span>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">
                {teacherName}
              </p>
              <p className="text-xs text-slate-500">Teacher</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-900">
              <FaRegUserCircle className="text-xl" aria-hidden="true" />
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 md:hidden"
            >
              Log out
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#12372a] to-emerald-700 px-6 py-8 text-white shadow-sm sm:px-9 sm:py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-100">
              Teacher dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back, {user?.firstName || "Teacher"}
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-emerald-50">
              Manage lessons, quizzes, assignments, and student questions from
              your workspace.
            </p>
          </section>

          <section className="mt-9">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#12372a] sm:text-2xl">
                Teaching tools
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Choose an area to continue.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {dashboardLinks.map(({ to, label, description, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="group rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-800/25 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-emerald-100">
                    <Icon className="text-xl" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-[#12372a]">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-emerald-800">
                    Open section <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-2xl border border-emerald-950/10 bg-white p-5 sm:p-6">
            <h2 className="font-semibold text-[#12372a]">Your workspace</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Course and enrollment details will appear here when they are
              connected to teacher-specific data.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
