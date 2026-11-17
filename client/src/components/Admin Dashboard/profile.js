import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { FaUserShield, FaEnvelope, FaUserTag } from "react-icons/fa";

const AdminProfile = () => {
  const admin = useSelector((state) => state.custom.user);

  const fullName = [admin?.firstName, admin?.lastName]
    .filter(Boolean)
    .join(" ");

  const initials =
    [admin?.firstName, admin?.lastName]
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "A";

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-[#f4f7f2]">
      <div className="mx-auto min-h-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <Link
            to="/admindashboard"
            aria-label="Back to admin dashboard"
            className="rounded-full border border-emerald-900/10 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            <RxCross1 aria-hidden="true" />
          </Link>
          <span className="text-sm font-medium text-slate-500">
            Admin workspace
          </span>
        </header>

        <section className="overflow-hidden rounded-3xl border border-emerald-950/10 bg-white shadow-sm">
          <div className="h-36 bg-gradient-to-r from-emerald-900 via-emerald-800 to-[#486b4e] sm:h-48" />

          <div className="px-5 pb-8 sm:px-9">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border-4 border-white bg-emerald-100 text-2xl font-bold text-emerald-900 shadow-sm sm:h-28 sm:w-28">
                  {initials}
                </div>
                <div className="pb-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-white">
                    Administrator
                  </p>
                  <h1 className="mt-1 text-2xl font-bold text-[#12372a] sm:text-3xl">
                    {fullName || "Admin"}
                  </h1>
                </div>
              </div>
              <span className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-900">
                <FaUserShield aria-hidden="true" />
                Admin account
              </span>
            </div>

            <div className="mt-8 border-t border-slate-100 pt-7">
              <h2 className="text-lg font-semibold text-[#12372a]">
                Account details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Information associated with your administrator account.
              </p>

              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                  <dt className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FaUserTag
                      className="text-emerald-800"
                      aria-hidden="true"
                    />
                    Name
                  </dt>
                  <dd className="mt-2 font-semibold text-slate-800">
                    {fullName || "Not provided"}
                  </dd>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                  <dt className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <FaEnvelope
                      className="text-emerald-800"
                      aria-hidden="true"
                    />
                    Email
                  </dt>
                  <dd className="mt-2 break-all font-semibold text-slate-800">
                    {admin?.email || "Not provided"}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                Profile editing is not connected yet. The details above come
                from the current login session.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminProfile;
