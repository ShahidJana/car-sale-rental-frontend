// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const TestimonialsSection = () => {
//   const [testimonials, setTestimonials] = useState([]);
//   const [current, setCurrent] = useState(0);

//   // Fetch testimonials
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/reviewratings") // Change to /car/:carId if needed
//       .then((res) => setTestimonials(res.data.reviews || []))
//       .catch((err) => console.error("Error fetching testimonials", err));
//   }, []);

//   const prevTestimonial = () => {
//     setCurrent((prev) =>
//       prev === 0 ? testimonials.length - 1 : prev - 1
//     );
//   };

//   const nextTestimonial = () => {
//     setCurrent((prev) =>
//       (prev + 1) % testimonials.length
//     );
//   };

//   if (testimonials.length === 0) return null;

//   const currentReview = testimonials[current];
//   const prevReview =
//     testimonials[(current - 1 + testimonials.length) % testimonials.length];
//   const nextReview =
//     testimonials[(current + 1) % testimonials.length];

//   return (
//     <div className="max-w-7xl m-auto bg-gray-200 rounded-3xl shadow-md my-2 ml-3 mr-3 py-12 px-12 md:px-16 lg:px-24">
//       <h2 className="text-center text-4xl text-gray-800">
//         What our customers are <br />
//         <span className="text-yellow-500">saying</span> about us
//       </h2>

//       <div className="flex items-center justify-between mt-10 relative">
//         <button
//           onClick={prevTestimonial}
//           className="absolute left-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
//         >
//           <FaChevronLeft size={20} />
//         </button>

//         <div className="flex items-center gap-6 mx-auto">
//           {/* Previous User (Left) */}
//           <div className="hidden md:block text-center">
//             <img
//               src="/default-user.png"
//               alt="Previous User"
//               className="rounded-2xl w-40 h-40 object-cover"
//             />
//             <p className="text-black text-sm italic mt-2 ml-2">
//               {prevReview?.userId?.name || "Previous"}
//             </p>
//           </div>

//           {/* Current Testimonial */}
//           <div className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-gray-50 max-w-md">
//             <img
//               src="/default-user.png"
//               alt={currentReview?.userId?.name || "User"}
//               className="w-24 h-24 rounded-full object-cover mb-4"
//             />
//             <p className="text-gray-700 text-center">
//               {currentReview?.comment}
//             </p>
//             <p className="mt-4 font-semibold italic text-gray-900">
//               {currentReview?.userId?.name || "Anonymous"}
//             </p>
//             <div className="flex mt-2">
//               {Array.from({ length: currentReview?.rating || 0 }, (_, i) => (
//                 <span key={i} className="text-yellow-400 text-xl">★</span>
//               ))}
//             </div>
//           </div>

//           {/* Next User (Right) */}
//           <div className="hidden md:block text-center">
//             <img
//               src="/default-user.png"
//               alt="Next User"
//               className="rounded-2xl w-40 h-40 object-cover"
//             />
//             <p className="text-black text-sm italic mt-2 ml-2">
//               {nextReview?.userId?.name || "Next"}
//             </p>
//           </div>
//         </div>

//         <button
//           onClick={nextTestimonial}
//           className="absolute right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
//         >
//           <FaChevronRight size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TestimonialsSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsSection = ({ carId }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = carId
          ? `http://localhost:8080/api/reviewratings/car/${carId}`
          : "http://localhost:8080/api/reviewratings";
        const res = await axios.get(url);
        setTestimonials(res.data.reviews || []);
      } catch (err) {
        console.error("Error fetching testimonials", err);
      }
    };

    fetchReviews();
  }, [carId]);

  const prevTestimonial = () =>
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const nextTestimonial = () =>
    setCurrent((prev) =>
      (prev + 1) % testimonials.length
    );

  if (testimonials.length === 0) return null;

  const currentReview = testimonials[current];
  const prevReview =
    testimonials[(current - 1 + testimonials.length) % testimonials.length];
  const nextReview =
    testimonials[(current + 1) % testimonials.length];

  return (
    <div className="max-w-7xl m-auto bg-gray-200 rounded-3xl shadow-md my-2 ml-3 mr-3 py-12 px-12 md:px-16 lg:px-24">
      <h2 className="text-center text-4xl text-gray-800">
        What our customers are <br />
        <span className="text-yellow-500">saying</span> about us
      </h2>

      <div className="flex items-center justify-between mt-10 relative">
        <button
          onClick={prevTestimonial}
          className="absolute left-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
        >
          <FaChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-6 mx-auto">
          {/* Previous User */}
          <div className="hidden md:block text-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Previous User"
              className="rounded-2xl w-40 h-40 object-cover"
            />
            <p className="text-black text-sm italic mt-2 ml-2">
              {/* {prevReview?.userId?.name || "Previous"} */}
            </p>
          </div>

          {/* Current Testimonial */}
          <div className="flex flex-col items-center p-6 rounded-2xl shadow-lg bg-gray-50 max-w-md">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt={currentReview?.userId?.name || "User"}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <p className="text-gray-700 text-center">
              {currentReview?.comment}
            </p>
            <p className="mt-4 font-semibold italic text-gray-900">
              {currentReview?.userId?.name || "Anonymous"}
            </p>
            <div className="flex mt-2">
              {Array.from({ length: currentReview?.rating || 0 }, (_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
            </div>
          </div>

          {/* Next User */}
          <div className="hidden md:block text-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Next User"
              className="rounded-2xl w-40 h-40 object-cover"
            />
            <p className="text-black text-sm italic mt-2 ml-2">
              {/* {nextReview?.userId?.name || "Next"} */}
            </p>
          </div>
        </div>

        <button
          onClick={nextTestimonial}
          className="absolute right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsSection;
