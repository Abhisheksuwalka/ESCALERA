import axios from "axios";

// Define API URL
// const API_URL =
//   (process.env.REACT_APP_API_BASE_URL || "http://localhost:5001") + "/api/cars";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
    // Add any other default headers here
  },
});

// Fetch all cars
export const fetchCars = async ( startTime, endTime ) => {
  try {
    const response = await axios.get(process.env.REACT_APP_API_BASE_URL+ "/api/cars/",{},{
      startTime,
      endTime,
    }); // Use Axios instance
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add a new car
export const addCar = async (car) => {
  try {
    console.log(car);
    const response = await api.post("/api/cars", car); // Use Axios instance
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing car
export const updateCar = async (id, car) => {
  try {
    const response = await api.put(`/api/cars/${id}`, car); // Use Axios instance
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a car
export const deleteCar = async (id) => {
  try {
    await api.delete(`/api/cars/${id}`); // Use Axios instance
  } catch (error) {
    throw error;
  }
};

export default api;
