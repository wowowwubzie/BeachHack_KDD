// read data from csv file 
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');  // Import the path module

// dataset is relatively small, so use an array to hold glucose readings for faster access
const glucoseData = [];

function loadGlucoseData() {
  const filePath = path.join(__dirname, '../data/cleaned_glucose_data.csv');  // Update path to use 'path.join'
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
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


// // semi works, the time reading is not working unless it is exact time so we fixing that
// const fs = require("fs");
// const path = require("path");
// const csv = require("csv-parser");

// const filePath = path.join(__dirname, "../data/cleaned_glucose_data.csv");

// // This function gets the latest glucose reading based on the current time
// function getLatestGlucoseReading(currentTime) {
//   return new Promise((resolve, reject) => {
//     const glucoseData = [];

//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (row) => {
//         if (row.Time && row.Glucose) {
//           glucoseData.push({
//             time: row.Time.trim(),
//             glucose: parseFloat(row.Glucose)
//           });
//         }
//       })
//       .on("end", () => {
//         // Find closest glucose reading before or at currentTime
//         let closest = null;
//         for (let i = glucoseData.length - 1; i >= 0; i--) {
//           if (glucoseData[i].time <= currentTime) {
//             closest = glucoseData[i];
//             break;
//           }
//         }

//         if (closest) {
//           resolve(closest.glucose);
//         } else {
//           reject(new Error("No matching glucose data found for time: " + currentTime));
//         }
//       })
//       .on("error", (err) => {
//         reject(err);
//       });
//   });
// }

// module.exports = { getLatestGlucoseReading };






// // read data from csv file 
// const fs = require('fs');
// const csv = require('csv-parser');
// const path = require("path");
// const filepath = path.join(__dirname, '../data/cleaned_glucose_data.csv');

// // dataset is relatively small, so use an array to hold glucose readings for faster access
// const glucoseData = [];

// function loadGlucoseData() {
//   return new Promise((resolve, reject) => {
//     fs.createReadStream(filepath)
//       .pipe(csv())
//       .on('data', (row) => {
//         const glucoseValue = parseFloat(row[' Scan_Glucose_mmol/L']);
//         // store value with appropriate as appropriate type
//         glucoseData.push({
//           Timestamp_UTC: row['Timestamp_UTC'],
//           Scan_Glucose_mmol_L: glucoseValue, // the float value
//         });
//       })
//       .on('end', () => { // verification
//         console.log('csv file successfully processed');
//         resolve(glucoseData); // Resolve the promise with the data
//       })
//       .on('error', (error) => reject(error)); // Handle error
//   });
// }
// // export glucoseData array to make it available in other files
// module.exports = loadGlucoseData;