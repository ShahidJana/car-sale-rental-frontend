import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await fetch(
        "http://localhost:8080/api/user_auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginInfo),
        }
      );

      const result = await response.json();
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
    } catch (err) {
      handleError(err.message || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-urbanist">
      {/* Left side - Login Form */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center"
        style={{ backgroundImage: "url()" }} 
      >
        <div className="bg-opacity-10 backdrop-blur-md shadow-xl p-20 rounded-xl w-full h-full text-center">
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Login <br />
            <span className="font-normal mt-2 block">JANADRIVE</span>
          </h2>

          <form
            onSubmit={handleLogin}
            className="space-y-6 w-full"
            autoComplete="off"
          >
            <div className="text-left">
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 mb-1"
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
                className="block text-sm text-gray-600 mb-1"
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

            {/* Forgot Password Link */}
            <div className="flex justify-end text-sm text-gray-300">
              <Link
                to="/forgot-password"
                className="text-yellow-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-xl font-semibold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-500 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Static Image */}
      <div className="hidden md:block w-1/2 relative overflow-hidden">
        <img
          src="https://images6.alphacoders.com/116/thumb-1920-1163956.jpg"
          alt="Car"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginPage;
