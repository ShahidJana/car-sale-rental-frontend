import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils";

function Signup() {
  const [signupInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpInfo({ ...signupInfo, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError("Name, Email & Password are required");
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(email)) {
      return handleError("Only @gmail.com addresses are allowed");
    }

    if (password.length < 6) {
      return handleError("Password must be at least 6 digits long");
    }

    try {
      const url = "http://localhost:8080/api/user_auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1000);
      } else if (error) {
        handleError(error?.details[0].message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="bg-white text-white min-h-screen font-urbanist">
      <div
        className="min-h-screen bg-gradient-to-r from-black to-gray-900 flex justify-center items-center text-white bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/06/83/94/28/360_F_683942890_c2GjYVRjPh9Wu1YYSqTf8M65ystdhpBR.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-10 rounded-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Signup <br /> <span className="font-normal mt-4">JANADRIVE</span>
          </h2>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="text-left">
              <label
                htmlFor="name"
                className="block text-sm text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                name="name"
                value={signupInfo.name}
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={signupInfo.email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="text-left relative">
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupInfo.password}
                placeholder="Password must be at least 6 digits"
                className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div
                className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-xl font-semibold">
              Signup
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Signup;
