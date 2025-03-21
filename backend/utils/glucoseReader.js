// read data from csv file 
const fs = require('fs');
const csv = require('csv-parser');

// dataset is relatively small, so use an array to hold glucose readings for faster access
const glucoseData = [];

fs.createReadStream('../data/glucose_20-10-2023.csv')
  .pipe(csv())
  .on('data', (row) => {
    // only get the columns needed
    const selectedColumns = {
      'timestamp': row['20-10-2023 03:03 AM UTC'],
      'scan_glucose_mmol/L': row['Unnamed: 5']
    };

    glucoseData.push(selectedColumns);  // store 
  })
  .on('end', () => { // verification
    console.log('cvs file successfully processed');
    // clean data = get rid of null/undefined values
    const cleanedData = glucoseData.filter(row => row['scan_glucose_mmol/L'] !== null && row['scan_glucose_mmol/L'] !== undefined && row['scan_glucose_mmol/L'] !== "");
    //console.log(glucoseData[0]);  
  });
