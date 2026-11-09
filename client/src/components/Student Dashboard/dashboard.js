import React, { useEffect, useState } from "react";
import { PiMosqueFill } from "react-icons/pi";
import {
  FaQuran,
  FaRegUserCircle,
  FaHome,
  FaRegUser,
  FaBookOpen,
  FaQuestion,
} from "react-icons/fa";
import {
  MdFeedback,
  MdQuiz,
  MdAssignment,
  MdOutlinePlayLesson,
} from "react-icons/md";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/action";
import axios from "axios";

const navigation = [
  { label: "Home", to: "/", icon: FaHome },
  { label: "Profile", to: "/studentprofile", icon: FaRegUser },
  { label: "Leaderboard", to: "/leaderboard", icon: FaBarsProgress },
];

const quickActions = [
  {
    label: "Quizzes",
    description: "Practice what you have learned",
    to: "/studentquiz",
    icon: MdQuiz,
  },
  {
    label: "Quran streaks",
    description: "Keep up your reading routine",
    to: "/QuranStreaks",
    icon: FaQuran,
  },
  {
    label: "Namaz streaks",
    description: "Track your prayer routine",
    to: "/NamazStreaks",
    icon: PiMosqueFill,
  },
  {
    label: "Teacher feedback",
    description: "Review your feedback",
    to: "/studentfeedback",
    icon: MdFeedback,
  },
];

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courseError, setCourseError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.custom.user);

  useEffect(() => {
    if (user?.role !== "student") {
      navigate("/login", { replace: true });
      return;
    }

    let isActive = true;

    const fetchCourses = async () => {
      setLoadingCourses(true);
      setCourseError("");

      try {
        const response = await axios.get(
          "http://localhost:8080/api/users/allcourses",
        );

        if (isActive) {
          setCourses(response.data.allcourses || []);
        }
      } catch {
        if (isActive) {
          setCourseError("Courses couldn’t be loaded. Please try again.");
        }
      } finally {
        if (isActive) {
          setLoadingCourses(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isActive = false;
    };
  }, [user?.role, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const firstName = user?.firstName?.trim() || "Student";

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-slate-800 lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#12372a] px-5 py-7 text-white lg:flex">
        <Link to="/" className="px-3 text-xl font-bold tracking-tight">
          Marfat-ul-Quran
        </Link>

        <p className="mt-12 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/60">
          Student menu
        </p>

        <nav className="mt-4 space-y-1" aria-label="Student navigation">
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

      {/* Mobile header */}
      <header className="sticky top-0 z-30 border-b border-emerald-950/10 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-bold tracking-tight text-[#12372a]">
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
          aria-label="Student navigation"
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

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        {/* Greeting */}
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-emerald-800">
              Student dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#12372a] sm:text-3xl">
              Welcome back, {firstName}
            </h1>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Pick up where you left off or choose what to work on next.
            </p>
          </div>

          <Link
            to="/studentprofile"
            className="hidden items-center gap-3 rounded-xl border border-emerald-950/10 bg-white px-4 py-3 shadow-sm sm:flex"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
              <FaRegUserCircle className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold text-[#12372a]">
              {firstName}
            </span>
          </Link>
        </div>

        {/* Primary action */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12372a] to-emerald-800 p-6 text-white sm:p-9">
          <div
            className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[36px] border-white/5"
            aria-hidden="true"
          />
          <div className="relative max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Your learning space
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Ready for your next lesson?
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-emerald-50/80">
              Continue exploring lessons, practice activities, and Quran
              reading.
            </p>
            <Link
              to="/studentlecture"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-300 px-5 py-3 text-sm font-bold text-[#183428] transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:ring-offset-2 focus:ring-offset-emerald-900"
            >
              <MdOutlinePlayLesson className="h-5 w-5" aria-hidden="true" />
              Go to lessons
            </Link>
          </div>
        </section>

        {/* Quick links */}
        <section className="mt-9" aria-labelledby="quick-actions-heading">
          <div className="mb-4">
            <h2
              id="quick-actions-heading"
              className="text-xl font-bold text-[#12372a]"
            >
              Quick access
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Jump straight to a learning activity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {quickActions.map(({ label, description, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className="group rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800 transition group-hover:bg-[#12372a] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-[#12372a]">{label}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Courses and more actions */}
        <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(260px,0.8fr)]">
          <section
            className="rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7"
            aria-labelledby="courses-heading"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  id="courses-heading"
                  className="text-xl font-bold text-[#12372a]"
                >
                  Courses
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Browse courses available for learning.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900">
                {courses.length} {courses.length === 1 ? "course" : "courses"}
              </span>
            </div>

            {loadingCourses ? (
              <p className="mt-6 rounded-xl bg-[#f3f5ef] p-4 text-sm text-slate-600">
                Loading courses…
              </p>
            ) : courseError ? (
              <p
                role="alert"
                className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                {courseError}
              </p>
            ) : courses.length === 0 ? (
              <div className="mt-6 rounded-xl bg-[#f3f5ef] p-5">
                <p className="font-medium text-[#12372a]">
                  No courses are available yet.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Check back later for new learning content.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {courses.map((course) => (
                  <article
                    key={course._id}
                    className="rounded-xl border border-emerald-950/10 p-4 transition hover:border-emerald-800/30 hover:bg-[#fbfaf5]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                        <FaBookOpen className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-semibold text-[#12372a]">
                          {course.courseName || "Untitled course"}
                        </h3>
                        {course.courseDescription && (
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            {course.courseDescription}
                          </p>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-4" aria-label="More learning activities">
            <Link
              to="/studentassignment"
              className="flex items-center justify-between gap-4 rounded-2xl bg-amber-100 p-5 text-[#12372a] transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <span>
                <span className="block font-bold">Assignments</span>
                <span className="mt-1 block text-sm text-emerald-950/70">
                  View and submit your work
                </span>
              </span>
              <MdAssignment className="h-7 w-7 shrink-0" aria-hidden="true" />
            </Link>

            <Link
              to="/quran"
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 text-[#12372a] shadow-sm ring-1 ring-emerald-950/10 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <span>
                <span className="block font-bold">Read Quran</span>
                <span className="mt-1 block text-sm text-slate-600">
                  Continue with Quran reading
                </span>
              </span>
              <FaQuran
                className="h-7 w-7 shrink-0 text-emerald-800"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/studentqna"
              className="flex items-center justify-between gap-4 rounded-2xl bg-white p-5 text-[#12372a] shadow-sm ring-1 ring-emerald-950/10 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <span>
                <span className="block font-bold">Ask a question</span>
                <span className="mt-1 block text-sm text-slate-600">
                  Get help with your learning
                </span>
              </span>
              <FaQuestion
                className="h-7 w-7 shrink-0 text-emerald-800"
                aria-hidden="true"
              />
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
