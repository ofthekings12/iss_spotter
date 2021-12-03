const test = require("./iss-promised.js");

const nextIssTimesForMyLocation = test.nextIssTimesForMyLocation;

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextIssTimesForMyLocation((error, data) => {
    
})
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => console.log(error));
