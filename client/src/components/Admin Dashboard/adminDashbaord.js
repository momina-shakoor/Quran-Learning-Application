import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowRight,
  FaChalkboardTeacher,
  FaHome,
  FaRegUserCircle,
} from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { ImProfile } from "react-icons/im";
import { RiLogoutCircleLine } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { logoutUser } from "../redux/action";

const sections = [
  {
    title: "Teachers",
    description: "Manage teacher accounts and access.",
    to: "/teacher",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Students",
    description: "View and manage student accounts.",
    to: "/student",
    icon: PiStudent,
  },
  {
    title: "Courses",
    description: "Add and organize learning courses.",
    to: "/courses",
    icon: GiTeacher,
  },
  {
    title: "Admin profile",
    description: "View your administrator profile.",
    to: "/profile",
    icon: ImProfile,
  },
];

const navigation = [
  { label: "Public site", to: "/", icon: FaHome },
  { label: "Teachers", to: "/teacher", icon: FaChalkboardTeacher },
  { label: "Students", to: "/student", icon: PiStudent },
  { label: "Courses", to: "/courses", icon: GiTeacher },
  { label: "Profile", to: "/profile", icon: ImProfile },
];

const AdminDashboard = () => {
  const user = useSelector((state) => state.custom.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/adminlogin", { replace: true });
    }
  }, [user?.role, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/adminlogin");
  };

  const adminName = user?.firstName || "Administrator";

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-slate-800 lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#12372a] px-5 py-7 text-white lg:flex">
        <Link
          to="/admindashboard"
          className="px-3 text-xl font-bold tracking-tight"
        >
          Marfat-ul-Quran
        </Link>

        <p className="mt-12 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/60">
          Administration
        </p>

        <nav className="mt-4 space-y-1" aria-label="Admin navigation">
          {navigation.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-emerald-50/80 transition hover:bg-white/10 hover:text-white"
        >
          <RiLogoutCircleLine className="h-5 w-5" aria-hidden="true" />
          Log out
        </button>
      </aside>

      <header className="sticky top-0 z-30 border-b border-emerald-950/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/admindashboard" className="font-bold text-[#12372a]">
            Marfat-ul-Quran
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <RiLogoutCircleLine className="h-5 w-5" aria-hidden="true" />
            Log out
          </button>
        </div>

        <nav
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
          aria-label="Admin navigation"
        >
          {navigation.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="shrink-0 rounded-full bg-[#f3f5ef] px-4 py-2 text-sm font-medium text-[#12372a] hover:bg-emerald-100"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-9 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Admin portal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a]">
              Welcome, {adminName}
            </h1>
            <p className="mt-2 text-slate-600">
              Manage the people and courses in your learning platform.
            </p>
          </div>

          <div className="hidden items-center gap-3 rounded-xl border border-emerald-950/10 bg-white px-4 py-3 shadow-sm sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <FaRegUserCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#12372a]">
                {adminName}
              </p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </header>

        <section className="mt-8 rounded-3xl bg-gradient-to-br from-[#12372a] to-emerald-800 p-6 text-white sm:p-9">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
            Platform management
          </p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
            What would you like to manage?
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-emerald-50/80">
            Open a section below to manage accounts, courses, or your profile.
          </p>
        </section>

        <section className="mt-8" aria-labelledby="management-heading">
          <div className="mb-4">
            <h2
              id="management-heading"
              className="text-xl font-bold text-[#12372a]"
            >
              Management
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Choose an area to continue.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sections.map(({ title, description, to, icon: Icon }) => (
              <Link
                key={title}
                to={to}
                className="group rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#12372a] group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-[#12372a]">{title}</h3>
                  <FaArrowRight
                    className="h-4 w-4 text-emerald-800 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
