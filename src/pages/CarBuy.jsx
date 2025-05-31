import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useEffect } from "react";
import CarCard from "../components/common/CarCard";
import Pagination from "../components/common/Pagination";
import { fetchCars } from "../services/CarService";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils/";

const OfferCard = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="bg-white text-black rounded-2xl overflow-hidden shadow-lg">
      <img src={imageSrc} alt={imageAlt} className="w-full h-60 object-cover" />
      <div className="p-6">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold mt-2">{subtitle}</p>
        <p className="text-sm mt-1 text-gray-600">{description}</p>
        <button
          onClick={onButtonClick}
          className="mt-4 bg-green-600 px-5 py-2 text-white rounded-full hover:bg-green-700"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default function CarBuy() {
  const [saleCars, setSaleCars] = useState([]);
  const [adCars, setAdCars] = useState([]);
  const [offerCars, setOfferCars] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSaleCars = async () => {
      const { data, error } = await fetchCars({
        listingType: "sale",
      });

      if (data) {
        setSaleCars(data);
      } else {
        handleError(error.message);
      }
    };
    const getAdCars = async () => {
      const { data, error } = await fetchCars({
        listingType: "ads",
      });

      if (data) {
        setAdCars(data);
      } else {
        handleError(error.message);
      }
    };

    const getSpecialOfferCars = async () => {
      const { data, error } = await fetchCars({
        listingType: "offer",
      });

      if (data) {
        setOfferCars(data);
      } else {
        handleError(error.message);
      }
    };

    getSaleCars();
    getAdCars();
    getSpecialOfferCars();
  }, []);

  console.log("offerCars", offerCars);
  const handleSearch = () => {
    const results = saleCars.filter(
      (car) =>
        car.make.toLowerCase().includes(search.toLowerCase()) ||
        car.model.toLowerCase().includes(search.toLowerCase()) ||
        car.condition.toLowerCase().includes(search.toLowerCase()) ||
        car.listingType.toLowerCase() === "ads".includes(search.toLowerCase())
    );
    setSaleCars(results);
  };

  return (
    <>
      <div className="text-white bg-white min-h-screen font-urbanist">
        {/* Header */}
        <Header />

        {/* Hero Section */}

        <section
          className="relative text-center py-24 px-4 md:px-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          {/* Dark overlay ONLY on image */}
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

          {/* Text and content on top */}
          <div className="relative z-10 py-20 px-4 md:px-10">
            <h1 className="text-4xl md:text-5xl mb-20">
              Car <span className="text-yellow-400 font-semibold">buying</span>
              <br />
              shaped to your life
            </h1>

            <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden mb-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by make, model and codition"
                className="p-2 px-6 w-full text-gray-700 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handleSearch}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-3 text-sm m-1"
              >
                Search
              </button>
            </div>
            {/* <div className="text-gray-400 text-xs font-medium tracking-wide mb-3">OR</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <select className="p-3 rounded-lg border text-sm text-gray-600 w-20 sm:w-1/6 shadow-sm focus:outline-none">
                <option>Make Model</option>
              </select>
              <select className="p-3 rounded-lg border text-sm text-gray-600 w-20 sm:w-1/6 shadow-sm focus:outline-none">
                <option>Make Body</option>
              </select>
              <select className="p-3 rounded-lg border text-sm text-gray-600 w-full sm:w-1/6 shadow-sm focus:outline-none">
                <option>Price</option>
              </select>
            </div> */}
          </div>
        </section>

        {/* Shop Categories */}
        {/* <section className="py-16 px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
            {[
              { title: "Shop New", icon: "🚘", color: "bg-blue-50" },
              { title: "Shop Used", icon: "🚖", color: "bg-yellow-50" },
              { title: "Shop Electric", icon: "🔌", color: "bg-green-50" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl ${item.color} flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all`}
              >
                <div className="text-5xl mb-5">{item.icon}</div>
                <div className="text-xl font-semibold mb-2 text-gray-800">
                  {item.title}
                </div>
                <button className="text-green-600 text-xl font-bold hover:scale-125 transition-transform">
                  →
                </button>
              </div>
            ))}
          </div>
        </section> */}

        {/* Popular Cars Section */}

        <section className="py-20 px-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl text-black mb-10">
              Our <span className="text-yellow-500">Popular</span> Cars
            </h2>
            <p className="mb-12 text-gray-500 max-w-xl mx-auto">
              Check out some of the most popular cars our customers love, known
              for their performance, style, and reliability.
            </p>
            <div>
              {/* Pagination Component it use to show card in page form  */}
              {/* <Pagination cars={saleCars} /> */}
              <Pagination
                data={saleCars}
                itemsPerPage={3}
                renderItem={(car) => <CarCard key={car._id} car={car} />}
                itemsWrapperClass="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
              />
            </div>
          </div>
          {/* </div> */}
        </section>

        {/* Car sale Ads form any user*/}
        <section className="px-6 py-12 bg-black m-2 rounded-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl">
              Car Sale <span className="text-yellow-400">Ads</span>
            </h2>
            {/* <button className="bg-green-600 px-6 py-2 text-white rounded-full hover:bg-green-700">
              View All Ads
            </button> */}
          </div>
          <p className="text-gray-300 mt-2 max-w-xl">
            Don't miss out on exclusive car ads and top-quality deals — find
            your car today!
          </p>

          <Pagination
            data={adCars}
            itemsPerPage={2}
            renderItem={(car) => (
              <OfferCard
                key={car._id}
                imageSrc={`http://localhost:8080/${car.images[0]}`}
                imageAlt={car.make}
                title={`${car.make} ${car.model}`}
                description={car.description}
                buttonText="View Car Ads"
                onButtonClick={() =>
                  navigate(`/car-sale/${car._id}/detailed?type=sale`, {
                    state: { car },
                  })
                }
              />
            )}
            itemsWrapperClass="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          />
        </section>
        {/* Special Offers Section */}
        <section className="px-6 py-12 bg-black m-2 rounded-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl">
              Special <span className="text-yellow-400">Offers</span>
            </h2>
            {/* <button className="bg-green-600 px-6 py-2 text-white rounded-full hover:bg-green-700">
              View All
            </button> */}
          </div>
          <p className="text-gray-300 mt-2 max-w-xl">
            Don’t miss out on our exclusive deals and special offers on
            top-quality cars.
          </p>

          <Pagination
            data={offerCars}
            itemsPerPage={2}
            renderItem={(car) => (
              <OfferCard
                key={car._id}
                imageSrc={`http://localhost:8080/${car.images[0]}`}
                imageAlt={car.make}
                title={`${car.make} ${car.model}`}
                description={car.description}
                buttonText="View Car Ads"
                onButtonClick={() =>
                  navigate(`/car-sale/${car._id}/detailed?type=sale`, {
                    state: { car },
                  })
                }
              />
            )}
            itemsWrapperClass="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          />
        </section>

        {/* Top-rated Cars Section */}
        <section className="bg-white text-black px-6 py-12">
          <h2 className="text-4xl text-center">
            <span className="text-yellow-500">Top-rated</span> cars by type
          </h2>
          <p className="text-center text-gray-600 mt-2 max-w-xl mx-auto">
            Discover the highest-rated cars in each category, handpicked for
            their performance, comfort, and reliability.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src="https://i.gaw.to/vehicles/photos/08/16/081657_2017_cadillac_CT6.jpg?640x400"
                alt="Luxury Sedan"
                className="w-full h-52 object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-medium">
                Luxury Sedan
              </div>
              <div className="absolute bottom-4 right-4 hover:bg-green-600 p-2 rounded-full">
                <span className="text-white">→</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d"
                alt="Sports Car"
                className="w-full h-52 object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-medium">
                Sports Car
              </div>
              <div className="absolute bottom-4 right-4 bg-green-600 p-2 rounded-full">
                <span className="text-white">→</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src="https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/867cf63d-846e-40a4-ba68-0d8dc2737899/Best_SUV.jpg"
                alt="Best SUV"
                className="w-full h-52 object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white text-xl font-medium">
                Best SUV
              </div>
              <div className="absolute bottom-4 right-4 bg-green-600 p-2 rounded-full">
                <span className="text-white">→</span>
              </div>
            </div>

            <div className="bg-green-600 rounded-2xl flex flex-col items-center justify-center text-white text-xl font-medium hover:bg-green-700 transition-all">
              <span>Browse all</span>
              <span>top rated cars</span>
              <div className="mt-4 bg-white text-green-600 p-2 rounded-full">
                <span>↓</span>
              </div>
            </div>
          </div>
        </section>
        {/* Footer */}
        <Footer />
        <ToastContainer />
      </div>
    </>
  );
}
