var axios = require("axios").default;

async function getCities() {
  try {
    const response = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
      country: "united states"
    });
    return response.data.data;
  }
  catch (error) {
    console.error(error);
    return "Error fetching US cities";
  }
}

module.exports = { getCities };
