import React, { useState,useEffect } from "react";

const ImageSlider = ({ images = [], altText = "Image" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [length]);

  if (images.length === 0) {
    return (
      <img
        src="https://via.placeholder.com/600x400?text=No+Image"
        alt="No Image"
        className="w-full h-64 md:h-[400px] object-cover rounded-md"
      />
    );
  }

  return (
    <div className="relative w-full h-64 md:h-[400px] overflow-hidden rounded-md shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`${altText} ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
      />

      {/* Prev Button */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          aria-label="Previous Image"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-md transition-colors"
        >
          &#8592;
        </button>
      )}

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          aria-label="Next Image"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-md transition-colors"
        >
          &#8594;
        </button>
      )}

      {/* Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentIndex ? "bg-green-600" : "bg-gray-300 hover:bg-green-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
