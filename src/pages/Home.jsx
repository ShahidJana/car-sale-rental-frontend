import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCarSide,
  FaDollarSign,
  FaHandsHelping,
  FaTools,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Testimonials from "../components/common/Testimonials";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { handleError } from "../utils";

const faqs = [
  {
    question: "How do I buy a car from your website?",
    answer:
      "You can browse our inventory online, select a car you like, and either purchase it directly or schedule a test drive at one of our locations.",
  },
  {
    question: "What financing options do you offer?",
    answer:
      "We work with multiple lenders to provide competitive financing options, including loans and leases with various term lengths.",
  },
  {
    question: "Can I return a car if I'm not satisfied?",
    answer:
      "We offer a 7-day return policy on most vehicles with certain restrictions. Please check our return policy for details.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we can arrange international shipping for most vehicles. Additional fees and paperwork will apply.",
  },
];

const articles = [
  {
    title: "Electric Vehicles: The Future of Driving",
    date: "May 15, 2023",
    image:
      "https://muxtech.com.pk/wp-content/uploads/2025/01/How-to-buy-a-used-car.webp",
    link: "#",
  },
  {
    title: "Top 10 Luxury Cars of 2023",
    date: "April 28, 2023",
    image:
      "https://muxtech.com.pk/wp-content/uploads/2025/01/How-to-buy-a-used-car.webp",
    link: "#",
  },
  {
    title: "How to Maintain Your Car's Value",
    date: "March 10, 2023",
    image:
      "https://muxtech.com.pk/wp-content/uploads/2025/01/How-to-buy-a-used-car.webp",
    link: "#",
  },
];

const FeaturedArticle = {
  title: "The Complete Guide to Buying a Used Car",
  description:
    "Learn everything you need to know about purchasing a pre-owned vehicle with confidence.",
  date: "June 2, 2023",
  image:
    "https://muxtech.com.pk/wp-content/uploads/2025/01/How-to-buy-a-used-car.webp",
  link: "#",
};

const CarCard = ({ car }) => {
  return (
    <div
      className={`rounded-xl p-6 flex flex-col justify-between shadow-md
         bg-white text-black`}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">
          {car.make}
          {car.model}
        </h2>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center 
              bg-green-600 text-white
          `}
        >
          <FaChevronUp size={20} />
        </div>
      </div>
      <div className="mt-4">
        <p>
          <span className="font-semibold">Price:</span>{" "}
          <span className={""}>{car.price}</span>
        </p>
        <p>
          <span className="font-semibold">Mileage:</span>{" "}
          <span className={""}>{car.mileage}</span>
        </p>
        {/* <p className="mt-2 text-sm">{car.description}</p> */}
      </div>
      {car.images?.length > 0 && car.images[0]?.url && (
        <img
          src={car.images[0].url}
          alt={car.title || "Car image"}
          className="w-full h-40 object-contain mt-4"
        />
      )}
    </div>
  );
};

const LandingPage = () => {
  const [cars, setCars] = useState([]);
  const [saleCars, setsaleCars] = useState([]);
  const [rentCars, setrentCars] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/cars");
        setCars(data);
        setsaleCars(data.filter((car) => car.listingType === "sale"));
        setrentCars(data.filter((car) => car.listingType === "rent"));
      } catch (err) {
        handleError(err.message);
      }
    };
    fetchCars();
  }, []);
  

  return (
    <>
      <div className="min-h-screen bg-white text-white font-urbanist">
        {/* Header */}
        <Header />

        {/* Hero Section */}
        <section
          className="relative text-center py-24 px-4 md:px-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://img.sm360.ca/images/article/lallier/127345//2023_civic_typer_00001711990785141.jpg')",
          }}
        >
          {/* Dark overlay ONLY on image */}
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

          {/* Text and content on top */}
          <div className="relative z-10 py-20 px-4 md:px-10">
            <h1 className="text-4xl md:text-5xl text-white">
              <span className="text-yellow-400">Buy</span> or{" "}
              <span className="text-yellow-400">Rent</span> Your Dream Car
            </h1>
            <p className="mt-6 mx-auto text-md md:text-sm text-gray-200 max-w-2xl">
              Looking to buy or rent a car? Explore our vast inventory of cars
              for sale or rent at unbeatable <br /> prices. Start your journey
              with us today and find the perfect vehicle for your needs!
            </p>
            <div className="mt-8 flex justify-center gap-6 flex-wrap">
              <Link to="/car-sale">
                <button className="hover:bg-green-600 text-white bg-transparent px-6 py-3 hover:rounded-full font-semibold">
                  Browse Cars for Sale
                </button>
              </Link>
              <Link to="/car-rent">
                <button className="text-white hover:bg-green-600 bg-transparent px-6 py-3 hover:rounded-full font-semibold">
                  Explore Car Rentals
                </button>
              </Link>
            </div>
          </div>
        </section>

        <div className="bg-white py-12 px-4 md:px-16 lg:px-24">
          <div className="mt-12 bg-gray-100 rounded-xl py-6 px-4 flex flex-wrap justify-center items-center gap-8">
            <img
              src="https://www.carlogos.org/logo/Audi-logo-2009-1920x1080.png"
              alt="Audi"
              className="h-8"
            />
            <img
              src="https://www.carlogos.org/logo/Rolls-Royce-logo-2048x2048.png"
              alt="Rolls-Royce"
              className="h-8"
            />
            <img
              src="https://www.pngfind.com/pngs/m/51-517860_download-bmw-logo-car-company-png-transparent-images.png"
              alt="BMW"
              className="h-8"
            />
            <img
              src="https://www.carlogos.org/logo/Jaguar-logo-2012-1920x1080.png"
              alt="Jaguar"
              className="h-8"
            />
            <img
              src="https://www.carlogos.org/logo/Mercedes-Benz-logo-2011-1920x1080.png"
              alt="Mercedes"
              className="h-8"
            />
          </div>
        </div>

        {/* Top Car Sale */}
        <div className="max-w-7xl mx-auto bg-white py-12 px-4 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-16 mb-16">
            <div>
              <h1 className="text-4xl text-black">
                Top Picks for Cars <br />
                on
                <span className="text-yellow-500"> Sale</span>
              </h1>
            </div>
            <p className="mt-2 text-gray-600 max-w-md">
              Discover our best deals on cars for sale. Handpicked just for you,
              these cars come with excellent pricing and top quality.
            </p>
            <Link to="/car-sale">
              <button className="mt-3 md:mt-0 bg-green-600 text-white px-6 py-2 text-base rounded-full font-medium">
                View All
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {saleCars.map((car) => (
              <Link to="/car-sale" key={car._id}>
                <CarCard car={car} />
              </Link>
            ))}
          </div>
        </div>

        {/* Car Rental Deals */}
        <div className="max-w-7xl mx-auto bg-black text-white p-6 rounded-3xl ml-2 mr-2 my-10 py-12 px-4 md:px-16 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center mt-12 mb-12">
            <div>
              <h2 className="text-4xl">
                Best Car <br />
                <span className="text-yellow-400">Rental</span> Deals
              </h2>
            </div>
            <p className="mt-2 text-gray-300 max-w-md">
              Looking for a rental car? Check out our selection of cars
              available for rent with flexible terms and competitive rates.
            </p>
            <Link to="/car-rent">
              <button className="mt-4 md:mt-0 bg-green-500 text-white px-6 py-2 text-base rounded-full hover:bg-green-600 transition">
                View All
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rentCars.map((car, index) => (
              <div
                key={car._id}
                className="bg-white text-black rounded-2xl overflow-hidden shadow-lg flex flex-col"
              >
                <img
                  src={car.images[0].url}
                  alt={car.make}
                  className="h-52 object-contain w-full"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">
                    {car.make}
                    {car.model}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-700 mt-2">
                    <div>
                      <span className="font-semibold">Price:</span> {car.price}
                    </div>
                    <div>
                      <span className="font-semibold">Mileage:</span>{" "}
                      {car.mileage}
                    </div>
                  </div>
                </div>
                <div className="bg-green-500 text-white flex items-center justify-between px-4 py-3">
                  <span>
                    {/* {car.title.split(" ")[0]} {car.title.split(" ")[1]} */}
                  </span>
                  <div className="bg-white text-green-500 p-1 rounded-full">
                    <FaChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="py-16 px-6 md:px-20 bg-white text-black text-center">
          <h2 className="text-3xl md:text-4xl">
            Why <span className="text-yellow-400">Choose</span> Us
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We provide a smooth car buying or renting experience with great
            vehicle options, clear pricing, and top-notch customer support.
          </p>

          {/* Main Layout */}
          <div className="mt-16 grid md:grid-cols-3 gap-10 items-center">
            {/* Left Features */}
            <div className="space-y-10 text-left">
              <div className="flex items-start space-x-4">
                <FaCarSide className="text-yellow-500 text-4xl" />
                <div>
                  <h4 className="text-lg font-bold">
                    Wide Selection of Vehicles
                  </h4>
                  <p className="text-gray-600">
                    Choose from a diverse selection of cars to suit your style
                    and budget.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaDollarSign className="text-green-500 text-4xl" />
                <div>
                  <h4 className="text-lg font-bold">Transparent Pricing</h4>
                  <p className="text-gray-600">
                    We believe in clear, upfront pricing with no hidden fees.
                  </p>
                </div>
              </div>
            </div>

            {/* Oval with Car */}
            <div className="relative flex justify-center items-center">
              {/* Oval Shape */}
              <div className="w-72 h-96 bg-blue-100 rounded-full overflow-hidden relative z-0">
                <img
                  src="https://img.freepik.com/free-photo/blue-sky-clouds_1417-1866.jpg"
                  alt="background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Car Image */}
              <img
                src="https://file.aiquickdraw.com/imgcompressed/img/compressed_bc86f979540c292feb43e4615cfbf8b7.webp"
                alt="Car"
                className="absolute bottom-0 z-10 w-[280px] translate-y-55 mr-20"
              />
            </div>

            {/* Right Features */}
            <div className="space-y-10 text-left">
              <div className="flex items-start space-x-4">
                <FaHandsHelping className="text-green-500 text-4xl" />

                <div>
                  <h4 className="text-lg font-bold">
                    Flexible Financing Options
                  </h4>
                  <p className="text-gray-600">
                    Get customized financing plans that fit your budget.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaTools className="text-yellow-500 text-4xl" />

                <div>
                  <h4 className="text-lg font-bold">
                    Exceptional Customer Service
                  </h4>
                  <p className="text-gray-600">
                    Our team is dedicated to providing seamless support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Frequently Ask Questions */}
        <div className="min-h-screen bg-white p-6 md:p-12 flex flex-col items-center md:flex-row gap-12 max-w-7xl mx-auto py-12 px-4 md:px-16 lg:px-24">
          {/* Left Side */}
          <div className="flex flex-col items-start">
            <h1 className="text-4xl text-black mb-24">
              Frequently Asked <br />
              <span className="text-yellow-500">Questions</span>
            </h1>
            <div className="mt-10 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src="https://images.pexels.com/photos/2789781/pexels-photo-2789781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Red Ferrari on a coastal road"
                className="w-[350px] h-[250px] object-cover"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full max-w-xl flex flex-col gap-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl shadow-md transition-all duration-300 overflow-hidden ${
                  activeIndex === index
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <button
                  className="flex items-center justify-between w-full p-6 text-left"
                  onClick={() =>
                    setActiveIndex(index === activeIndex ? -1 : index)
                  }
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  {activeIndex === index ? (
                    <FaChevronUp className="w-5 h-5" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 bg-green-600 text-white rounded-full p-1" />
                  )}
                </button>
                {activeIndex === index && faq.answer && (
                  <div className="px-6 pb-6 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Testimonials />

        {/* Update About Cars */}
        {/* <section className="px-4 py-10  max-w-6xl mx-auto">
          <h2 className="text-4xl text-black text-center mb-4">
            Stay Updated with the Latest <br />
            <span className="text-black">Car </span>
            <span className="text-yellow-500">Trends</span> and
            <span className="text-yellow-500"> Tips</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            
            <div className="relative rounded-xl overflow-hidden shadow-md">
              <img
                src={FeaturedArticle.image}
                alt="Featured"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-black/0 text-white p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {FeaturedArticle.title}
                </h3>
                <p className="text-sm mb-2">{FeaturedArticle.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <a
                    href={FeaturedArticle.link}
                    className="text-green-400 font-medium"
                  >
                    Read More
                  </a>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt size={16} />
                    <span>{FeaturedArticle.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {articles.map((article, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <img
                    src={article.image}
                    alt="Thumbnail"
                    className="w-28 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <FaCalendarAlt size={16} />
                      <span>{article.date}</span>
                    </div>
                    <h4 className="text-base font-medium mt-1">
                      {article.title}
                    </h4>
                    <a
                      href={article.link}
                      className="text-green-600 text-sm font-medium mt-1 inline-block"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <Footer />
        <ToastContainer />
      </div>
    </>
  );
};

export default LandingPage;
