//Pseudo-code outline:
// Create var for API Key
// Create fetch function using API key 
// Filter the fetch function for Date, image(?), temp, wind, and humidity; limit to 5 day 
// Create function that returns fetch for city input
//  - Use this data to display today's forecast in a specific class
//  - Use next 5 days data to push into their own block
//  - Store the city input in localStorage to and append class under a search history section
// (If time allows) add a "home city star" button that appends the forecast at the bottom for a quick comparison to 
// what city you're searching for

const APIKey = "ada5c877c3f1ff4c35d2f2a88ca7ed5b";

async function cityWeatherForecast(city = "Austin") {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;

    try {
        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();

        // Display today's forecast
        displayTodayForecast(data.list[0]);

        // Clear previous daily forecasts
        const dailyForecastsEl = document.getElementById('daily-forecasts');
        dailyForecastsEl.innerHTML = "";

        // Display forecast for the next 5 days
        for (let i = 1; i <= 5; ++i) {
            displayDailyForecast(data.list[i * 8 - 1]);
        }

        // Store the city in local storage
        localStorage.setItem('lastSearchedCity', city);
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayTodayForecast(forecast) {
    const todayForecastEl = document.getElementById('today-forecast');
    
    const content = `
        <h2>Today</h2>
        <p>Temperature: ${forecast.main.temp}°F</p>
        <p>Weather: ${forecast.weather[0].description}</p>
    `;

    todayForecastEl.innerHTML = content;
}

function displayDailyForecast(forecast) {
    const dailyForecastsEl = document.getElementById('daily-forecasts');
    
    const content = `
        <div class="daily-forecast">
            <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
            <p>Temperature: ${forecast.main.temp}°F</p>
            <p>Weather: ${forecast.weather[0].description}</p>
        </div>
    `;

    dailyForecastsEl.innerHTML += content;
}

cityWeatherForecast("Austin");