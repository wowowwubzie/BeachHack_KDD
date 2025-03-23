import React, { useState, useEffect } from "react";
import axios from "axios";


const ScannerComponent = () => {
  const [scanning, setScanning] = useState(false);
  const [foodData, setFoodData] = useState(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:5001/last-scan");
        setFoodData(res.data);
      } catch (err) {
        // No scan yet
      }
    }, 2000); // Poll every 2 seconds
  
    return () => clearInterval(interval);
  }, []);
  console.log("foodData (frontend):", foodData);

  const handleStartScan = () => {
    window.location.reload();
  };
  
      
  // const handleStartScan = async () => {
  //   setScanning(true);
  //   try {
  //     const res = await fetch("http://127.0.0.1:5000/scan");
  //     const data = await res.json();
  //     console.log("Scan result:", data);

  //     const barcode = data.barcode;
  //     if (barcode) {
  //       const response = await fetch("http://localhost:5001/nutrition", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ barcode }),
  //       });

  //       const foodData = await response.json();
  //       console.log("Food info from backend:", foodData);
  //     }
  //   } catch (err) {
  //     console.error("Scan failed:", err);
  //   }
  //   setScanning(false);
  // };

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
      <h2 style={{ fontSize: "3rem", color: "#1e3a8a", marginBottom: "1.5rem" }}>
        Live Barcode Scanner
      </h2>
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Live camera stream"
        style={{
          width: '80%',
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
        }}
      />
      <br />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
          onClick={() => window.location.reload()}
          style={{
            padding: "14px 28px",
            fontSize: "1rem",
            fontWeight: "bold",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
          }}
  onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
  onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
>
  Refresh Scanner
</button>

        {foodData && (
            <div style={{
              marginTop: "20px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "12px",
              maxWidth: "500px",
              marginInline: "auto",
              backgroundColor: "#f9f9f9"
            }}>
              <h3>Info</h3>
              <h4 style={{ color: "blue" }}>NOTE: Only accounts for 1 serving size</h4>
              <p><strong>Barcode:</strong> {foodData.barcode}</p>
              <p><strong>Food Name:</strong> {foodData.food_name}</p>
              <p><strong>Carbohydrates:</strong> {foodData.carbs}</p>
              <p><strong>Safe Glycemic Index Range:</strong> 5 mmol/L - 9 mmol/L,</p>
              <p>
                <strong>Prediction: </strong>
                {foodData.prediction && (
                  <>
                    <strong style={{ color: "blue"  }}>
                      {foodData.prediction.split("\n")[0]}
                    </strong>
                    <br />
                    {foodData.prediction.split("\n")[1]}<br />
                    {foodData.prediction.split("\n")[2]}
                  </>
                )}
              </p>





            </div>
        )}

    </div>

    </div>
  );
};

export default ScannerComponent;
