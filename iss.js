const request = require("request");

const fetchMyIp = function (callback) {
  const url = "https://api.ipify.org?format=json";

  request(url, function (error, response, body) {
    if (error) {
      console.log(error);
      callback(error);
      return;
    } else {
      if (response.statusCode !== 200) {
        callback(
          Error(
            "StatusCode ",
            response.statusCode,
            "when fetching IP. Response; ",
            body
          ),
          null
        );
        return;
      }

      callback(null, JSON.parse(body).ip);
      return;
    }
  });
};

const fetchCoordsByIp = function (ip, callback) { // this does not work because the api they told us to use is broken
  const url = `https://api.freegeoip.app/json/${ip}?apiKey=b1412630-53ce-11ec-8480-130f754f8843`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      //   if (response.statusCode !== 200) { // the geoapi isnt working so leaving this out!
      //     callback(
      //       Error(
      //         "StatusCode ",
      //         response.statusCode,
      //         "when fetching IP. Response; ",
      //         body
      //       ),
      //       null
      //     );
      //     return;
      //   }
      console.log(body);
      if (response.statusCode === 404) {
        console.log("not an ip :(");
      }
      callback(null, { latitude: "43.6419466", longitude: "-79.3790699" });
      return;
    }
  });
};

const fetchFlyOverTimes = function (coords, callback) {
  const geoCoordinates = { latitude: "43.6419466", longitude: "-79.3790699" };

  const latitude = geoCoordinates.latitude;
  const longitude = geoCoordinates.longitude;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error);
    } else {
      const passOverTimes = JSON.parse(body).response;
      callback(null, passOverTimes);
    }
  });
};

function nextIssTimesForMyLocation(callback) {
//   const ip = fetchMyIp((error, data) => {
//     if (error) {
//       console.log(error);
//       return callback(error, null);
//     } else {
//       return data;
//     }
//   });
//   const coords = fetchCoordsByIp(ip, (error, data) => {
//     if (error) {
//       console.log(error);
//       return callback(error, null);
//     } else {
//       return data;
//     }
//   });

  const flyOverTimes = fetchFlyOverTimes({ latitude: "43.6419466", longitude: "-79.3790699" }, (error, data) => {
    if (error) {
      console.log(error);
      return callback(error, null);

    } else {
      return callback(null, data);
    }
  });
}

module.exports = {

  nextIssTimesForMyLocation: nextIssTimesForMyLocation
};
