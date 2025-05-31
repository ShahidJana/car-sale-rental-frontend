import React, { useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("values");

  const Contexts = () => {
    switch (activeTab) {
      case "mission":
        return (
          <>
            <h3 className="text-3xl text-gray-800 mb-4">
              Our <span className="text-yellow-500">Mission</span>
            </h3>
            <p className="text-gray-700 mb-4">
              We are dedicated to providing an outstanding car sale and rental
              service that prioritizes:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                ✅ Creating a seamless and trustworthy experience for all users.
              </li>
              <li>✅ Leveraging innovative technology for ease of use.</li>
              <li>✅ Offering transparent pricing with no hidden fees.</li>
              <li>✅ Providing personalized customer support.</li>
              <li>✅ Ensuring convenient access to quality vehicles.</li>
            </ul>
          </>
        );

      case "vision":
        return (
          <>
            <h3 className="text-3xl text-gray-800 mb-4">
              Our <span className="text-yellow-500">Vision</span>
            </h3>
            <p className="text-gray-700 mb-4">
              We aspire to be the leading car sale and rental platform by
              focusing on:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>✅ Continuous innovation in technology and services.</li>
              <li>
                ✅ Promoting sustainable and eco-friendly transportation
                options.
              </li>
              <li>
                ✅ Building strong trust and lasting relationships with
                customers.
              </li>
              <li>
                ✅ Empowering communities with reliable mobility solutions.
              </li>
              <li>✅ Delivering excellence in every customer interaction.</li>
            </ul>
          </>
        );

      case "values":
      default:
        return (
          <>
            <h3 className="text-3xl text-gray-800 mb-4">
              What We <span className="text-yellow-500">Stand For</span>
            </h3>
            <p className="text-gray-700 mb-4">
              Our core values drive our commitment to integrity, transparency
              and exceptional service, ensuring a superior experience in car
              buying and renting tailored to meet every customer's needs.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>
                ✅ Leveraging technology to make car buying and renting easier.
              </li>
              <li>
                ✅ Promoting eco-friendly options in our fleet and operations.
              </li>
              <li>✅ Clear pricing and no hidden fees.</li>
              <li>✅ Your satisfaction is our top priority.</li>
            </ul>
          </>
        );
    }
  };

  return (
    <div className="bg-white text-black min-h-screen font-urbanist">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <section
        className="relative w-full h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611251954432-9a61cc620bf2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl text-white mb-4 tracking-tight leading-tight drop-shadow-md">
            Welcome to <span className="text-green-600">JANADRIVE</span> – Your{" "}
            <br /> <span className="text-yellow-400">Trusted</span> Car Partner
          </h1>
          <p className="text-md md:text-sm text-gray-200 max-w-2xl">
            We’re passionate about making car ownership and rentals easy and
            transparent, <br /> delivering a hassle-free experience for all your
            car needs.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-50 text-center">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <img
            src="https://femina.wwmindia.com/content/2021/sep/women-thumb1632797644.jpg"
            alt="Woman in car"
            className="rounded-2xl shadow-md"
          />
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-3xl text-gray-900 mb-4">
              About <span className="text-yellow-500">Us</span>
            </h2>
            <p className="text-gray-700 mb-4 text-balance font-medium">
              Your trusted source for buying or renting cars. We offer a wide
              selection, transparent pricing, and flexible financing options,
              all designed to make your experience smooth and hassle-free.
            </p>
          </div>
          <img
            src="https://img.freepik.com/free-photo/portrait-smiling-young-man-rubbing-his-hands_171337-10297.jpg"
            alt="Man with car"
            className="rounded-2xl shadow-md"
          />
        </div>
      </section>

      {/* Values, Mission & Vision Section */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl ">
            Driving Excellence and Innovation in <br /> Car{" "}
            <span className="text-yellow-500">Buying</span> &{" "}
            <span className="text-green-500">Rental</span> Services
          </h2>
          <p className="text-gray-600 mt-4 max-w-xl mx-auto">
            At JANADRIVE, we focus on excellence and innovation in car buying
            and rental services, ensuring a seamless and exceptional customer
            experience.
          </p>
          <div className="mt-6 space-x-4">
            <button
              onClick={() => setActiveTab("values")}
              className={`py-2 px-4 rounded-xl ${
                activeTab === "values"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-green-600`}
            >
              Our Values
            </button>
            <button
              onClick={() => setActiveTab("mission")}
              className={`py-2 px-4 rounded-xl ${
                activeTab === "mission"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-green-600`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`py-2 px-4 rounded-xl ${
                activeTab === "vision"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-green-600`}
            >
              Our Vision
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-left">{Contexts()}</div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-20 bg-black text-white mx-8 rounded-t-3xl mb-px">
        <h2 className="text-3xl text-center mb-8">
          Our Dedicated <span className="text-yellow-500">Team</span>
        </h2>
        <p className="text-center text-sm text-gray-300 mb-12 max-w-2xl mx-auto">
          We are proud of our team of automotive experts, customer service
          professionals, and technology <br /> innovators. Together, we work
          hard to ensure your experience is smooth and enjoyable.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <img
              src="https://themost.com.tr/wp-content/uploads/2023/04/tm-men1_0001_TM-MEN3.jpg"
              alt="Team Member"
              className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
            />
          </div>
          <div className="text-center">
            <img
              src="https://media.istockphoto.com/id/1180926773/photo/studio-waist-up-portrait-of-a-beautiful-businesswoman-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=ksj6EMM6NiETqyOptZ43dR3dKT57gdoL7RnehQ0spBk="
              alt="Emma"
              className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Emma</h3>
            <p className="text-gray-400">Founder & CEO</p>
          </div>
          <div className="text-center">
            <img
              src="https://www.fgman.co.uk/wp-content/uploads/images/fgman-babers-stafford-hero-2-2.webp"
              alt="Team Member"
              className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
