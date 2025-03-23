const express = require('express');
const cors = require('cors');
const getNutritionInfo = require("./routes/nutrition");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let lastScannedData = null;

// Handle POST from camera_test.py
app.post("/nutrition", async (req, res) => {
  const { barcode } = req.body;
  console.log("Received barcode from camera_test.py:", barcode);

  try {
    const productData = await getNutritionInfo(barcode);

    console.log("Nutrition info:", productData);

    lastScannedData = {
      barcode,
      food_name: productData.food_name,
      carbs: productData.carbs,
      gi: productData.gi,
      prediction: productData.prediction
    };

    res.status(200).json({ message: "Nutrition data received" });
  } catch (error) {
    console.error("Error fetching nutrition:", error.message);
    res.status(500).json({ error: "Failed to fetch nutrition info" });
  }
});

// React frontend polls this for latest scan
app.get("/last-scan", (req, res) => {
  if (lastScannedData) {
    res.json(lastScannedData);
  } else {
    res.status(404).json({ message: "No scan data yet" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import routes
// const nutritionRoute = require('./routes/nutrition');
// const { getNutritionInfo } = require("./routes/nutrition");
// app.use('/nutrition', nutritionRoute);

// // Start server
// //const PORT = 5000;
// let lastScannedData = null;

// app.post("/nutrition", async (req, res) => {
//   const { barcode } = req.body;
//   console.log("Received barcode from camera_test.py:", barcode);

//   try {
//     // Call nutrition.js to get product data
//     const productData = await getNutritionInfo(barcode); // adjust this if needed

//     // Log the full data
//     console.log("Nutrition info:", productData);

//     // Store it globally
//     lastScannedData = {
//       barcode,
//       food_name: productData.food_name,
//       carbs: productData.carbs,
//       gi: productData.gi
//     };

//     res.status(200).json({ message: "Nutrition data received" });
//   } catch (error) {
//     console.error("Error fetching nutrition:", error);
//     res.status(500).json({ error: "Failed to fetch nutrition info" });
//   }
// });

// // React can call this to get the latest scan
// app.get("/last-scan", (req, res) => {
//   if (lastScannedData) {
//     res.json(lastScannedData);
//   } else {
//     res.status(404).json({ message: "No scan data yet" });
//   }
// });

// const PORT = process.env.PORT || 5001; // Change 5000 to 5001 if needed
// // app.post("/nutrition", (req, res) => {
// //     const barcode = req.body.barcode;
// //     console.log("Received barcode from camera_test.py:", barcode); // Add this
  
// //   });
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Import routes
// const nutritionRoute = require('./routes/nutrition');
// app.use('/nutrition', nutritionRoute);

// // Start server
// //const PORT = 5000;
// const PORT = process.env.PORT || 5001; // Change 5000 to 5001 if needed
// app.post("/nutrition", (req, res) => {
//     const barcode = req.body.barcode;
//     console.log("Received barcode from camera_test.py:", barcode); // Add this
  
//   });
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
