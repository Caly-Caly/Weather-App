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

function cityChange(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
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
  let temp = Math.round(response.data.main.temp);
  displayTemp.innerHTML = `${temp}`;

  // Weather Conditions Display & Code
  let weatherDisplay = document.querySelector("#weatherConditions");
  weatherDisplay.innerHTML = response.data.weather[0].description;

  // Humidity Percentage Display & Code
  let humidityDisplay = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityDisplay.innerHTML = `Humidity: ${humidity}%`;

  // Precipitation Display & Code
  let precipitationDisplay = document.querySelector("#precipitation");
  let precipitation = response.data.clouds.all;
  precipitationDisplay.innerHTML = `Precipitation: ${precipitation}%`;

  // Wind Speed Display & Code
  let windDisplay = document.querySelector("#windSpeed");
  let windSpeed = Math.round(response.data.wind.speed);
  windDisplay.innerHTML = `Wind: ${windSpeed}mph`;
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
  let temperature = Math.round(response.data.main.temp);
  h1.innerHTML = `${response.data.name} `;
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = ` ${temperature} `;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey2 = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey2}`;
  axios.get(url).then(pinPoint);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
