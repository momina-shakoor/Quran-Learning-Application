import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  dateOfBirth: "",
  gender: "",
  course: "",
  role: "student",
};

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10";

const Registration = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setFormErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
  };

  const validateForm = () => {
    const errors = {};
    const email = formData.email.trim();
    const phoneDigits = formData.phone.replace(/\D/g, "");
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    if (formData.firstName.trim().length < 2) {
      errors.firstName = "Enter a first name with at least 2 characters.";
    }

    if (formData.lastName.trim().length < 2) {
      errors.lastName = "Enter a last name with at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      errors.phone = "Enter a phone number with 7 to 15 digits.";
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Select your date of birth.";
    } else if (formData.dateOfBirth > today) {
      errors.dateOfBirth = "Date of birth can’t be in the future.";
    }

    if (!formData.course) {
      errors.course = "Select a course.";
    }

    if (!passwordPattern.test(formData.password)) {
      errors.password =
        "Use 8–16 characters, including a letter, a number, and a special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      toast.error("Please check the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const { confirmPassword, ...payload } = formData;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/authsignup",
        {
          ...payload,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
        },
      );

      toast.success(response.data.message || "Registration successful.");
      setFormData(initialFormData);
      setFormErrors({});
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setServerError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f3f5ef] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-emerald-950/10 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="hidden flex-col justify-between bg-[#12372a] p-10 text-white lg:flex xl:p-12">
          <div>
            <Link to="/" className="text-xl font-bold tracking-tight">
              Marfat-ul-Quran
            </Link>

            <div className="mt-20">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
                Begin your learning journey
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight">
                Create your learner account
              </h1>
              <p className="mt-5 leading-7 text-emerald-50/75">
                Register to explore courses, lessons, quizzes, and other
                learning activities.
              </p>
            </div>
          </div>

          <p className="text-sm text-emerald-50/60">
            Learn at your pace, one step at a time.
          </p>
        </aside>

        <section className="p-5 sm:p-8 lg:p-10 xl:p-12">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800 lg:hidden">
                Marfat-ul-Quran
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#12372a] sm:text-3xl">
                Create your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Enter your details to get started.
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

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Your first name"
                  required
                  minLength={2}
                  maxLength={50}
                  aria-invalid={Boolean(formErrors.firstName)}
                  aria-describedby={
                    formErrors.firstName ? "firstName-error" : undefined
                  }
                />
                {formErrors.firstName && (
                  <p id="firstName-error" className="mt-1 text-sm text-red-600">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Your last name"
                  required
                  minLength={2}
                  maxLength={50}
                  aria-invalid={Boolean(formErrors.lastName)}
                  aria-describedby={
                    formErrors.lastName ? "lastName-error" : undefined
                  }
                />
                {formErrors.lastName && (
                  <p id="lastName-error" className="mt-1 text-sm text-red-600">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

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
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="you@example.com"
                  required
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={
                    formErrors.email ? "email-error" : undefined
                  }
                />
                {formErrors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="+92 300 1234567"
                  required
                  aria-invalid={Boolean(formErrors.phone)}
                  aria-describedby={
                    formErrors.phone ? "phone-error" : undefined
                  }
                />
                {formErrors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {formErrors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="dateOfBirth"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Date of birth
                </label>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  max={today}
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                  aria-invalid={Boolean(formErrors.dateOfBirth)}
                  aria-describedby={
                    formErrors.dateOfBirth ? "dateOfBirth-error" : undefined
                  }
                />
                {formErrors.dateOfBirth && (
                  <p
                    id="dateOfBirth-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {formErrors.dateOfBirth}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="course"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                  aria-invalid={Boolean(formErrors.course)}
                  aria-describedby={
                    formErrors.course ? "course-error" : undefined
                  }
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  <option value="Tafseer Course">Tafseer Course</option>
                  <option value="Tajweed Course">Tajweed Course</option>
                  <option value="Seerah Course">Seerah Course</option>
                  <option value="Tarjuma Course">Tarjuma Course</option>
                </select>
                {formErrors.course && (
                  <p id="course-error" className="mt-1 text-sm text-red-600">
                    {formErrors.course}
                  </p>
                )}
              </div>
            </div>

            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-slate-700">
                Gender{" "}
                <span className="font-normal text-slate-500">(optional)</span>
              </legend>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {["Male", "Female", "Prefer not to say"].map((gender) => (
                  <label
                    key={gender}
                    className="inline-flex items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleInputChange}
                      className="h-4 w-4 accent-emerald-800"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
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
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${inputClass} pr-12`}
                    placeholder="Create a password"
                    required
                    aria-invalid={Boolean(formErrors.password)}
                    aria-describedby="password-help"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((shown) => !shown)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-emerald-800"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="h-5 w-5" />
                    ) : (
                      <AiOutlineEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p
                  id="password-help"
                  className="mt-1 text-xs leading-5 text-slate-500"
                >
                  8–16 characters, including a letter, number, and special
                  character.
                </p>
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={inputClass}
                  placeholder="Enter your password again"
                  required
                  aria-invalid={Boolean(formErrors.confirmPassword)}
                  aria-describedby={
                    formErrors.confirmPassword
                      ? "confirmPassword-error"
                      : undefined
                  }
                />
                {formErrors.confirmPassword && (
                  <p
                    id="confirmPassword-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {serverError && (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#12372a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-800 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Registration;
