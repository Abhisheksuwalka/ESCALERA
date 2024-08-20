// import React from "react";
// import { useSelector } from "react-redux"; // or useContext (if Context API)
// import { Link } from "react-router-dom";

// function Home() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Welcome to Escalera Rent-A-Car</h1>
//       <p>
//         Your one-stop destination for car rentals. Browse, book, and drive away!
//       </p>

//       {/* Navigation links to other pages */}
//       <div style={{ marginTop: "20px" }}>
//         {!isAuthenticated && (
//           <Link to="/login" style={{ margin: "10px", textDecoration: "none" }}>
//             <button>Login</button>
//           </Link>
//         )}
//         <Link
//           to="/inventory"
//           style={{ margin: "10px", textDecoration: "none" }}
//         >
//           <button>View Cars</button>
//         </Link>
//         <Link
//           to="/admin-dashboard"
//           style={{ margin: "10px", textDecoration: "none" }}
//         >
//           <button>Admin Dashboard</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-1.jpeg";
import { logout } from "../redux/slices/authSlice"; // Adjust the import path as needed
function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={heroImage}
            alt="Hero Placeholder"
          />
        </div>
        <div className="relative container mx-auto py-16 px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Rent a Car for the Best Prices
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your one-stop destination for car rentals. Browse, book, and drive
            away!
          </p>
          <Link
            to="/inventory"
            className="inline-block bg-green-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-green-700 transition"
          >
            Enquire Now
          </Link>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="service-1-placeholder-url"
              alt="Car Hire For Outstation"
              className="h-40 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Car Hire For Outstation
            </h3>
            <p className="text-gray-600">
              We have a large fleet of luxurious and economical cars available
              for outstation travel.
            </p>
            <Link
              to="/inventory"
              className="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Enquire Now
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="service-2-placeholder-url"
              alt="Car On Hire For Corporate"
              className="h-40 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">
              Car On Hire For Corporate
            </h3>
            <p className="text-gray-600">
              Easiest booking and best service assured for corporate clients.
            </p>
            <Link
              to="/inventory"
              className="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Enquire Now
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <img
              src="service-3-placeholder-url"
              alt="Car Hire For Wedding"
              className="h-40 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Car Hire For Wedding</h3>
            <p className="text-gray-600">
              Well-maintained and luxurious cars for your special day.
            </p>
            <Link
              to="/inventory"
              className="inline-block mt-4 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Enquire Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-100 py-8">
        <div className="container mx-auto text-center">
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="inline-block bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
