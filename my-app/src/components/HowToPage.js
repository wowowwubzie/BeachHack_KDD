import React from "react";

const HowToPage = () => {
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
        How to Use our Scanner
      </h1>

      <p style={{ fontSize: "1.2rem", color: "#374151", maxWidth: "700px", textAlign: "center" }}>
        Follow these steps to get accurate nutrition information from your food product:
      </p>

      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        padding: "2rem",
        marginTop: "2rem",
        width: "90%",
        maxWidth: "700px",
        lineHeight: "1.6",
        color: "#333"
      }}>
        <ol style={{ paddingLeft: "1.2rem" }}>
          <li>Click the <strong>Scan</strong> tab in the navigation bar or click the <strong>Scan</strong> button from the homepage.</li>
          <li>Depending on your device, the scanner will use either your phone’s rear camera or your laptop’s webcam.</li>
          <li>Make sure the barcode is clearly visible and centered on the camera screen.</li>
          <li>If the scan results in <strong>unknown</strong> information or no response, reload the page and try again.</li>
          <li>Ensure good lighting and hold the item steady — your environment affects image clarity and scan success.</li>
          <li>Once a successful scan is complete, the camera will close automatically and nutrition info will appear below the scanner.</li>
        </ol>
      </div>

      <p style={{ marginTop: "3rem", color: "#6b7280", fontSize: "0.95rem" }}>
        For questions or issues, please visit the Contact page.
      </p>
    </div>
  );
};

export default HowToPage;
