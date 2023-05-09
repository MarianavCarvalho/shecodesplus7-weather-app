function formatDate(timestamp) {
let now = new Date(timestamp);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10){
  hours = `0${hours}`
};
let minutes = now.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`
};
return `${day} ${hours}:${minutes}`;
}


function showTemperature(response){
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description-temp");
  descriptionElement.innerHTML = response.data.condition.description;

  let windChange = Math.round((response.data.wind.speed)*3.6);
  let windHandle = document.querySelector("#wind");
  windHandle.innerHTML = `Wind: ${windChange} Km/h`;

  let humidityChange = Math.round(response.data.temperature.humidity);
  let humidityHandle = document.querySelector("#humidity");
  humidityHandle.innerHTML = `Humidity: ${humidityChange} %`;
  
  let currentDate = document.querySelector("#date");
currentDate.innerHTML = formatDate(response.data.time * 1000);

let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src" , `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`)
iconElement.setAttribute("alt" , response.data.condition.description);
}

function search(query){
let apiKey = "a1b283feoeccefb140t55b69080a1da6";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);
}

function handleSearch(event){
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value)
}

search("Lisbon")

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);




