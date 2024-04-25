const fetch = require('node-fetch');

async function getRandomCatFact() {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        return data.fact;
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        return null;
    }
}

module.exports = { getRandomCatFact };