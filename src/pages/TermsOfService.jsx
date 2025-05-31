import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black to-gray-900 text-white font-urbanist px-4 py-10">
      <div className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 text-center">Terms of Service</h1>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">1. Acceptance of Terms</h2>
          <p className="text-gray-300 text-sm">
            By accessing or using JANADRIVE, you agree to be bound by these terms. If you do not agree to these terms,
            you may not access or use our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">2. Modifications</h2>
          <p className="text-gray-300 text-sm">
            We reserve the right to change these terms at any time. Changes will be effective immediately upon posting.
            Continued use of the service constitutes acceptance of the updated terms.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">3. Account Responsibility</h2>
          <p className="text-gray-300 text-sm">
            You are responsible for maintaining the security of your account and any activity that occurs under your
            credentials.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">4. Prohibited Conduct</h2>
          <p className="text-gray-300 text-sm">
            You agree not to engage in misuse of the platform, including illegal activity, spamming, or attempting to
            compromise system integrity.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-white">5. Termination</h2>
          <p className="text-gray-300 text-sm">
            We may suspend or terminate your access at any time if you violate these terms or engage in harmful behavior
            on the platform.
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

export default TermsOfService;
