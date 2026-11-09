import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiLock, CiMail } from "react-icons/ci";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "./redux/action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const email = data.email.trim().toLowerCase();

    if (!email || !data.password) {
      setError("Enter your email and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/authlogin",
        {
          email,
          password: data.password,
        },
      );

      const user = response.data.user;

      if (!user) {
        throw new Error("The server response did not include a user.");
      }

      if (user.role !== "student" && user.role !== "teacher") {
        setError("This account type cannot use this login page.");
        return;
      }

      dispatch(loginUser(user));
      toast.success(response.data.message || "Login successful.");

      navigate(user.role === "student" ? "/Dashboard" : "/TeacherDashboard");
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        requestError.response?.data?.msg ||
        "Unable to log in. Check your email and password, then try again.";

      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10";

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-950/10 lg:grid-cols-2">
        <aside className="hidden flex-col justify-between bg-[#12372a] p-10 text-white lg:flex xl:p-12">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Marfat-ul-Quran
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Welcome back
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Continue your learning journey.
            </h1>
            <p className="mt-5 leading-7 text-emerald-50/75">
              Sign in to access your courses, lessons, and learning activities.
            </p>
          </div>

          <p className="text-sm text-emerald-50/60">
            Learn at your pace, one step at a time.
          </p>
        </aside>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800 lg:hidden">
                Marfat-ul-Quran
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#12372a]">
                Sign in
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter your account details to continue.
              </p>
            </div>

            <Link
              to="/"
              aria-label="Back to home"
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <div className="relative">
                <CiMail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={data.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <CiLock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={data.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-emerald-800"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                  ) : (
                    <AiOutlineEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#12372a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Don’t have an account?{" "}
              <Link
                to="/registration"
                className="font-semibold text-emerald-800 hover:underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
