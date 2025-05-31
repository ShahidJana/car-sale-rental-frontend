import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";

const ReviewRatingSection = ({ carId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState();

  // Decode user from token
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
      .get(`http://localhost:8080/api/reviewratings/car/${carId}`)
      .then((res) => {
        setReviews(res.data.reviews);
      })
      .catch((err) => {
        console.error("Error fetching car reviews:", err);
      });
  }, [carId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      return handleError("Review and Rating are Required");
    }
    // if ((carId, userId)) {
    //   return handleError("You have already reviewed this car");
    // }
    const newReview = {
      carId,
      userId,
      rating,
      comment,
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/reviewratings/",
        newReview
      );
      setReviews([res.data, ...reviews]);
      setRating(0);
      setHoverRating(0);
      setComment("");
      handleSuccess(res.data.message);
    } catch (error) {
      handleError(res.error.message);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Reviews & Ratings</h3>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-2xl cursor-pointer ${
                (hoverRating || rating) >= star
                  ? "text-yellow-400"
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
          className="w-full border px-3 py-2 rounded-md text-sm"
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

      <div className="space-y-4">
        {reviews?.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet.</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-yellow-500 text-sm">
                  {"★".repeat(review?.rating)}
                  {"☆".repeat(5 - review?.rating)}
                </span>
                <span className="text-xs text-gray-500">
                  {review?.createdAt
                    ? new Date(review.createdAt).toLocaleDateString()
                    : " "}
                </span>
              </div>
              <p className="text-sm text-gray-700">{review?.comment}</p>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReviewRatingSection;
