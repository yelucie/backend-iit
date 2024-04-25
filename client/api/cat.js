var axios = require("axios").default;

async function getRandomCatFact() {
  try {
    const response = await axios.get("https://catfact.ninja/fact");
    return response.data.fact;
  }
  catch (error) {
    console.error(error);
    return "Error fetching cat fact";
  }
}

module.exports = { getRandomCatFact };
