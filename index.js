const test = require("./iss.js");

const nextIssTimesForMyLocation = test.nextIssTimesForMyLocation;

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextIssTimesForMyLocation((error, passTimes) => {
    if (error) {
        return console.log('failed :( ')
    } else {
        printPassTimes(passTimes)
    }
})