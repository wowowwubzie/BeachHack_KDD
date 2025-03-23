const loadGlucoseData = require('./glucoseReader');

const carbToGlucoseConversionFactor = 4;
const safeGlucoseRangeType1 = { min: 4, max: 8 };
// const safeGlucoseRangeType2 = { min: 5, max: 10 };

let glucoseData = [];

function timeToDate(timeString) {
  const today = new Date();
  const [hours, minutes, seconds] = timeString.split(':');
  today.setHours(hours, minutes, seconds || 0, 0);
  return today;
}

function getCurrentGlucoseLevel(currentTime) {
  const currentDate = timeToDate(currentTime);

  let closestReading = glucoseData.reduce((prev, curr) => {
    const readingTime = timeToDate(curr.Timestamp_UTC);
    return Math.abs(readingTime - currentDate) < Math.abs(timeToDate(prev.Timestamp_UTC) - currentDate)
      ? curr
      : prev;
  });

  return closestReading ? closestReading.Scan_Glucose_mmol_L : null;
}

function simulateGlucoseRise(currentGlucose, carbs) {
  const glucoseRise = carbs * carbToGlucoseConversionFactor;
  const glucoseRiseConverted = glucoseRise / 18;
  const predictedGlucose = currentGlucose + glucoseRiseConverted;

  return predictedGlucose.toFixed(2);
}

async function canConsume(type, carbs, currentTime) {
  if (!currentTime) return "Time not provided.";
  glucoseData = await loadGlucoseData();

  const currentGlucose = getCurrentGlucoseLevel(currentTime);

  if (currentGlucose === null) {
    return "Unable to fetch glucose level.";
  }

  const predictedGlucose = simulateGlucoseRise(currentGlucose, carbs);

  let safeRange;
  if (type === 'type1') {
    safeRange = safeGlucoseRangeType1;
  } else if (type === 'type2') {
    safeRange = safeGlucoseRangeType2;
  } else {
    return "Invalid diabetes type.";
  }

  if (predictedGlucose < safeRange.min) {
    return `Safe to consume! \nCurrent: ${currentGlucose} mmol/L, Predicted if item consumed: ${predictedGlucose} mmol/L` ;
  } else if (predictedGlucose <= safeRange.max) {
    return `Proceed with caution. \nCurrent: ${currentGlucose} mmol/L, Predicted if item consumed: ${predictedGlucose} mmol/L`;
  } else {
    return `Avoid consuming! \nCurrent: ${currentGlucose} mmol/L, Predicted if item consumed: ${predictedGlucose} mmol/L`;
  }
}// a lil error in the new line^^ \n, wont actually show in the output

module.exports = { canConsume };
