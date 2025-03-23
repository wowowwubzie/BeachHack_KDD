import React from "react";

const ContactPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        background: "linear-gradient(to right, #ffffff, #dbeafe)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif"
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#1a237e", marginBottom: "1rem" }}>
        Contact Us
      </h1>

      <p style={{ fontSize: "1.2rem", color: "#374151", textAlign: "center", maxWidth: "600px" }}>
        Have any questions, suggestions, or feedback? We'd love to hear from you.
        Please feel free to reach out to us at any of the emails below.
      </p>

      <div style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "2rem",
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        width: "90%",
        maxWidth: "500px"
      }}>
        <p><strong>Deanna:</strong> deannasolis2003@gmail.com</p>
        <p><strong>Danniella:</strong> danniellamartinez491@gmail.com</p>
        <p><strong>Katie:</strong> katiemartinezz@icloud.com</p>
      </div>

      <p style={{ marginTop: "3rem", fontSize: "0.95rem", color: "#6b7280" }}>
      </p>
    </div>
  );
};

export default ContactPage;

