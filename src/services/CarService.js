
import axios from "axios";

export const fetchCars = async (filters = {}) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/cars");

    let filteredData = data;
    if (filters.listingType) {
      filteredData = data.filter(
        (car) => car.listingType === filters.listingType
      );
    }

    return { data: filteredData, error: null };
  } catch (error) {
    console.error("Car Fetch Error:", error);
    return { data: null, error };
  }
};
