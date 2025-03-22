// have nutrition facts (carbs) and get reading (from data to simulate real-time readings)


const loadGlucoseData = require('./glucoseReader'); // get glucose data from reader

const carbToGlucoseConversionFactor = 4; // conversion factor (mg/dL per g of carb)
const safeGlucoseRangeType1 = { min: 4, max: 8 }; // range for Type 1 Diabetes (mmol/L)
const safeGlucoseRangeType2 = { min: 5, max: 10 }; // range for Type 2 Diabetes (mmol/L)

let glucoseData = []; // Will hold the glucose data

// Async function to load glucose data and run the logic
async function run() {
  try {
    glucoseData = await loadGlucoseData(); // Wait until glucose data is loaded
    //test - type, carb, time
    const result = canConsume('type1', 30, '16:58:00'); // get reading from time and calculate based on reading and carb and predict effect based on diabetes type
    console.log(result);
  } catch (error) {
    console.error('Error loading glucose data:', error);
  }
}
run();

// time is a string (e.g., '16:58:00'), so convert into a Date object, with today's date
function timeToDate(timeString) {
    const today = new Date(); // Get today's date
    const [hours, minutes, seconds] = timeString.split(':'); // Split time into hours, minutes, and seconds
    today.setHours(hours, minutes, seconds, 0); // Set the time part (keeping today's date)
    return today;
  }

// simulate getting glucose reading by getting data on the closest timestamp
function getCurrentGlucoseLevel(currentTime) {
    const currentDate = timeToDate(currentTime);
  // get the closest glucose reading to the given time
  let closestReading = glucoseData.reduce((prev, curr) => {
    const readingTime = timeToDate(curr.Timestamp_UTC); // Convert glucose timestamp to Date object
    return Math.abs(readingTime - currentDate) < Math.abs(timeToDate(prev.Timestamp_UTC) - currentDate)
      ? curr
      : prev;
  });

  return closestReading ? closestReading.Scan_Glucose_mmol_L : null;
}

// predict the effect if consumed - simulate glucose rise 
function simulateGlucoseRise(currentGlucose, carbs) {
  // calculate glucose increase from carbs (e.g., 1g carbs = 4 mg/dL rise)
  const glucoseRise = carbs * carbToGlucoseConversionFactor; // can change = flexibility
  // convert to mmol/L - (1 mmol/L = 18 mg/dL)
  const glucoseRiseConverted = glucoseRise/18
  // simulate glucose rise over time (1 hour is assumed for full glucose rise)
  const predictedGlucose = currentGlucose + glucoseRiseConverted ; // Convert mg/dL to mmol/L (1 mmol/L = 18 mg/dL)
  
  return predictedGlucose.toFixed(2);
}

// check if the user can consume based on type of diabetes
function canConsume(type, carbs, currentTime) {
  const currentGlucose = getCurrentGlucoseLevel(currentTime);

  if (currentGlucose === null) {
    return "Unable to fetch glucose level.";
  }

  // simulate glucose rise after consumption
  const predictedGlucose = simulateGlucoseRise(currentGlucose, carbs);

  // get safety range based on user type
  let safeRange;
  if (type === 'type1') {
    safeRange = safeGlucoseRangeType1;
  } else if (type === 'type2') {
    safeRange = safeGlucoseRangeType2;
  } else {
    return "Invalid diabetes type.";
  }

  // suggestion made based on predicted glucose level
  if (predictedGlucose < safeRange.min) {
    return `Safe to consume! Current Glucose: ${currentGlucose} mmol/L, Predicted Glucose: ${predictedGlucose} mmol/L`;
  } else if (predictedGlucose <= safeRange.max) {
    return `Proceed with caution. Current Glucose: ${currentGlucose} mmol/L, Predicted Glucose: ${predictedGlucose} mmol/L`;
  } else {
    return `Avoid consuming this item! Current Glucose: ${currentGlucose} mmol/L, Predicted Glucose: ${predictedGlucose} mmol/L`;
  }
}

module.exports = { canConsume };


