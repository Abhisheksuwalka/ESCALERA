import React, { useCallback, useEffect, useState } from "react";
import "../assets/styles/global.css";
import CarCard from "../components/CarCard";
import { deleteCar, fetchCars } from "../services/carService";
import Calendar from 'react-calendar';
import "./adminDashboard.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const CarInventory = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [filters, setFilters] = useState({
    fuelType: "",
    minRent: "",
    maxRent: "",
    make: "",
    model: "",
    year: "",
  });

  const navigate = useNavigate();
 
  const handleSearch = () => { 
    fetchCars()
    .then((data) => {
      console.log("Fetched cars:", data);
      setCars(data);
    })
    .catch((error) => {
      console.error("Error fetching car data:", error);
      if (error.response) {
        console.log("Server responded with a status:", error.response.status);
          console.log("Data:", error.response.data);
          console.log("Headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request made but no response received:", error.request);
        } else {
          console.log("Error setting up the request:", error.message);
        }
      });

  } 

  const [latitude, setLatitute] = useState(0);
  const [longitude, setLongitude] = useState(0);
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // You can use the latitude and longitude here
        setLatitute(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }

  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if(user){
      handleSearch();
      return;
    }
    navigate("/login");
  },[]);

    const applyFilters = useCallback(() => {
      let filtered = cars;
      
      if (filters.fuelType)
        filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
      if (filters.minRent)
        filtered = filtered.filter((car) => car.rent >= filters.minRent);
      if (filters.maxRent)
        filtered = filtered.filter((car) => car.rent <= filters.maxRent);
      if (filters.make)
        filtered = filtered.filter((car) =>
      car.make.toLowerCase().includes(filters.make.toLowerCase())
    );
    if (filters.model)
      filtered = filtered.filter((car) =>
    car.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    if (filters.year)
      filtered = filtered.filter((car) => car.year === parseInt(filters.year));
    
    // filetered = filtered.filter((car) => car.availability === true);
    console.log(cars);
    console.log("Filtered cars:", filtered);
    setFilteredCars(filtered);
  }, [cars, filters]);
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(()=>{
    //applying the check for the locaton .
    console.log("cars:",cars);
  },[cars]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
  
  const handleBookCar = (car) => {
    navigate("/booking/"+ car._id, { state: { car } });
  };
  
  // const handleAddCar = () => {
    //   alert("Add car functionality is not yet implemented.");
    // };
    
    // const handleDeleteCar = async (id) => {
      //   try {
        //     await deleteCar(id);
        //     setCars(cars.filter((car) => car._id !== id));
        //   } catch (error) {
          //     console.error("Error deleting car:", error);
          //   }
          // };
          
          return (
            <div style={{ padding: "20px" }}>
      <h1>Car Inventory</h1>

      <div className="filters">
        <input
          name="fuelType"
          placeholder="Fuel Type"
          value={filters.fuelType}
          onChange={handleFilterChange}
        />
        <input
          name="minRent"
          type="number"
          placeholder="Min Rent"
          value={filters.minRent}
          onChange={handleFilterChange}
        />
        <input
          name="maxRent"
          type="number"
          placeholder="Max Rent"
          value={filters.maxRent}
          onChange={handleFilterChange}
        />
        <input
          name="make"
          placeholder="Make"
          value={filters.make}
          onChange={handleFilterChange}
        />
        <input
          name="model"
          placeholder="Model"
          value={filters.model}
          onChange={handleFilterChange}
        />
        <input
          name="year"
          type="number"
          placeholder="Year"
          value={filters.year}
          onChange={handleFilterChange}
        />
      
      </div>

      <div className="car-tiles">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => (
            <div key={car._id} className="car-tile">
              <CarCard car={car} />
              <button onClick={() => handleBookCar(car)}>Book Now</button>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default CarInventory;
