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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayWeatherForcast(response) {
  let forcast = response.data.daily;
  let weatherForcastElement = document.querySelector("#weather-forcast");
  let weatherForcastHTML = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      weatherForcastHTML =
        weatherForcastHTML +
        `<div class="col-2">
                <div class="weather-forcast-date">${formatDay(
                  forcastDay.dt
                )}</div>
             
                <img src="http://openweathermap.org/img/wn/${
                  forcastDay.weather[0].icon
                }@2x.png" alt="" />
                <div class="weather-forcast-temerature"></div>
                <span class="weather-forcast-temerature-max">${Math.round(
                  forcastDay.temp.max
                )}º</span>
                <span class="weather-forcast-temerature-min">${Math.round(
                  forcastDay.temp.min
                )}º</span>
     </div>`;
    }
  });

  weatherForcastHTML = weatherForcastHTML + `</div>`;
  weatherForcastElement.innerHTML = weatherForcastHTML;
}

function getWeatherForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "01e6c99e19f4b3595e992027a30a8417";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeatherForcast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getWeatherForcast(response.data.coord);
}

function search(city) {
  let apiKey = "01e6c99e19f4b3595e992027a30a8417";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Paris");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
