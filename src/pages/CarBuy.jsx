import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../components/common/CarCard";
import Pagination from "../components/common/Pagination";
import { fetchCars } from "../services/CarService";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

export default function CarBuy() {
  const [saleCars, setSaleCars] = useState([]);
  const [adCars, setAdCars] = useState([]);
  const [offerCars, setOfferCars] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();
  const resultRef = useRef(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchAllCars = async () => {
      const sale = await fetchCars({ listingType: "sale" });
      const ads = await fetchCars({ listingType: "ads" });
      const offer = await fetchCars({ listingType: "offer" });

      if (sale.data) setSaleCars(sale.data);
      else handleError(sale.error.message);

      if (ads.data) setAdCars(ads.data);
      else handleError(ads.error.message);

      if (offer.data) setOfferCars(offer.data);
      else handleError(offer.error.message);
    };

    fetchAllCars();
  }, []);

  // Clear search results when input is empty
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredCars([]);
    }
  }, [search]);

  // Handle search action
  const handleSearch = () => {
    const query = search.trim().toLowerCase();
    setHasSearched(true);

    if (!query) return;
    const results = saleCars.filter(
      (car) =>
        car.make.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.condition.toLowerCase().includes(query) ||
        car.listingType.toLowerCase().includes(query)
    );

    setFilteredCars(results);

    // Scroll to results
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <div className="text-white bg-white min-h-screen font-urbanist">
        {/* Hero Section */}
        <section
          className="relative text-center py-24 px-4 md:px-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
          <div className="relative z-10 py-20">
            <h1 className="text-4xl md:text-5xl mb-20">
              Car <span className="text-yellow-400 font-semibold">buying</span>
              <br />
              shaped to your life
            </h1>
            <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden mb-4 max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search by make, model or condition"
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
          </div>
        </section>

        {/* Popular Cars Section with Search Results Section */}

        <section className="py-12 px-6 bg-gray-100" ref={resultRef}>
          <div className="max-w-7xl mx-auto text-center">
            {/* Case 1: Show Filtered Search Results */}
            {filteredCars.length > 0 ? (
              <>
                <h2 className="text-3xl text-black mb-6">Search Results</h2>
                <Pagination
                  data={filteredCars}
                  itemsPerPage={3}
                  renderItem={(car) => <CarCard key={car._id} car={car} />}
                  itemsWrapperClass="grid grid-cols-1 md:grid-cols-3 gap-6"
                />
              </>
            ) : hasSearched && search.trim() !== "" ? (
              // Case 2: No Match Found
              <p className="text-gray-500 text-lg">
                No cars match your search.
              </p>
            ) : (
              // Case 3: Show Popular Cars by Default
              <>
                <h2 className="text-4xl text-black mb-10">
                  Our <span className="text-yellow-500">Popular</span> Cars
                </h2>
                <p className="mb-12 text-gray-500 max-w-xl mx-auto">
                  Check out some of the most popular cars our customers love,
                  known for their performance, style, and reliability.
                </p>
                <Pagination
                  data={saleCars}
                  itemsPerPage={3}
                  renderItem={(car) => <CarCard key={car._id} car={car} />}
                  itemsWrapperClass="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10"
                />
              </>
            )}
          </div>
        </section>

        {/* Car Sale Ads Section */}
        <section className="px-6 py-12 bg-black m-2 rounded-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-4xl">
              Car Sale <span className="text-yellow-400">Ads</span>
            </h2>
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
                imageSrc={car.images[0].url}
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
                imageSrc={car.images[0].url}
                imageAlt={car.make}
                title={`${car.make} ${car.model}`}
                description={car.description}
                buttonText="View Car Offer"
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

        {/* Top-rated Section */}
        {/* <section className="bg-white text-black px-6 py-12">
          <h2 className="text-4xl text-center">
            <span className="text-yellow-500">Top-rated</span> cars by type
          </h2>
          <p className="text-center text-gray-600 mt-2 max-w-xl mx-auto">
            Discover the highest-rated cars in each category, handpicked for
            their performance, comfort, and reliability.
          </p>
          <div className="grid md:grid-cols-4 gap-6 mt-10">
            {[
              {
                label: "Luxury Sedan",
                url: "https://i.gaw.to/vehicles/photos/08/16/081657_2017_cadillac_CT6.jpg?640x400",
              },
              {
                label: "Sports Car",
                url: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
              },
              {
                label: "Best SUV",
                url: "https://assets-eu-01.kc-usercontent.com/3b3d460e-c5ae-0195-6b86-3ac7fb9d52db/867cf63d-846e-40a4-ba68-0d8dc2737899/Best_SUV.jpg",
              },
            ].map(({ label, url }) => (
              <div
                key={label}
                className="rounded-2xl overflow-hidden shadow-lg relative"
              >
                <img
                  src={url}
                  alt={label}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white text-xl font-medium">
                  {label}
                </div>
                <div className="absolute bottom-4 right-4 bg-green-600 p-2 rounded-full">
                  <span className="text-white">→</span>
                </div>
              </div>
            ))}
            <div className="bg-green-600 rounded-2xl flex flex-col items-center justify-center text-white text-xl font-medium hover:bg-green-700 transition-all">
              <span>Browse all</span>
              <span>top rated cars</span>
              <div className="mt-4 bg-white text-green-600 p-2 rounded-full">
                <span>↓</span>
              </div>
            </div>
          </div>
        </section> */}

        <ToastContainer />
      </div>
    </>
  );
}

const OfferCard = ({
  imageSrc,
  imageAlt,
  title,
  subtitle,
  description,
  buttonText,
  onButtonClick,
}) => (
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
