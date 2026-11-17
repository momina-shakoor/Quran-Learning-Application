import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaRegEyeSlash,
  FaRegEye,
  FaChalkboardTeacher,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const API_URL = "http://localhost:8080/api/users";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const AdminTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getTeachers = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/allauths`);
      const allAuths = data.AllAuths || data.allAuths || [];
      setTeachers(allAuths.filter((item) => item.role === "teacher"));
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load teachers.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      role: "teacher",
    };

    if (!payload.firstName || !payload.lastName || !payload.email) {
      toast.error("Fill in the required fields.");
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        // A blank password leaves the existing password unchanged.
        if (!payload.password) delete payload.password;

        const { data } = await axios.put(
          `${API_URL}/updateauth/${editingId}`,
          payload,
        );

        toast.success(data.message || "Teacher updated.");
        await getTeachers();
      } else {
        const { data } = await axios.post(`${API_URL}/authsignup`, payload);
        toast.success(data.message || "Teacher added.");
        await getTeachers();
      }

      resetForm();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (editingId ? "Could not update teacher." : "Could not add teacher."),
      );
    } finally {
      setIsSaving(false);
    }
  };

  const editTeacher = (teacher) => {
    setEditingId(teacher._id);
    setForm({
      firstName: teacher.firstName || "",
      lastName: teacher.lastName || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      password: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteTeacher = async (id) => {
    try {
      const { data } = await axios.delete(`${API_URL}/deleteAuth/${id}`);
      setTeachers((current) => current.filter((teacher) => teacher._id !== id));
      if (editingId === id) resetForm();
      toast.success(data.message || "Teacher deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete teacher.");
    }
  };

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f7f2]">
      <div className="mx-auto min-h-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <Link
            to="/admindashboard"
            aria-label="Close teacher management"
            className="rounded-full border border-emerald-900/10 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <RxCross1 aria-hidden="true" />
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Admin workspace
          </span>
        </header>

        <section className="mb-8">
          <div className="flex items-center gap-3 text-emerald-800">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
              <FaChalkboardTeacher className="text-xl" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider">
                Teaching team
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-[#12372a] sm:text-4xl">
                Manage teachers
              </h1>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-slate-600">
            Create teacher accounts and manage the teaching team.
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-[#12372a]">
              {editingId ? "Edit teacher" : "Add a teacher"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {editingId
                ? "Leave password blank to keep the current password."
                : "Create an account for an approved teacher."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
                autoComplete="given-name"
                required
                maxLength={60}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
                autoComplete="family-name"
                required
                maxLength={60}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                autoComplete="email"
                required
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                autoComplete="tel"
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={
                    editingId ? "New password (optional)" : "Password"
                  }
                  autoComplete="new-password"
                  required={!editingId}
                  minLength={6}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 hover:text-emerald-800"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {!editingId && <FaPlus aria-hidden="true" />}
                {isSaving
                  ? "Saving…"
                  : editingId
                    ? "Save changes"
                    : "Add teacher"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-7">
            <h2 className="font-semibold text-[#12372a]">Teacher accounts</h2>
            <p className="mt-1 text-sm text-slate-500">
              {teachers.length} {teachers.length === 1 ? "teacher" : "teachers"}
            </p>
          </div>

          {isLoading ? (
            <p className="px-5 py-12 text-center text-slate-500">
              Loading teachers…
            </p>
          ) : teachers.length === 0 ? (
            <p className="px-5 py-12 text-center text-slate-600">
              No teacher accounts found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Teacher</th>
                    <th className="px-5 py-3 font-semibold">Email</th>
                    <th className="px-5 py-3 font-semibold">Phone</th>
                    <th className="px-5 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teachers.map((teacher) => (
                    <tr key={teacher._id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4 font-medium text-slate-800">
                        {teacher.firstName} {teacher.lastName}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {teacher.email}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {teacher.phone || "—"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => editTeacher(teacher)}
                            className="inline-flex items-center gap-2 rounded-lg border border-emerald-800/20 px-3 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-50"
                          >
                            <FaEdit aria-hidden="true" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteTeacher(teacher._id)}
                            className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
                          >
                            <FaTrash aria-hidden="true" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminTeacher;
