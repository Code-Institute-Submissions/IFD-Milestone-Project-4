// Weather app built using Open Weather Api

//.....(1) WEATHER......

// SELECTORS
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".error-notification");
const temperatureElement = document.querySelector(".temperature p");
const minMaxElement = document.querySelector(".min-max-temp p");
const iconElement = document.querySelector(".weather-icon");


// WEATHER DATA OBJECT
const weather = {};
weather.temperature = {
    unit: "celsius"
}
weather.maxTemp = {
    unit: "celsius"
}
weather.minTemp = {
    unit: "celsius"
}

// API KEY
const key = "7050354d2e4e384aee208eb160eea894";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Geolocation not supported by browser</p>";
    minMaxElement.parentNode.classList.add("noDisplay");
}

// SET USER'S POSITION
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getResults(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
    locationElement.parentNode.classList.add("noDisplay");
    minMaxElement.parentNode.classList.add("noDisplay");
    temperatureElement.parentNode.style.cssText = "height: 50px; margin-left: 30px; display: flex; align-items: center";
}

// GET RESULTS FROM API PROVIDER
function getResults(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    
    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.city = data.name;
            // weather.country = data.sys.country;
            weather.temperature.value = Math.floor(data.main.temp);
            weather.minTemp.value = Math.floor(data.main.temp_min);
            weather.maxTemp.value = Math.floor(data.main.temp_max);
            weather.iconId = data.weather[0].icon;
            
        })
        .then(function() {
            displayResults();
        });
}

// DISPLAY RESULTS
function displayResults() {
    // locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    locationElement.innerHTML = `${weather.city}`; 
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    minMaxElement.innerHTML = `H: ${weather.maxTemp.value}°<span>C</span> / L: ${weather.minTemp.value}°<span>C</span>`;
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
}

// CONVERT CELSIUS TO FAHRENHEIT
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMP ELEMENT
temperatureElement.addEventListener("click", function() {
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        let minFahrenheit = celsiusToFahrenheit(weather.minTemp.value)
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

//.....(2) DATE......
const dateElement = document.querySelector(".date");

// Generate today's Date
let options = {
    weekday: "short",
    day: "numeric",
    month: "short"
};

let now = new Date();
dateElement.innerHTML = now.toLocaleDateString("en-GB", options);
