import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "../redux/action";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

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
        "http://localhost:8080/api/users/adminlogin",
        {
          email,
          password: data.password,
        },
      );

      const admin = response.data?.user;

      if (!admin || admin.role !== "admin") {
        setError("This account does not have admin access.");
        return;
      }

      // Store only the fields the UI needs, not the password hash.
      dispatch(
        loginUser({
          _id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          role: admin.role,
        }),
      );

      toast.success(response.data.message || "Signed in successfully.");
      navigate("/admindashboard");
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        requestError.response?.data?.msg ||
        "Unable to sign in. Check your email and password.";

      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white py-3 pl-4 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10";

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-950/10 lg:grid-cols-2">
        <aside className="hidden flex-col justify-between bg-[#12372a] p-10 text-white lg:flex xl:p-12">
          <Link to="/" className="text-xl font-bold tracking-tight">
            Marfat-ul-Quran
          </Link>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Administration
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Manage your learning platform.
            </h1>
            <p className="mt-5 leading-7 text-emerald-50/75">
              Sign in to manage courses, students, and teacher accounts.
            </p>
          </div>

          <p className="text-sm text-emerald-50/60">
            Administrator access is provided by the platform.
          </p>
        </aside>

        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800 lg:hidden">
              Marfat-ul-Quran · Admin
            </p>
            <h2 className="mt-1 text-3xl font-bold tracking-tight text-[#12372a]">
              Admin sign in
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter your administrator account details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="username"
                value={data.email}
                onChange={handleInputChange}
                placeholder="admin@example.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={data.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                  className={inputClass}
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
              {isSubmitting ? "Signing in…" : "Sign in to admin"}
            </button>

            <Link
              to="/"
              className="block text-center text-sm font-medium text-slate-500 hover:text-emerald-800"
            >
              Return to the main site
            </Link>
          </form>
        </section>
      </div>
    </main>
  );
};

export default AdminLogin;
