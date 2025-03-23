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
  
  const handleStartScan = async () => {
    setScanning(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/scan");
      const data = await res.json();
      console.log("Scan result:", data);

      const barcode = data.barcode;
      if (barcode) {
        const response = await fetch("http://localhost:5001/nutrition", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ barcode }),
        });

        const foodData = await response.json();
        console.log("Food info from backend:", foodData);
      }
    } catch (err) {
      console.error("Scan failed:", err);
    }
    setScanning(false);
  };

  return (
    <div>
      <h2>Live Barcode Scanner</h2>
      <img
        src="http://127.0.0.1:5000/video_feed"
        alt="Live camera stream"
        style={{ width: '80%', borderRadius: '10px', border: '1px solid lightgray' }}
      />
      <br />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
            onClick={handleStartScan}
            style={{
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
            {scanning ? "Scanning..." : "Scan Barcode"}
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
              <h4>NOTE: Only accounts for 1 serving size</h4>
              <p><strong>Barcode:</strong> {foodData.barcode}</p>
              <p><strong>Food Name:</strong> {foodData.food_name}</p>
              <p><strong>Carbohydrates:</strong> {foodData.carbs}</p>
              <p><strong>Safe Glycemic Index Range:</strong> 5 - 9</p>
              <p><strong>Prediction: </strong> {foodData.prediction}</p>
            </div>
        )}

    </div>

    </div>
  );
};

export default ScannerComponent;


// // import React, { useState } from 'react';

// // const ScannerComponent = () => {
// //   const [scannedCode, setScannedCode] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const handleScan = async () => {
// //     setLoading(true);
// //     try {
// //       // 1. Get barcode from Flask
// //       const res = await fetch("http://127.0.0.1:5000/scan");
// //       const data = await res.json();
// //       console.log("Scan result:", data);
  
// //       const barcode = data.barcode;
// //       setScannedCode(barcode);
  
// //       if (barcode) {
// //         // 2. Send barcode to Node backend
// //         const response = await fetch("http://localhost:5001/nutrition", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ barcode }),
// //         });
  
// //         const foodData = await response.json();
// //         console.log("Food info:", foodData);
  
// //         // optionally: display food info in UI later
// //       }
// //     } catch (err) {
// //       console.error("Scan or fetch failed:", err);
// //     }
// //     setLoading(false);
// //   };
  

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.title}>📷 Live Barcode Scanner</h2>

// //       <div style={styles.videoWrapper}>
// //         <img
// //           src="http://127.0.0.1:5000/video_feed"
// //           alt="Live camera stream"
// //           style={styles.video}
// //         />
// //       </div>

// //       <button onClick={handleScan} style={styles.button}>
// //         {loading ? 'Scanning...' : 'Scan Barcode'}
// //       </button>

// //       {scannedCode && (
// //         <p style={styles.result}>
// //           <strong>Scanned:</strong> {scannedCode}
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: { textAlign: 'center', padding: '2rem' },
// //   title: { fontSize: '1.5rem', marginBottom: '1rem' },
// //   videoWrapper: {
// //     display: 'inline-block',
// //     border: '3px solid #ddd',
// //     borderRadius: '12px',
// //     overflow: 'hidden',
// //     marginBottom: '1rem',
// //   },
// //   video: { width: '100%', maxWidth: '640px' },
// //   button: {
// //     padding: '10px 20px',
// //     fontSize: '1rem',
// //     backgroundColor: '#007bff',
// //     color: '#fff',
// //     border: 'none',
// //     borderRadius: '6px',
// //     cursor: 'pointer',
// //     marginTop: '1rem',
// //   },
// //   result: {
// //     marginTop: '1rem',
// //     fontSize: '1.1rem',
// //     color: '#333',
// //   },
// // };

// // export default ScannerComponent;
// import React, { useState } from 'react';

// const ScannerComponent = () => {
//   const [scanning, setScanning] = useState(false);

//   const handleStartScan = () => {
//     setScanning(true);
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       padding: '2rem',
//     },
//     video: {
//       borderRadius: '12px',
//       border: '4px solid #ddd',
//       width: '640px',
//       height: 'auto',
//       marginBottom: '1rem',
//     },
//     button: {
//       padding: '0.75rem 1.5rem',
//       fontSize: '1.2rem',
//       backgroundColor: '#307CFF',
//       color: '#fff',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//     },
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>📷 Live Barcode Scanner</h1>

//       {/* Only render the camera feed if scanning is true */}
//       {scanning && (
//         <img
//           src="http://localhost:5000/video_feed"
//           alt="Live camera stream"
//           style={styles.video}
//         />
//       )}

//       {/* Scan button */}
//       <button onClick={handleStartScan} style={styles.button}>
//         {scanning ? 'Scanning...' : 'Scan Barcode'}
//       </button>
//     </div>
//   );
// };

// export default ScannerComponent;