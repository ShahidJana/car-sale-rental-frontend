import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-white font-urbanist px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">1. Introduction</h2>
          <p className="text-gray-300 text-sm">
            At JANADRIVE, we are committed to protecting your privacy and ensuring transparency in how we collect, use,
            and safeguard your personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">2. Information We Collect</h2>
          <p className="text-gray-300 text-sm">
            We collect data such as your name, email address, and contact number when you register or interact with our platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">3. Use of Information</h2>
          <p className="text-gray-300 text-sm">
            Your data is used to improve services, process requests, enhance user experience, and communicate important updates.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">4. Security Measures</h2>
          <p className="text-gray-300 text-sm">
            We apply strong security protocols to ensure your data is protected from unauthorized access, alteration, or loss.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">5. Data Sharing</h2>
          <p className="text-gray-300 text-sm">
            We do not sell or disclose your information to third parties, except when required by law or to fulfill service obligations.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">6. Your Rights</h2>
          <p className="text-gray-300 text-sm">
            You can access, modify, or request deletion of your personal data by contacting our support team.
          </p>
        </section>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-6 rounded-xl font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
