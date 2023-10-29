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

let APIKey = "ada5c877c3f1ff4c35d2f2a88ca7ed5b";
let city= "Austin";
let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

fetch(queryURL)
.then(response => response.json())
.then(data => {
    console.log(data)
})
    .catch (error => {
        console.log('Error:', error);
    });