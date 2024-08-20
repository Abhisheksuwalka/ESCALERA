import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./assets/styles/global.css";
import Header from "./components/Header";
import AdminDashboard from "./pages/AdminDashboard";
import Inentory from "./pages/CarInventory";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BookingCar from "./pages/BookingCar";
import Logout from "./pages/logout";

function App() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the home page if the token is present and the user is on the login page
    if (token && window.location.pathname === "/login") {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="App">
      {token && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/inventory" element={<Inentory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/booking/:id" element={<BookingCar/>} />
      </Routes>
    </div>
  );
}

export default App;
