//Pseudo-code outline:
// (If time allows) add a "home city star" button that appends the forecast at the bottom for a quick comparison to 
// what city you're searching for

// Create var for API Key
const APIKey = "ada5c877c3f1ff4c35d2f2a88ca7ed5b";

// Create fetch function using API key 
async function cityWeatherForecast(city = "Austin") {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}&units=imperial`;

    try {
        const response = await fetch(forecastURL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        // Display today's forecast
        displayTodayForecast(data.list[0], city);
        // Clear previous daily forecasts
        const dailyForecastsEl = document.getElementById('daily-forecasts');
        dailyForecastsEl.innerHTML = "";
        // Display forecast for the next 5 days
        for (let i = 1; i <= 5; ++i) {
            displayDailyForecast(data.list[i * 8 - 1]);
        }
        // Store the city in local storage
        storeCityInLocalStorage(city);
    } catch (error) {
        console.log('Error:', error);
    }
}

// Stores city search in local storage as array if truthy; if falsy create empty array
function storeCityInLocalStorage(city) {
    let cities = localStorage.getItem('lastSearchedCities');
    cities = cities ? JSON.parse(cities) : [];

    if (!cities.includes(city)) {
        cities.push(city);
    }
    displayCities(cities);
    
    localStorage.setItem('lastSearchedCities', JSON.stringify(cities));

}

// displays saved searches by creating an element in html with the city name saved in localstorage
function displayCities(cities) {
    const citiesListSpan = document.getElementById('cities-list');
    cities.forEach(city => {
        const citySpan = document.createElement('span');
        citySpan.classList.add('mr-2', 'mb-2', 'bg-gray-200', 'p-2', 'rounded');  
        citySpan.textContent = city;
        citiesListSpan.appendChild(citySpan);
    });
}

function displayTodayForecast(forecast, cityName) {
    const todayForecastEl = document.getElementById('today-forecast');
    const iconURL = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
    const content = `
        <h2>Today in ${cityName}</h2>
        <img src="${iconURL}" alt="Weather icon">
        <p>Temperature: ${forecast.main.temp}°F</p>
        <p>Weather: ${forecast.weather[0].description}</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} mph</p>
    `;
    todayForecastEl.innerHTML = content;
}

// Filter the fetch function for Date, image(?), temp, wind, and humidity; limit to 5 day 
function displayDailyForecast(forecast) {
    const dailyForecastsEl = document.getElementById('daily-forecasts');
    const iconURL = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
    const content = `
        <div class="daily-forecast">
            <h3>${new Date(forecast.dt * 1000).toLocaleDateString()}</h3>
            <img src="${iconURL}" alt="Weather icon">
            <p>Temperature: ${forecast.main.temp}°F</p>
            <p>Weather: ${forecast.weather[0].description}</p>
            <p>Humidity: ${forecast.main.humidity}%</p>
            <p>Wind Speed: ${forecast.wind.speed} mph</p>
        </div>
    `;
    dailyForecastsEl.innerHTML += content;
}

// Create function that returns fetch for city input
function searchCity() {
    const city = document.getElementById('city-input').value;
    cityWeatherForecast(city);
}

cityWeatherForecast("Austin");