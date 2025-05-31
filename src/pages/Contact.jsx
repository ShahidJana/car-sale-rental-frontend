import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
const API_URL = `http://localhost:8080/api`;
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";

function Contact() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const message = e.target.message.value;
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!name && !email && !phone && !message) {
      return handleError("All fields are required");
    } else if (!name) {
      return handleError("Name is required");
    } else if (!email) {
      return handleError("Email is required");
    } else if (!gmailPattern.test(email)) {
      return handleError("Only @gmail.com addresses are allowed");
    } else if (!phone) {
      return handleError("Phone no is required");
    } else if (!message) {
      return handleError("Please write a message");
    }

    try {
      const res = await fetch(`${API_URL}/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess(data.message);
        e.target.reset();
      } else {
        handleError(data.error || "Something went wrong.");
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen font-urbanist">
      <Header />

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
          className="grid grid-cols-1 gap-4 bg-white rounded-xl shadow-md p-6"
        >
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            maxLength={25}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            id="phone"
            pattern="\d{11}"
            maxLength={11}
            name="phone"
            placeholder="Phone Number (11 digits)"
            title="Enter 11-digit phone number"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            rows="4"
            id="message"
            name="message"
            placeholder="Your Message"
            maxLength={500}
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 w-fit"
          >
            Send Message
          </button>
        </form>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default Contact;
