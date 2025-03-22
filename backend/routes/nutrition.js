// this will be the file for receiving the BARCODE ID from the .py file

// backend/routes/nurition.js 
const express = require('express'); //this lets us keep our routes in separate files
                                    //without it we wouldnt be able to define the route logic clearly
const axios = require('axios')  
const router = express.Router();
// Add this at the top
require('dotenv').config();  // Enables reading from .env

const FDC_API_KEY = process.env.FDC_API_KEY;

const OPENFOODFACTS_URL = "https://world.openfoodfacts.org/api/v0/product/";
const FDC_API_URL = "https://api.nal.usda.gov/fdc/v1/foods/search";

router.post('/', async (req, res) => {
    const { barcode } = req.body;
    console.log(`Received barcode in backend: ${barcode}`);

    if (!barcode) {
        return res.status(400).json({ error: "Barcode is required" });
    }

    try {
        // Try OpenFoodFacts first
        let response = await axios.get(`${OPENFOODFACTS_URL}${barcode}.json`);
        if (response.data.status === 1) {
            const product = response.data.product;
            console.log(`Found in OpenFoodFacts: ${product.product_name}`); // LOG API RESPONSE
            return res.json({
                food_name: product.product_name || "Unknown",
                carbs: product.nutriments.carbohydrates_100g || 0,
                gi: product.glycemic_index || "N/A"
            });
        }

        // FDC api call,,, we have the api URL, and the parameters to complete the call are the 
        // API key (which is sfely stored in the .env file (dont forget to run "npm install dotenv" in terminal))
        // barcode will be the ID of the food item that we are looking for
        console.log(`Not found in OpenFoodFacts, trying FDC...`);
        response = await axios.get(FDC_API_URL, {
            params: {
                api_key: FDC_API_KEY,
                query: barcode
            }
        });
        if (response.data.foods && response.data.foods.length > 0) {
            const food = response.data.foods[0];
            console.log(`Found in FDC: ${food.description}`);
            return res.json({   // updated the format of the response and what we need from it below
                food_name: food.description,
                carbs: carbNutrient?.value || 0,
                carbs_unit: carbNutrient?.unitName || "g",
                gi: "N/A"
            });
        }

        console.log(`Not found in any API`);
        return res.status(404).json({ error: "Food not found in OpenFoodFacts or FDC" });

    } catch (error) {
        console.error(`Error fetching food data:`, error);
        res.status(500).json({ error: "Failed to fetch food data" });
    }
});

module.exports = router;