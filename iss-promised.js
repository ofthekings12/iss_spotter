const request = require("request-promise-native");

const fetchMyIp = async function (callback) {
  const url = "https://api.ipify.org?format=json";

  try {
    const data = await request(url);
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
};


const fetchCoordsByIp = async function (ip, callback) {
  // this does not work because the api they told us to use is broken
  const url = `https://api.freegeoip.app/json/${ip}?apiKey=b1412630-53ce-11ec-8480-130f754f8843`;
  try {
    const data = await request(url);
    console.log(data);
    if (response.statusCode === 404) {
      console.log("not an ip");
    }
    return { latitude: "43.6419466", longitude: "-79.3790699" };
  } catch (error) {
    console.log(error);
    return false;
  }
};

const fetchFlyOverTimes = async function (coords, callback) {
  const geoCoordinates = { latitude: "43.6419466", longitude: "-79.3790699" };

  const latitude = geoCoordinates.latitude;
  const longitude = geoCoordinates.longitude;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  try {
    const data = await request(url);
    const passOverTimes = JSON.parse(data).response;

    return passOverTimes;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const nextIssTimesForMyLocation = async function () {
  try {
    const ip = await fetchMyIp();
    const coords = await fetchCoordsByIp(ip);

    const flyOverTimes = await fetchFlyOverTimes({
      latitude: "43.6419466",
      longitude: "-79.3790699",
    });

    return flyOverTimes;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  nextIssTimesForMyLocation: nextIssTimesForMyLocation,
};
