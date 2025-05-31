import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="bg-black text-white font-urbanist min-h-screen p-8 ">
        {/* Hero Section */}
        <div className="bg-green-600 rounded-3xl  my-10 mx-auto max-w-7xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">
              Drive Your Dream Car Today!
            </h2>
            <p className="text-base mb-6">
              Whether you're looking to buy or rent, we have the perfect car
              waiting for you. Browse our extensive selection and get behind the
              wheel with ease.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/car-rent">
                <button className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white  hover:text-green-600 transition">
                  Browse Cars
                </button>
              </Link>
              <Link to="/contact-us">
                <button className="border border-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-green-600 transition">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
          <img
            src="https://freepngimg.com/save/165439-suv-pic-black-audi-hd-image-free/700x430"
            alt="Car"
            className="w-72 mt-8 md:mt-0 object-contain"
          />
        </div>

        {/* Info & Footer Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* About JANADRIVE */}
          <div>
            <div className="flex items-center mb-3">
              <div className="bg-green-600 w-4 h-4 rotate-45 mr-2"></div>
              <h3 className="text-green-500 text-xl font-bold">JANADRIVE</h3>
            </div>
            <p className="text-sm text-gray-400">
              We are dedicated to providing the best car <br /> buying and
              renting experience, offering a wide <br /> range of high-quality
              vehicles with excellent <br /> customer service.
            </p>
          </div>

          {/* Navigation, Contact, Social */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Information Links */}
            <div>
              <h4 className="text-gray-300 font-semibold mb-2">INFORMATION</h4>
              <ul className="text-gray-400 space-y-2">
                <li>
                  <Link
                    to="/home"
                    className="hover:text-green-400 hover:underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/car-sale"
                    className="hover:text-green-400 hover:underline"
                  >
                    Buy a Car
                  </Link>
                </li>
                <li>
                  <Link
                    to="/car-rent"
                    className="hover:text-green-400 hover:underline"
                  >
                    Rent a Car
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about-us"
                    className="hover:text-green-400 hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact-us"
                    className="hover:text-green-400 hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-gray-300 font-semibold mb-2 mr-2">CONTACT</h4>
              <ul className="text-gray-400 space-y-4">
                <li className="flex items-center">
                  <span className="bg-green-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white text-xs">
                    ☎
                  </span>
                  +92-123-000-4567
                </li>
                <li className="flex items-start">
                  <span className="bg-green-600 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-white text-xs">
                    🏠︎
                  </span>
                  <span>
                    Block-5th, 73 Street
                    <br />
                    Islamabad, Pakistan
                  </span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-gray-300 font-semibold mb-2">SOCIAL MEDIA</h4>
              <ul className="text-gray-400 space-y-2">
                <li className="hover:underline hover:text-green-400 cursor-pointer">
                  Facebook
                </li>
                <li className="hover:underline hover:text-green-400 cursor-pointer">
                  Instagram
                </li>
                <li className="hover:underline hover:text-green-400 cursor-pointer">
                  Twitter
                </li>
                <li className="hover:underline hover:text-green-400 cursor-pointer">
                  LinkedIn
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-4 px-4 max-w-7xl mx-auto text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <span>© 2025 JANADRIVE. All Rights Reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link
              to="/terms-of-service"
              className="hover:underline hover:text-green-400"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:underline hover:text-green-400"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
