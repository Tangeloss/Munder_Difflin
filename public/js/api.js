document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'c10e56715bb64ec9d8e3df72c46dbdb3';
    const city = 'Greensboro';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => updateWeatherDisplay(data))
        .catch(error => console.error('Failed to fetch weather data:', error));
});

function updateWeatherDisplay(weatherData) {
    const weatherElement = document.getElementById('weather-display');
    if (weatherData && weatherData.weather && weatherData.main) {
        const temperature = Math.round((weatherData.main.temp - 273.15) * 9/5 + 32);
        const condition = weatherData.weather[0].main;
        weatherElement.textContent = `Weather: ${condition}, ${temperature}°F`;
    } else {
        weatherElement.textContent = 'Weather not available';
    }
}


