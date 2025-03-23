import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(to right, #dbeafe, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif"
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "#1e3a8a" }}>
        Welcome to NutriScan
      </h1>

      <p style={{ fontSize: "1.25rem", maxWidth: "600px", textAlign: "center", color: "#374151" }}>
        Instantly scan barcodes to get nutrition details powered by real-time APIs.
        Built to help people with diabetes make food decisions safely.
      </p>

      <Link to="/scan">
        <button
          style={{
            marginTop: "2rem",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
          }}
        >
          Start Scanning
        </button>
      </Link>

      {/* Optional: Add some icons, images, or features here */}
      <div style={{ marginTop: "4rem", color: "#6b7280" }}>
        <p>Built with 💙 by our BeachHacks Team</p>
      </div>
    </div>
  );
};

export default LandingPage;
