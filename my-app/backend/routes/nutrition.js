// backend/routes/nutrition.js
const axios = require('axios');
require('dotenv').config();  // Enables reading from .env
const path = require("path");

const FDC_API_KEY = process.env.FDC_API_KEY;
const OPENFOODFACTS_URL = "https://world.openfoodfacts.org/api/v0/product/";
const FDC_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

// import the predictor function
const { canConsume } = require("../utils/predictor");

async function getNutritionInfo(barcode) {
    if (!barcode) {
        throw new Error("Barcode is required");
    }

    try {
        let food_name = "Unknown";
        let carbs = 0;
        let gi = "N/A";

        // Try OpenFoodFacts first
        let response = await axios.get(`${OPENFOODFACTS_URL}${barcode}.json`);
        if (response.data.status === 1) {
            const product = response.data.product;
            food_name = product.product_name || "Unknown";
            carbs = product.nutriments.carbohydrates || 0;
            gi = product.glycemic_index || "N/A";

            console.log(`Found in OpenFoodFacts: ${food_name}`);
        } else {
            // Fallback to FDC API
            console.log(`Not found in OpenFoodFacts, trying FDC...`);
            response = await axios.get(FDC_API_URL, {
                params: {
                    api_key: FDC_API_KEY,
                    query: barcode
                }
            });

            if (response.data.foods && response.data.foods.length > 0) {
                const food = response.data.foods[0];
                const carbNutrient = food.foodNutrients?.find(n => n.nutrientName === "Carbohydrate, by difference");
                food_name = food.description;
                carbs = carbNutrient?.value || 0;

                console.log(`Found in FDC: ${food_name}`);
            } else {
                throw new Error("Food not found in any API");
            }
        }

        // Get time and simulate prediction *** updated this to be simpler
        const currentTime = new Date().toTimeString().split(' ')[0]; // Gives "HH:MM:SS"
        const diabetesType = "type1"; // Hardcoded for now
        const predictionMessage = await canConsume(diabetesType, carbs, currentTime);

        // Terminal Logging
        console.log("Nutrient Info:", { food_name, carbs, gi });
        console.log("Time:", currentTime);
        console.log("Prediction:", predictionMessage);

        // Return combined object
        return {
            food_name,
            carbs,
            gi,
            barcode,
            glucose_time: currentTime,
            prediction: predictionMessage
        };

    } catch (error) {
        console.error(`Error fetching food data:`, error.message);
        return {
            food_name: "Unknown",
            carbs: "N/A",
            gi: "N/A",
            barcode,
            glucose_time: "Unavailable",
            prediction: "Unable to make prediction due to data error."
        };
    }
}

module.exports = getNutritionInfo;




// // latest one, added the consts after the api keys aand if that there then it wont run
// // so make sure to take it out if it isnt running
// // backend/routes/nutrition.js
// const axios = require('axios');
// require('dotenv').config();  // Enables reading from .env

// const FDC_API_KEY = process.env.FDC_API_KEY;

// const OPENFOODFACTS_URL = "https://world.openfoodfacts.org/api/v0/product/";
// const FDC_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

// // adding the names of the functions from predictor and glucoseReader
// const { getLatestGlucoseReading } = require("../utils/glucoseReader");
// const { canConsume } = require("../utils/predictor");

// async function getNutritionInfo(barcode) {
//     if (!barcode) {
//         throw new Error("Barcode is required");
//     }

//     try {
//         // Try OpenFoodFacts first
//         let response = await axios.get(`${OPENFOODFACTS_URL}${barcode}.json`);
//         if (response.data.status === 1) {
//             const product = response.data.product;
//             console.log(`Found in OpenFoodFacts: ${product.product_name}`);
//             return {
//                 food_name: product.product_name || "Unknown",
//                 carbs: product.nutriments.carbohydrates_100g || 0,
//                 gi: product.glycemic_index || "N/A"
//             };
//         }

//         // Fallback to FDC API
//         console.log(`Not found in OpenFoodFacts, trying FDC...`);
//         response = await axios.get(FDC_API_URL, {
//             params: {
//                 api_key: FDC_API_KEY,
//                 query: barcode
//             }
//         });

//         if (response.data.foods && response.data.foods.length > 0) {
//             const food = response.data.foods[0];
//             const carbNutrient = food.foodNutrients?.find(n => n.nutrientName === "Carbohydrate, by difference");

//             console.log(`Found in FDC: ${food.description}`);
//             return {
//                 food_name: food.description,
//                 carbs: carbNutrient?.value || 0,
//                 gi: "N/A"
//             };
//         }

//         throw new Error("Food not found in any API");

//     } catch (error) {
//         console.error(`Error fetching food data:`, error.message);
//         return {
//             food_name: "Unknown",
//             carbs: "N/A",
//             gi: "N/A"
//         };
//     }
// }

// module.exports = getNutritionInfo;


// // this is the old one that works with the old code (not the newest installments)
// // this will be the file for receiving the BARCODE ID from the .py file

// // backend/routes/nurition.js 
// const express = require('express'); //this lets us keep our routes in separate files
//                                     //without it we wouldnt be able to define the route logic clearly
// const axios = require('axios')  
// const router = express.Router();
// // Add this at the top
// require('dotenv').config();  // Enables reading from .env

// const FDC_API_KEY = process.env.FDC_API_KEY;

// const OPENFOODFACTS_URL = "https://world.openfoodfacts.org/api/v0/product/";
// const FDC_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

// // import the predictor function logic
// // const { canConsume } = require('../utils/predictor');


// router.post('/', async (req, res) => {
//     const { barcode } = req.body;
//     console.log(`Received barcode in backend: ${barcode}`);

//     if (!barcode) {
//         return res.status(400).json({ error: "Barcode is required" });
//     }

//     try {
//         // Try OpenFoodFacts first
//         let response = await axios.get(`${OPENFOODFACTS_URL}${barcode}.json`);
//         if (response.data.status === 1) {
//             const product = response.data.product;
//             // adding this to get the carbs info
//             const carbs = product.nutriments.carbohydrates_100g || 0;

//             //prediction section 
//             // const diabetesTpe = 'type1';
//             // const predictionMessage = canConsume(diabetesTpe, carbs);

//             console.log(`Found in OpenFoodFacts: ${product.product_name}`); // LOG API RESPONSE
//             // console.log(`Prediction:, ${predictionMessage}`);
//             return res.json({
//                 food_name: product.product_name || "Unknown",
//                 carbs: product.nutriments.carbohydrates_100g || 0,
//                 gi: product.glycemic_index || "N/A"
//                 // prediction: predictionMessage
//             });
//         }

//         // FDC api call,,, we have the api URL, and the parameters to complete the call are the 
//         // API key (which is sfely stored in the .env file (dont forget to run "npm install dotenv" in terminal))
//         // barcode will be the ID of the food item that we are looking for
//         console.log(`Not found in OpenFoodFacts, trying FDC...`);
//         response = await axios.get(FDC_API_URL, {
//             params: {
//                 api_key: FDC_API_KEY,
//                 query: barcode
//             }
//         });
//         if (response.data.foods && response.data.foods.length > 0) {
//             const food = response.data.foods[0];
//             console.log(`Found in FDC: ${food.description}`);
//             return res.json({   // updated the format of the response and what we need from it below
//                 food_name: food.description,
//                 carbs: carbNutrient?.value || 0,
//                 carbs_unit: carbNutrient?.unitName || "g",
//                 gi: "N/A"

//             });
//         }

//         console.log(`Not found in any API`);
//         return res.status(404).json({ error: "Food not found in OpenFoodFacts or FDC" });

//     } catch (error) {
//         console.error(`Error fetching food data:`, error);
//         res.status(500).json({ error: "Failed to fetch food data" });
//     }
// });

// module.exports = router;