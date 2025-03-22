// read data from csv file 
const fs = require('fs');
const csv = require('csv-parser');

// dataset is relatively small, so use an array to hold glucose readings for faster access
const glucoseData = [];

function loadGlucoseData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('../data/cleaned_glucose_data.csv')
      .pipe(csv())
      .on('data', (row) => {
        const glucoseValue = parseFloat(row[' Scan_Glucose_mmol/L']);
        // store value with appropriate as appropriate type
        glucoseData.push({
          Timestamp_UTC: row['Timestamp_UTC'],
          Scan_Glucose_mmol_L: glucoseValue, // the float value
        });
      })
      .on('end', () => { // verification
        console.log('csv file successfully processed');
        resolve(glucoseData); // Resolve the promise with the data
      })
      .on('error', (error) => reject(error)); // Handle error
  });
}
// export glucoseData array to make it available in other files
module.exports = loadGlucoseData;