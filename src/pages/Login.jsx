import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email) return handleError("Email is required");
    if (!password) return handleError("Password is required");
    try {
      const url = "http://localhost:8080/api/user_auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => navigate("/home"), 1000);
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
            "url('https://wallpapercat.com/w/full/8/e/7/607651-3840x2160-desktop-4k-sports-car-background-image.jpg')",
        }}
      >
        <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-10 rounded-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Login <br /> <span className="font-normal mt-4">JANADRIVE</span>
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm text-gray-300 mb-1"
              >
                Email <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                value={loginInfo.email}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="text-left relative">
              <label
                htmlFor="password"
                className="block text-sm text-gray-300 mb-1"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                value={loginInfo.password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <div
                className="absolute top-[38px] right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <div className="flex justify-between hover:underline">
              <p></p>
              <Link
                to="/forgot-password"
                className="text-yellow-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-xl font-semibold">
              Login
            </button>
          </form>
          <p className="mt-6 text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-400 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
