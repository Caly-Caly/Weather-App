function formatDate(date) {
  let now = new Date();
  let presentDate = now.getDate();
  let minutes = now.getMinutes();
  let hours = now.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[now.getMonth()];

  return `${day}, ${month} ${presentDate}, ${hours}:${minutes}`;
}

let dateDisplay = document.querySelector("#currentDate");
let currentTime = new Date();
dateDisplay.innerHTML = formatDate(currentTime);

function defaultTempDisplay(response) {
  console.log(response);
  let defaultDisplayCity = document.querySelector("h1");
  let displayDefaultTemper = document.querySelector("#celcius");
  let wDescriptionDisplay = document.querySelector("#weatherConditions");
  let humidityElement = document.querySelector("#humidity");
  let windMPH = document.querySelector("#windSpeed");
  let imageElement = document.querySelector("#icon");
  defaultDisplayCity.innerHTML = response.data.city;
  displayDefaultTemper.innerHTML = Math.round(
    response.data.temperature.current
  );
  wDescriptionDisplay.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windMPH.innerHTML = Math.round(response.data.wind.speed);
  imageElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

let apiKey = "744441eb32ea7ceo3fb901c610f1d4t9";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=New York&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(defaultTempDisplay);

function cityChange(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  let newCityName = document.querySelector("#cityName");
  newCityName.innerHTML = `${searchInput.value}`;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", cityChange);

function showTemperature(response) {
  // City Search Display & Code
  let city = document.querySelector("h1");
  city.innerHTML = response.data.city;

  // Main TEMP Display & Code
  let displayTemp = document.querySelector("#celcius");
  displayTemp.innerHTML = Math.round(response.data.temperature.current);

  // Weather Conditions Display & Code
  let weatherDisplay = document.querySelector("#weatherConditions");
  weatherDisplay.innerHTML = response.data.condition.description;

  // Humidity Percentage Display & Code
  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = response.data.temperature.humidity;

  // Wind Speed Display & Code
  let windDisplay = document.querySelector("#windSpeed");
  windDisplay.innerHTML = Math.round(response.data.wind.speed);

  // Icon Display Image & Code
  let imageDisplay = document.querySelector("#icon");
  imageDisplay.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", locateACity);

function locateACity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  locatingCity(city);
}
function locatingCity(city) {
  let apiKey = "744441eb32ea7ceo3fb901c610f1d4t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function pinPoint(response) {
  let h1 = document.querySelector("h1");
  let celcius = document.querySelector("#celcius");
  let windSpeed = document.querySelector("#windSpeed");
  let humidityPercentage = document.querySelector("#humidity");
  h1.innerHTML = response.data.city;
  celcius.innerHTML = Math.round(response.data.daily[0].temperature.day);
  windSpeed.innerHTML = Math.round(response.data.daily[0].wind.speed);
  humidityPercentage.innerHTML = response.data.daily[0].temperature.humidity;
}

function retrievePosition(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey2 = "744441eb32ea7ceo3fb901c610f1d4t9";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey2}&units=metric`;
  axios.get(url).then(pinPoint);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
