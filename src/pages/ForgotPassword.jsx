import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return handleError("Email is required");

    try {
      const res = await fetch(
        "http://localhost:8080/api/user_auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const result = await res.json();
      result.success
        ? (handleSuccess(result.message), setEmail(""))
        : handleError(result.message);

      if (!result.success) {
        setTimeout(() => {
          navigate(-1);
        }, 2500);
      }
    } catch (err) {
      handleError("Something went wrong.");
    }
  };

  return (
    <>
      <div className="bg-gray-900 min-h-screen flex justify-center items-center font-urbanist">
        <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-10 rounded-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Forgot Password <br />{" "}
            <span className="font-normal mt-4">JANADRIVE</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-1"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-2 text-black mb-4 px-4 py-2 rounded-xl bg-gray-100  focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-500 w-full py-2 rounded-xl text-black font-semibold">
              Send Password Reset Link
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default ForgotPassword;
