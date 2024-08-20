import React, { useEffect, useState } from "react";

// CarForm for adding / updating car details
function CarForm({ onSubmit, car, onCancel }) {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    registrationNumber: "",
    fuelType: "",
    rent: "",
    imageUrl: "", // Add this line
  });

  const [errors, setErrors] = useState({});

  // Update form data when editing an existing car
  useEffect(() => {
    if (car) {
      setFormData(car);
    }
  }, [car]);

  // form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.year < 1886 || formData.year > new Date().getFullYear()) {
      newErrors.year = "Year must be between 1886 and the current year.";
    }
    if (isNaN(formData.rent) || formData.rent <= 0) {
      newErrors.rent = "Rent must be a positive number.";
    }
    return newErrors;
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        make: "",
        model: "",
        year: "",
        registrationNumber: "",
        fuelType: "",
        rent: "",
        imageUrl: "",
      });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="make"
        value={formData.make}
        onChange={handleChange}
        placeholder="Make"
        required
      />
      {errors.make && <span>{errors.make}</span>}
      <input
        name="model"
        value={formData.model}
        onChange={handleChange}
        placeholder="Model"
        required
      />
      {errors.model && <span>{errors.model}</span>}
      <input
        name="year"
        value={formData.year}
        onChange={handleChange}
        placeholder="Year"
        required
      />
      {errors.year && <span>{errors.year}</span>}
      <input
        name="registrationNumber"
        value={formData.registrationNumber}
        onChange={handleChange}
        placeholder="Registration Number"
        required
      />
      {errors.registrationNumber && <span>{errors.registrationNumber}</span>}
      <input
        name="fuelType"
        value={formData.fuelType}
        onChange={handleChange}
        placeholder="Fuel Type"
        required
      />
      {errors.fuelType && <span>{errors.fuelType}</span>}
      <input
        name="rent"
        value={formData.rent}
        onChange={handleChange}
        placeholder="Rent per day"
        required
      />
      {errors.rent && <span>{errors.rent}</span>}
      <input
        name="imageUrl" // Add this line
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL" // Add this line
        required
      />
      {errors.imageUrl && <span>{errors.imageUrl}</span>}
      <button type="submit">{car ? "Update Car" : "Add Car"}</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default CarForm;
