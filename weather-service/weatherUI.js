// Exported function to display weather information in the console or the DOM
export function displayWeather(weather) {
    if (!weather) {
        console.log('Unable to fetch weather data.');
        return;
    }

    const { city, temperature, description } = weather;
    console.log(`Weather in ${city}:`);
    console.log(`Temperature: ${temperature}°C`);
    console.log(`Description: ${description}`);
}
