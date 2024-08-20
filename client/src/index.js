import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter here
import App from "./App"; // Main App component
import "./index.css"; // Global styles
import store from "./redux/store"; // Redux store configuration
import reportWebVitals from "./reportWebVitals"; // Performance measurement

// Create the root for rendering the React app
const root = ReactDOM.createRoot(document.getElementById("root"));

// Wrap the app in the Redux Provider and BrowserRouter
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Measure performance (optional)
reportWebVitals();
