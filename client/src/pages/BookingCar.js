import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookingCar() {
  const { id }= useParams();
  const [ status, setStatus ] = useState(null);
  const [ car, setCar ] = useState(null);

  useEffect(()=>{
    const fetchStatus = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL+ "/status/"+id);
        setStatus(response.data.booked);
      } catch (error) {
        console.error(error);
      }
      try{
        const res = await axios.get(process.env.REACT_APP_API_BASE_URL+ "/api/cars/"+id);
        setCar(res.data);
      }catch(err){
        console.error(err);
      }
    };
    fetchStatus();
  },[])
  console.log(car);
  const [ startDate, setStartDate ] = useState();
  const [ endDate, setEndDate ] = useState(); 


  async function handleBook(){
    const email= JSON.parse(window.localStorage.getItem("user")).email;
    const res = await axios.post(process.env.REACT_APP_API_BASE_URL + "/api/bookings/bookings",{
      userEmail:email,
      carId:car._id,
      startTime: startDate,
      endTime: startDate
    })
    const data = res.data;
    if(data && !data.message){
      alert("booked");
      return;
    }
    alert("Error: ",data.message);    
  }
  return (
    <div style={{ padding: "20px" }}>
      { car && 
        <div>
          <h1>{car.make} {car.model}<p>{status? <span style={"background: red"}>out of garage</span>:<span>in the graage</span>}</p></h1>
          <img src={car.imageUrl} width={200}/>
          <p>Year: {car.year}</p>
          <p>Travelled Distance: {car.trvaelledDistance}</p>
          <p>Rent: {car.rent}</p>
          <p>Registration number: {car.registrationNumber}</p>
          <p>Rating: {car.rating}</p>
          <p>Model: {car.model}</p>
          <p>Make by: {car.make}</p>
          <div>
            <label for="date">Select a start date:</label>
            <input type="date" id="date" name="date" onChange={(e)=>{setStartDate(new Date(e.target.value))}}/>
            <label for="date">Select a end date:</label>
            <input type="date" id="date" name="date" onChange={(e)=>{setEndDate(new Date(e.target.value))}}/>

            <button onClick={handleBook}>Book : {car.rent}/-</button>
          </div>
        </div>
      }
    </div>
  );
}

export default BookingCar;
