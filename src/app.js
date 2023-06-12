// The code below is powering the default city displayed when you first open the website.

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherInfo(response) {
  console.log(response);
  let displayCity = document.querySelector("h1");
  let displayTemper = document.querySelector("#tempDisplay");
  let DescriptionElement = document.querySelector("#weatherConditions");
  let humidityElement = document.querySelector("#humidity");
  let windMPH = document.querySelector("#windSpeed");
  let imageElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  celsiusTemp = response.data.temperature.current;

  displayCity.innerHTML = response.data.city;
  displayTemper.innerHTML = Math.round(celsiusTemp);
  DescriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windMPH.innerHTML = Math.round(response.data.wind.speed);
  imageElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  imageElement.setAttribute("alt", response.data.condition.description);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

// The code below is powering the " city search" button.

function search(city) {
  let apiKey = "744441eb32ea7ceo3fb901c610f1d4t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayImperialTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempDisplay");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayMetricTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#tempDisplay");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-converter");
fahrenheitLink.addEventListener("click", displayImperialTemp);

let celsiusLink = document.querySelector("#celsius-converter");
celsiusLink.addEventListener("click", displayMetricTemp);

search("New York");

// The following code below provides function to the "Current location" Button

function pinPoint(response) {
  let h1 = document.querySelector("h1");
  let celcius = document.querySelector("#tempDisplay");
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
