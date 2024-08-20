import React, { useEffect, useState } from "react";
import "../assets/styles/global.css";
import CarCard from "../components/CarCard";
import CarForm from "../components/CarForm";
import "./adminDashboard.css";
import {
  addCar,
  deleteCar,
  fetchCars,
  updateCar,
} from "../services/carService";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    if(user && user.role == "admin"){
      fetchCarsData();
    }
    else{ 
      navigate("/login");
    }
  }, []);

  const fetchCarsData = async () => {
    try {
      const data = await fetchCars();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddOrUpdateCar = async (car) => {
    try {
      console.log("Car object before saving:", car);

      if (selectedCar) {
        await updateCar(car._id, car);
        setCars(cars.map((c) => (c._id === car._id ? car : c)));
        setSelectedCar(null);
        console.log("inside if");
      } else {
        const newCar = await addCar(car);
        setCars([...cars, newCar]);
        console.log("inside else");
      }
    } catch (error) {
      console.error("Error saving car:", error); // #ERROR
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      await deleteCar(id);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleEditCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <CarForm onSubmit={handleAddOrUpdateCar} car={selectedCar} />
      <div>
        {cars.length > 0 ? (
          cars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
              onEdit={handleEditCar}
              onDelete={() => handleDeleteCar(car._id)}
              isAdmin={true} // Assuming admin view; adjust based on actual user role
            />
          ))
        ) : (
          <p>No cars in inventory.</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
