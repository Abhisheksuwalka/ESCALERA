import React from "react";

// display car details; registration number is shown only to admins
function CarCard({ car, onEdit, onDelete, isAdmin }) {
  return (
    <div className="car-card">
      <h3>
        {car.make} {car.model} ({car.year})
      </h3>
      {/* display reg.. number if isAdmin is true */}
      {isAdmin && <p>Registration: {car.registrationNumber}</p>}
      <p>Fuel Type: {car.fuelType}</p>
      <p>Rent: ${car.rent} per day</p>
      {/* Other Admin controls: Edit and Delete buttons */}
      {isAdmin && (
        <>
          <button onClick={() => onEdit(car)}>Edit</button>
          <button onClick={() => onDelete(car.registrationNumber)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default CarCard;
