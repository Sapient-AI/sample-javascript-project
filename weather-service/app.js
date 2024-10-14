// Importing the weather service and UI modules
import { getWeather } from './weatherService.js';
import { displayWeather } from './weatherUI.js';

// Main function to get and display weather for a given city
async function showWeather(city) {
    const weather = await getWeather(city);
    displayWeather(weather);
}

// Example usage: Fetch and display weather for a city
showWeather('New York');
