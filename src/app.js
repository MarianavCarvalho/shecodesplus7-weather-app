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


function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function getForecast(query){
  let apiKey = "a1b283feoeccefb140t55b69080a1da6";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}


function showForecast(response){
  let forecastElement = document.querySelector("#forecast");
 
  let forecast = response.data.daily;
  

  let forecastHTML = `<div class="row forecast">`;
 forecast.forEach(function (forecastDay, index) {
  
     if (index < 6){
    forecastHTML = forecastHTML + 
    `
     <div class="col-2">
    <div class="forecastDays" > ${formatDay(forecastDay.time)} </div>
    <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="85"/>
         <div class="forecastVariationTemperature">
         <span class="maxTemperature">${Math.round(forecastDay.temperature.maximum)}º </span>
    <span class="minTemperature">/ ${Math.round(forecastDay.temperature.minimum)}º</span>
    
         </div>   
        </div>
    `;
    }
    } );

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;

}


function showTemperature(response){
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  celciusTemperature = response.data.temperature.current;

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

getForecast(response.data.city);
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


function displayCelciusTemperature(event){
   event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(celciusTemperature);

  
}

let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);



let celciusLink = document.querySelector("#celcius")
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Lisbon");
