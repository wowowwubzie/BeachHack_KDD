// read data from csv file 
const fs = require('fs');
const csv = require('csv-parser');

// dataset is relatively small, so use an array to hold glucose readings for faster access
const glucoseData = [];

fs.createReadStream('../data/cleaned_glucose_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    const glucoseValue = parseFloat(row[' Scan_Glucose_mmol/L']);
    
    // store value with appropriate as appropriate type
    glucoseData.push({
      Timestamp_UTC: row['Timestamp_UTC'],
      Scan_Glucose_mmol_L: glucoseValue,  // Use the parsed float value
    });
  })
  .on('end', () => { // verification
    console.log('cvs file successfully processed');
   //console.log("First 5 records:", glucoseData.slice(0, 5)); // Log first 5 records 
  });
