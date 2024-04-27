var axios = require("axios").default;

var API_KEY = process.env.API_KEY;

async function getWeather(city) {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    return response.data.main.temp - 273.15;
  }
  catch (error) {
    console.error(error);
    return "Error fetching weather data.";
  }
}

module.exports = { getWeather };
