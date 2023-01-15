//OBJECTIVES
//Fetch data from weather API
//toggle C or F temp
//change page styling based on weather

// const API_KEY = process.env.OPENWEATHER_API_KEY;

//Get Location Latitude & Longitude
const getLocation = async (city, stateCode = "", countryCode = "") => {
  const locResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=...`
  );
  const data = await locResponse.json();
  return [data[0].lat, data[0].lon];
};

//Get Location Weather
const getWeather = async (city, stateCode = "", countryCode = "") => {
  const locLatLon = await getLocation(city, stateCode, countryCode);
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${locLatLon[0]}&lon=${locLatLon[1]}&units=imperial&appid=...`
  );
  const weatherData = await weatherResponse.json();
  return {
    temp: weatherData.main.temp,
    humidity: weatherData.main.humidity,
    description: weatherData.weather[0].description,
    wind: weatherData.wind.speed,
  };
};

const londonWeather = getWeather("London", "", "GB");

londonWeather.then((data) => {
  console.log(data);
});
