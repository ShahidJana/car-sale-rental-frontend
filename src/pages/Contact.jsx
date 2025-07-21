import React, { useState } from "react";
const API_URL = `http://localhost:8080/api`;
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";

function Contact() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!name.trim()) {
      return handleError("Name is required");
    } else if (!isNaN(name)) {
      return handleError("Name cannot be a number");
    } else if (!email) {
      return handleError("Email is required");
    } else if (!gmailPattern.test(email)) {
      return handleError("Only @gmail.com addresses are allowed");
    } else if (!phone) {
      return handleError("Phone no is required");
    } else if (!message) {
      return handleError("Please write a message");
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (data.success) {
        e.target.reset();
        handleSuccess(data.message);
      } else {
        handleError(data.error || "Something went wrong.");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen font-urbanist">
      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl text-white mb-4 tracking-tight leading-tight drop-shadow-md">
            Your Journey Starts with <br />
            <span className="text-yellow-400">Comfort</span> &{" "}
            <span className="text-green-400">Care</span>
          </h1>
          <p className="text-md md:text-sm text-gray-200 max-w-2xl">
            Whether you're renting or buying a car, we prioritize your safety
            and satisfaction every mile of the way. Reach out to us and let's
            get you on the road!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <div className="grid grid-cols-1 md:grid-cols gap-10 px-6 md:px-12 py-12">
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            <span className="text-yellow-500">Contact</span> Us
          </h2>
          <p className="text-gray-600 mb-6">
            Have a question or need help? Fill out the form and our team will
            get back to you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl mx-auto grid grid-cols-1 gap-5 bg-white rounded-2xl shadow-lg p-8"
          autoComplete="off"
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Shahid Hussain"
              maxLength={25}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. shahid@example.com"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="\d{11}"
              maxLength={11}
              placeholder="11-digit phone number"
              title="Enter 11-digit phone number"
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              maxLength={500}
              placeholder="Type your message here..."
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 rounded-md text-white transition duration-200 font-medium ${
                loading
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contact;
