const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const nutritionRoute = require('./routes/nutrition');
app.use('/nutrition', nutritionRoute);

// Start server
//const PORT = 5000;
const PORT = process.env.PORT || 5001; // Change 5000 to 5001 if needed

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
