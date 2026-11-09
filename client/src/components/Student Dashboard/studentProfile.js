import React, { useEffect, useState } from "react";
import { FaHome, FaRegUser } from "react-icons/fa";
import { FaBarsProgress } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, loginUser } from "../redux/action";
import axios from "axios";
import { toast } from "react-toastify";

const getProfileData = (user = {}) => ({
  firstName: user.firstName || "",
  lastName: user.lastName || "",
  dateOfBirth: user.dateOfBirth?.slice(0, 10) || "",
  email: user.email || "",
  phone: user.phone || "",
  course: user.course || "",
  _id: user._id || "",
});

const profileFields = [
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "dateOfBirth", label: "Date of birth", type: "date" },
  { name: "email", label: "Email address", type: "email" },
  { name: "phone", label: "Phone number", type: "tel" },
  { name: "course", label: "Registered course", type: "text" },
];

const navItems = [
  { label: "Dashboard", to: "/Dashboard", icon: FaHome },
  { label: "Profile", to: "/studentprofile", icon: FaRegUser },
  { label: "Leaderboard", to: "/leaderboard", icon: FaBarsProgress },
];

const StudentProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.custom.user);

  const [userData, setUserData] = useState(() => getProfileData(user));
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (user?.role !== "student") {
      navigate("/login", { replace: true });
      return;
    }

    setUserData(getProfileData(user));
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setServerError("");
  };

  const handleCancel = () => {
    setUserData(getProfileData(user));
    setErrors({});
    setServerError("");
    setEditMode(false);
  };

  const validateProfile = () => {
    const nextErrors = {};
    const phoneDigits = userData.phone.replace(/\D/g, "");

    if (userData.firstName.trim().length < 2) {
      nextErrors.firstName = "Enter at least 2 characters.";
    }

    if (userData.lastName.trim().length < 2) {
      nextErrors.lastName = "Enter at least 2 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      nextErrors.phone = "Enter a phone number with 7 to 15 digits.";
    }

    if (
      userData.dateOfBirth &&
      userData.dateOfBirth > new Date().toISOString().slice(0, 10)
    ) {
      nextErrors.dateOfBirth = "Date of birth can’t be in the future.";
    }

    return nextErrors;
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const validationErrors = validateProfile();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSaving(true);
    setServerError("");

    const updatedProfile = {
      ...userData,
      firstName: userData.firstName.trim(),
      lastName: userData.lastName.trim(),
      email: userData.email.trim().toLowerCase(),
      phone: userData.phone.trim(),
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/updatepersonaldata",
        updatedProfile,
      );

      const updatedUser = response.data.user || updatedProfile;

      // Keep only profile fields in Redux/local storage; don't store a returned password hash.
      dispatch(
        loginUser({
          ...user,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          dateOfBirth: updatedUser.dateOfBirth,
          email: updatedUser.email,
          phone: updatedUser.phone,
          course: updatedUser.course,
        }),
      );

      setUserData(getProfileData(updatedUser));
      setEditMode(false);
      toast.success(response.data.message || "Profile updated successfully.");
    } catch (requestError) {
      const message =
        requestError.response?.data?.message ||
        "Could not update your profile. Please try again.";

      setServerError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const initials = `${userData.firstName?.[0] || "S"}${
    userData.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="min-h-screen bg-[#f3f5ef] text-slate-800 lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col bg-[#12372a] px-5 py-7 text-white lg:flex">
        <Link to="/" className="px-3 text-xl font-bold tracking-tight">
          Marfat-ul-Quran
        </Link>

        <p className="mt-12 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/60">
          Student menu
        </p>

        <nav className="mt-4 space-y-1" aria-label="Student navigation">
          {navItems.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                label === "Profile"
                  ? "bg-white/10 text-white"
                  : "text-emerald-50/80 hover:bg-white/10 hover:text-white"
              }`}
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
          <Link to="/" className="font-bold text-[#12372a]">
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
          {navItems.map(({ label, to }) => (
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

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#12372a]">
            Student profile
          </h1>
          <p className="mt-2 text-slate-600">
            View and manage your personal information.
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="flex flex-col gap-5 border-b border-emerald-950/10 bg-[#fbfaf5] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#12372a] text-lg font-bold text-white">
                {initials}
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#12372a]">
                  {[userData.firstName, userData.lastName]
                    .filter(Boolean)
                    .join(" ") || "Student"}
                </h2>
                <p className="text-sm text-slate-600">{userData.email}</p>
              </div>
            </div>

            {!editMode && (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="rounded-lg bg-[#12372a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                Edit profile
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="p-5 sm:p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {profileFields.map(({ name, label, type }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    {label}
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={userData[name] || ""}
                    onChange={handleChange}
                    readOnly={!editMode}
                    autoComplete={
                      name === "firstName"
                        ? "given-name"
                        : name === "lastName"
                          ? "family-name"
                          : name === "email"
                            ? "email"
                            : name === "phone"
                              ? "tel"
                              : undefined
                    }
                    className={`w-full rounded-lg border px-4 py-3 outline-none transition ${
                      editMode
                        ? "border-slate-300 bg-white text-slate-900 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                    aria-invalid={Boolean(errors[name])}
                    aria-describedby={
                      errors[name] ? `${name}-error` : undefined
                    }
                  />
                  {errors[name] && (
                    <p
                      id={`${name}-error`}
                      className="mt-1 text-sm text-red-600"
                    >
                      {errors[name]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {serverError && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {serverError}
              </p>
            )}

            {editMode && (
              <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-[#12372a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
};

export default StudentProfile;
