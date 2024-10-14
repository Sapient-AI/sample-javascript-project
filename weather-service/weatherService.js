// Exported function to fetch weather data using a public API
export async function getWeather(city) {
    const apiKey = 'your_api_key_here'; // Replace with your API key from a weather service provider
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather for ${city}`);
        }

        const weatherData = await response.json();
        return {
            city: weatherData.name,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}
