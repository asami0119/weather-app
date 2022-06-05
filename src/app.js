function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
}

let apiKey = "01e6c99e19f4b3595e992027a30a8417";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Mississauga&appid=${apiKey}&units=metric`;

console.log(apiUrl);
console.log(apiKey);
axios.get(apiUrl).then(displayTemperature);
