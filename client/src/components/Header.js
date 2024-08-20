import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/authSlice";
import "./Header.css"; // Import the new CSS file for header styles

const Header = () => {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Logo</Link> {/* Replace 'Logo' with actual logo */}
      </div>
      <nav className="nav-links">
        {isAuthenticated && (
          <>
            {role === "admin" && (
              <Link to="/admin-dashboard" className="nav-button">
                Admin Dashboard
              </Link>
            )}
            {role === "user" && (
              <Link to="/inventory" className="nav-button">
                Book a Car
              </Link>
            )}
          </>
        )}
        {!isAuthenticated && (
          <Link to="/login" className="nav-button">
            Login
          </Link>
        )}
        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
