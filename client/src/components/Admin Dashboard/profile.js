import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
const AdminProfile = () => {
  // Example initial admin profile state
  const initialProfile = {
    id: 1, // Assuming an ID for the admin profile
    username: "admin",
    fullName: "Admin User",
    email: "admin@example.com",
    phone: "123-456-7890",
    address: "123 Admin St, Adminville",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...initialProfile });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEdit = () => {
    setEditMode(true);
    setForm({ ...profile });
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({ ...profile });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...form });
    setEditMode(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="lg:w-[80%] w-full p-2 mx-2 bg-white rounded-lg shadow-lg">
        <Link to="/admindashboard" className="text-gray-500">
          <RxCross1 />
        </Link>
        <div className="p-4 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Admin Profile</h2>
            {!editMode && (
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
          <form
            onSubmit={handleSubmit}
            className={`p-4 bg-white rounded-lg shadow-md ${
              editMode ? "" : "hidden"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>
          </form>
          <div className={`${editMode ? "hidden" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <p className="font-semibold">Full Name:</p>
                <p>{profile.fullName}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Email:</p>
                <p>{profile.email}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Phone:</p>
                <p>{profile.phone}</p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Address:</p>
                <p>{profile.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
