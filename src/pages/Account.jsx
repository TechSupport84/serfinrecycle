import React, { useState } from "react";
import { FiUser, FiLock, FiMail, FiSettings, FiLogOut } from "react-icons/fi";

function Account() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "https://via.placeholder.com/150",
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-6">
      {/* Profile Section */}
      <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
        />
        <h2 className="text-2xl font-bold mt-4">{user.name}</h2>
        <p className="text-gray-400">{user.email}</p>
      </div>

      {/* Account Settings */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Update Info */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FiUser /> Update Profile
          </h3>
          <input
            type="text"
            placeholder="Full Name"
            className="mt-4 w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="mt-3 w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-lg font-semibold">
            Save Changes
          </button>
        </div>

        {/* Change Password */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FiLock /> Change Password
          </h3>
          <input
            type="password"
            placeholder="Current Password"
            className="mt-4 w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <input
            type="password"
            placeholder="New Password"
            className="mt-3 w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button className="mt-4 w-full bg-green-600 hover:bg-green-700 transition text-white p-3 rounded-lg font-semibold">
            Update Password
          </button>
        </div>
      </div>

      {/* Subscription & Orders */}
      <div className="w-full max-w-4xl mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <FiSettings /> Order & Subscription History
        </h3>
        <p className="text-gray-400 mt-2">No recent orders or subscriptions.</p>
      </div>

      {/* Logout Button */}
      <button className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center gap-2">
        <FiLogOut /> Logout
      </button>
    </div>
  );
}

export default Account;
