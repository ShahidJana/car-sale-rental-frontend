import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";
const API_URL = "http://localhost:8080/api";
const ReviewRatingSection = ({ carId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState();
  const [showAll, setShowAll] = useState(false);

  // Decode token and set user ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setUserId(decoded._id);
      }
    } catch (err) {
      setUserId(null);
    }
  }, []);

  useEffect(() => {
    if (!carId) return;
    axios
      .get(`${API_URL}/reviewratings/car/${carId}`)
      .then((res) => setReviews(res.data.reviews))
      .catch((err) => console.error("Error fetching car reviews:", err));
  }, [carId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment)
      return handleError("Review and Rating are Required");

    const newReview = { carId, userId, rating, comment };
    if (!userId) {
      return handleError("Login required to perform this action.");
    }

    try {
      const res = await axios.post(`${API_URL}/reviewratings/`, newReview);
      setReviews([res.data.review, ...reviews]);
      setRating(0);
      setHoverRating(0);
      setComment("");
      handleSuccess(res.data.message || "Review submitted!");
    } catch (error) {
      handleError(error?.response?.data?.message || "Submission failed");
    }
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Reviews & Ratings</h3>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer ${
                (hoverRating || rating) >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          className="w-full border px-3 py-2 rounded-md text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="Write your review here..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews Display */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  Reviews ({visibleReviews.length})
                </h3>
              </div>

              {/* Reviews container */}
              <div
                className={
                  showAll
                    ? "max-h-80 overflow-y-auto pr-2 space-y-4"
                    : "space-y-4"
                }
              >
                {visibleReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-xl p-4 bg-white shadow-sm ${
                      review.userId === userId
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-yellow-500 text-base">
                          {"★".repeat(review?.rating)}
                          {"☆".repeat(5 - review?.rating)}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed mt-1">
                          {review?.comment}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">
                          {review?.userId?.name || "Anonymous User"}
                        </p>
                        <span className="text-xs text-gray-500">
                          {review?.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* See More Button */}
            {reviews.length > 5 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="mt-2 text-green-600 text-sm font-semibold hover:underline"
              >
                See more reviews
              </button>
            )}
          </>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ReviewRatingSection;
