import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    if (!password) return handleError("Password is required");

    try {
      const res = await fetch(
        "http://localhost:8080/api/user_auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );
      const result = await res.json();

      if (result.success) {
        setPassword("");
        handleSuccess(result.message);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        handleError(result.message);
      }
    } catch (err) {
      handleError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-urbanist">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-10 rounded-2xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
          Reset Password <br />{" "}
          <span className="font-normal mt-4">JANADRIVE</span>
        </h2>
        <form onSubmit={handleReset} className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="password"
              className="block text-sm text-gray-300 mb-1"
            >
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password must be at least 6 digits"
              className="w-full p-2 text-black mb-4 px-4 py-2 rounded-xl bg-gray-100  focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-xl font-semibold">
            Update Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ResetPassword;
