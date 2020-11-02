// Weather app built using Open Weather Api

//.....(1) Weather......

/**
 * Setting selector variables
*/
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".error-notification");
const temperatureElement = document.querySelector(".temperature p");
const minMaxElement = document.querySelector(".min-max-temp p");
const iconElement = document.querySelector(".weather-icon");


/**
 * Setting up weather data object and default temperatures as celsius.
*/
const weather = {};
weather.temperature = {
    unit: "celsius"
};
weather.maxTemp = {
    unit: "celsius"
};
weather.minTemp = {
    unit: "celsius"
};

/**
 * API key
*/
const key = "7050354d2e4e384aee208eb160eea894";

/**
 * Check if the user's browser supports Geolocation.
 * If it does not, render an error message to the user's browser.
 */
if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Geolocation not supported by browser</p>";
    minMaxElement.parentNode.classList.add("noDisplay");
}

/**
 * Setting user's position using latitude and longitude coordinates.
 * 
 * @param {string} position
 */
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getResults(latitude, longitude);
}

/**
 * Show error when there is an issue with Geolocation
 * Error message displayed with other elements excluded.
 * 
 * @param {string} error 
 */
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
    locationElement.parentNode.classList.add("noDisplay");
    minMaxElement.parentNode.classList.add("noDisplay");
    temperatureElement.parentNode.style.cssText = "height: 50px; margin-left: 30px; display: flex; align-items: center";
}

/**
 * Get results from API provider based on user's postion (latitude & longitude).
 * 
 * @param {number} latitude 
 * @param {number} longitude
 * 
 * Fetch API data based on user's position.
 * @returns {object} multiple data based on users location.
 * Data is called and passed into Weather object.
 * 
 * displayResults function is called.
 */
function getResults(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    
    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.city = data.name;
            weather.temperature.value = Math.floor(data.main.temp);
            weather.minTemp.value = Math.floor(data.main.temp_min);
            weather.maxTemp.value = Math.floor(data.main.temp_max);
            weather.iconId = data.weather[0].icon;
            
        })
        .then(function() {
            displayResults();
        });
}

/**
 * Rendering data outputs, passed into the Weather object, to the browser.
 */
function displayResults() {
    locationElement.innerHTML = `${weather.city}`; 
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    minMaxElement.innerHTML = `L: ${weather.minTemp.value}°<span>C</span> / H: ${weather.maxTemp.value}°<span>C</span>`;
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
}

/**
 * Calculation to convert celsius to fahrenheit.
 * 
 * @param {number} temperature in celsius
 * @returns {number} temperature in fahrenheit
 */
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}

/**
 * Converting Celsius to Fahrenheit when user clicks on temperature rendered to the browser
 * 
 * Click event listener triggers function being called.
 * 
 * Current temperature, max temperature and min temperature as converted, if being displayed.
 * 
 * @returns {undefined} if there is an error and temperature is not displayed.
 */
temperatureElement.addEventListener("click", function() {
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        let minFahrenheit = celsiusToFahrenheit(weather.minTemp.value);
        let maxFahrenheit = celsiusToFahrenheit(weather.maxTemp.value);
        fahrenheit = Math.floor(fahrenheit);
        minFahrenheit = Math.floor(minFahrenheit);
        maxFahrenheit = Math.floor(maxFahrenheit);
        
        temperatureElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        minMaxElement.innerHTML = `${maxFahrenheit}°<span>F</span> / ${minFahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        minMaxElement.innerHTML = `${weather.maxTemp.value}°<span>C</span> / ${weather.minTemp.value}°<span>C</span>`;
        weather.temperature.unit = "celsius";
    }
});

//.....(2) Date......
const dateElement = document.querySelector(".date");

/**
 * Generates the current day's date and renders to the browser.
 */
let options = {
    weekday: "short",
    day: "numeric",
    month: "short"
};

let now = new Date();
dateElement.innerHTML = now.toLocaleDateString("en-GB", options);
