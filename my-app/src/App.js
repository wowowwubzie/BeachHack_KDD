import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ContactPage from "./components/ContactPage";
import AboutUs from "./components/AboutUs";
import HowToPage from "./components/HowToPage";
import ScannerComponent from "./components/ScannerComponents";

const App = () => {
  return (
    <Router>
      <div>
        <nav style={{
          padding: "15px 30px",
          backgroundColor: "#f8f9fa",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          fontFamily: "Arial, sans-serif"
        }}>
          <Link to="/home" style={{ 
            marginRight: "20px", 
            textDecoration: "none", 
            color: "#4a4a4a", 
            fontWeight: "bold" 
          }}>
            Home
          </Link>
          <Link to="/howto" style={{
            marginRight: "20px",
            textDecoration: "none",
            color: "#4a4a4a",
            fontWeight: "bold"
          }}>
            How To
          </Link>

          <Link to="/scan" style={{ 
            marginRight: "20px", 
            textDecoration: "none", 
            color: "#4a4a4a", 
            fontWeight: "bold" 
          }}>
            Scan
          </Link>
          <Link to="/contact" style={{ 
            marginRight: "20px", 
            textDecoration: "none", 
            color: "#4a4a4a", 
            fontWeight: "bold" 
            
          }}>
            Contact
          </Link>
          <Link
            to="/about"
            style={{
              marginRight: "20px", 
              textDecoration: "none",
              color: "#4a4a4a",
              fontWeight: "bold",
            }}
          >
            About Us
          </Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/" element={<Navigate to="/scan" />} />
          <Route path="/scan" element={<ScannerComponent />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/home" element={<LandingPage />} /> 
          <Route path="/howto" element={<HowToPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
