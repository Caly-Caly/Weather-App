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

// Timestamp Function
function formatTimeStamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

// Future Forecast function below
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="boxoutline row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="forecast-date">${formatTimeStamp(forecastDay.time)}</div>
          
          <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" width="70">
          <div class="weather-forecast-temperatures">
          <span id="highTemp" class="high-temp">${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span id="lowTemp" class="low-temp">${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
          </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

// Forecast coordinates function
function getForecast(coordinates) {
  let apiKey = "744441eb32ea7ceo3fb901c610f1d4t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// Weather HTML elements displayed with assigned API items
function displayWeatherInfo(response) {
  console.log(response);
  let displayCity = document.querySelector("h1");
  let displayTemper = document.querySelector("#tempDisplay");
  let DescriptionElement = document.querySelector("#weatherConditions");
  let feelsLikeElement = document.querySelector("#feelslikeTemp");
  let humidityElement = document.querySelector("#humidity");
  let windMPH = document.querySelector("#windSpeed");
  let imageElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  celsiusTemp = response.data.daily[0].temperature.day;

  displayCity.innerHTML = response.data.city;
  displayTemper.innerHTML = Math.round(response.data.daily[0].temperature.day);
  DescriptionElement.innerHTML = response.data.daily[0].condition.description;
  feelsLikeElement.innerHTML = humidityElement.innerHTML = Math.round(
    response.data.daily[0].temperature.day
  );
  response.data.daily[0].temperature.humidity;
  windMPH.innerHTML = Math.round(response.data.daily[0].wind.speed);
  imageElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.daily[0].condition.icon}.png`
  );
  imageElement.setAttribute("alt", response.data.daily[0].condition.icon);
  dateElement.innerHTML = formatDate(response.data.daily[0].time * 1000);

  getForecast(response.data.coordinates);
}

// The code below is powering the " city search" button.
function search(city) {
  let apiKey = "744441eb32ea7ceo3fb901c610f1d4t9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherInfo);
}

// Function below is the users city names input
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  if (cityInputElement.value) {
    let city = cityInputElement.value;
    search(city);
  } else {
    alert(`Please enter a city`);
    search(cityInputElement.value);
  }
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Brooklyn");

// The following code below provides function to the "Current location" Button
function retrievePosition(position) {
  console.log(position);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey2 = "744441eb32ea7ceo3fb901c610f1d4t9";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey2}`;
  axios.get(url).then(displayWeatherInfo);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
