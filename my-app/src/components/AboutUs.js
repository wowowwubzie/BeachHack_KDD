import React from "react";

const AboutUsPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to right, #ffffff, #dbeafe)",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#1a237e", marginBottom: "1rem" }}>
        Meet the Team
      </h1>
      <p style={{ fontSize: "1.25rem", color: "#333", maxWidth: "700px", textAlign: "center", marginBottom: "2rem" }}>
        We are a team of passionate students from California State University, Long Beach who care about health,
        accessibility, and using technology to empower people. NutriScan was built at BeachHacks to help people
        with diabetes make safer food decisions.
      </p>
      <div style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}>
        <div style={cardStyle}>
          <h3 style={nameStyle}>Deanna</h3>
          <p style={roleStyle}>Backend  Devloper & UI/UX Designer</p>
        </div>
        <div style={cardStyle}>
          <h3 style={nameStyle}>Danniella</h3>
          <p style={roleStyle}>Backend Developer & API Integration</p>
        </div>
        <div style={cardStyle}>
          <h3 style={nameStyle}>Katie</h3>
          <p style={roleStyle}>Backend Devloper & Data Manager</p>
        </div>
      </div>
      <p style={{ marginTop: "4rem", fontSize: "0.95rem", color: "#555" }}>
      </p>
    </div>
  );
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "1.5rem",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  width: "200px",
};

const nameStyle = {
  marginBottom: "0.5rem",
  color: "#0d47a1",
};

const roleStyle = {
  fontSize: "0.9rem",
  color: "#555",
};

export default AboutUsPage;