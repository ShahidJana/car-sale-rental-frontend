import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FiUsers, FiLayers } from "react-icons/fi";
import {
  GiCarDoor,
  GiGasPump,
  GiGearStick,
  GiSpeedometer,
} from "react-icons/gi";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ImageSlider from "../components/common/ImageSilder";
import ReviewRatingSection from "../components/common/ReviewRating";
import { handleSuccess } from "../utils";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [relatedCars, setRelatedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "sale";

  // Decide sublink based on type query param

  const sublink = type === "sale" ? "car-sale" : "car-rent";

  // Fetch car details when 'id' changes
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/cars/${id}`)
      .then((response) => {
        setCar(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car:", error);
        setCar(null);
        setLoading(false);
      });
  }, [id]);

  // Fetch related cars when 'type' or 'id' changes
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/cars/`)
      .then((response) => {
        const filtered = response.data.filter(
          (c) => c.listingType === type && c._id !== id
        );
        setRelatedCars(filtered);
      })
      .catch((error) => {
        console.error("Error fetching related cars:", error);
        setRelatedCars([]);
      });
  }, [type, id]);

  console.log("related cars", relatedCars);

  //  function showDiscount(){
  //   handleSuccess('congratulations ')
  // }
  // showDiscount()

  if (loading)
    return <p className="text-center py-10 font-semibold">Loading...</p>;

  if (!car)
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Car not found.
      </p>
    );

  return (
    <div className="bg-white text-gray-800 min-h-screen font-urbanist">
      <Header />
      <div className="max-w-6xl mx-auto my-8 p-4 md:p-8 bg-white rounded-xl shadow-lg">
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Image */}
          <div className="md:w-3/5 h-64 md:h-auto overflow-hidden rounded-lg">
            <ImageSlider
              images={
                car?.images?.length > 0
                  ? car.images.map((img) => `${img.url}`)
                  : []
              }
              altText={`${car.make} ${car.model}`}
            />
          </div>

          {/* Info */}
          <div className="md:w-2/5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold">
                  {car.make} {car.model} ({car.year})
                </h2>
                <span className="text-green-600 text-xl font-semibold whitespace-nowrap">
                  ₹{car.price?.toLocaleString() || "N/A"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <InfoItem
                  icon={<GiGearStick />}
                  text={car.transmission || "N/A"}
                />
                <InfoItem icon={<GiGasPump />} text={car.fuelType || "N/A"} />
                <InfoItem
                  icon={<FiLayers />}
                  text={car.mileage ? `${car.mileage} kmpl` : "N/A"}
                />
                <InfoItem
                  icon={<GiSpeedometer />}
                  text={car.engine ? `${car.engine} cc` : "N/A"}
                />
                <InfoItem
                  icon={<FiUsers />}
                  text={`${car.seatingCapacity || 5} Seats`}
                />
                <InfoItem
                  icon={<GiCarDoor />}
                  text={`${car.doors || 4} Doors`}
                />
                <InfoItem
                  icon={
                    <div
                      className="w-4 h-4 rounded-full border mr-2"
                      style={{
                        backgroundColor: car.color?.toLowerCase() || "#000",
                      }}
                    />
                  }
                  text={car.color || "N/A"}
                />
              </div>

              {car.features?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-3">
                  {car.features.slice(0, 5).map((feature, i) => (
                    <span
                      key={i}
                      className="bg-green-50 text-green-700 px-3 py-1 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2">
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    car.status === "available"
                      ? "bg-green-100 text-green-700"
                      : car.status === "sold"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {car.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description & Button */}
        <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-sm text-gray-700">
              {car.description || "No description provided."}
            </p>
          </div>

          <button
            onClick={() =>
              navigate(`/detailcarform?type=${type}`, { state: { car } })
            }
            className="w-full md:w-40 h-12 bg-green-600 hover:bg-green-700 transition-all duration-200 text-white rounded-md font-medium"
          >
            {type === "sale" ? "Buy Now" : "Rent Now"}
          </button>
        </div>

        {/* Add Review Section Here */}
        <ReviewRatingSection carId={car._id} />

        {/* Related Cars Section */}
        {relatedCars.length > 0 && (
          <div className="mt-10 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Related Cars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.isArray(relatedCars) &&
                relatedCars.map((relatedCar) => (
                  <div
                    key={relatedCar._id}
                    className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/${sublink}/${relatedCar._id}/detailed?type=${type}`
                      )
                    }
                  >
                    <img
                      src={
                        relatedCar?.images?.[0]?.url || "https://res.cloudinary.com/dyl33uzua/image/upload/fallback.jpg" // Or Cloudinary fallback URL
                      }
                      alt={`${relatedCar.make} ${relatedCar.model}`}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://res.cloudinary.com/dyl33uzua/image/upload/fallback.jpg"; // Local fallback image
                      }}
                    />
                    <div className="p-3">
                      <h4 className="font-bold text-lg">
                        {relatedCar.make} {relatedCar.model}
                      </h4>
                      <p className="text-sm text-gray-600">
                        ₹{relatedCar.price?.toLocaleString()} -{" "}
                        {relatedCar.year}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const InfoItem = ({ icon, text }) => (
  <div className="flex items-center">
    <span className="text-green-600 mr-2">{icon}</span>
    {text}
  </div>
);

export default CarDetailPage;
