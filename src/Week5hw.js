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
  let defaultDisplayCity = document.querySelector("h1");
  let displayDefaultTemper = document.querySelector("#celcius");
  let wDescriptionDisplay = document.querySelector("#weatherConditions");
  let humidityElement = document.querySelector("#humidity");
  let precipitation = document.querySelector("#precipitation");
  let windMPH = document.querySelector("#windSpeed");
  defaultDisplayCity.innerHTML = response.data.name;
  displayDefaultTemper.innerHTML = Math.round(response.data.main.temp);
  wDescriptionDisplay.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  precipitation.innerHTML = response.data.clouds.all;
  windMPH.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

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
  city.innerHTML = response.data.name;

  // Main TEMP Display & Code
  let displayTemp = document.querySelector("#celcius");
  displayTemp.innerHTML = Math.round(response.data.main.temp);

  // Weather Conditions Display & Code
  let weatherDisplay = document.querySelector("#weatherConditions");
  weatherDisplay.innerHTML = response.data.weather[0].description;

  // Humidity Percentage Display & Code
  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = response.data.main.humidity;

  // Precipitation Display & Code
  let precipitationDisplay = document.querySelector("#precipitation");
  precipitationDisplay.innerHTML = response.data.clouds.all;

  // Wind Speed Display & Code
  let windDisplay = document.querySelector("#windSpeed");
  windDisplay.innerHTML = Math.round(response.data.wind.speed);
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", locateACity);

function locateACity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  locatingCity(city);
}
function locatingCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function pinPoint(response) {
  let h1 = document.querySelector("h1");
  let celcius = document.querySelector("#celcius");
  h1.innerHTML = response.data.name;
  celcius.innerHTML = Math.round(response.data.main.temp);
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey2}`;
  axios.get(url).then(pinPoint);
  c;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
